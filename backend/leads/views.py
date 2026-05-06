from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .db_utils import get_collection
from .serializers import LeadSerializer, NoteSerializer
from bson.objectid import ObjectId
from datetime import datetime
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User

class LeadListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        leads_col = get_collection('leads')
        
        # Filtering
        query = {}
        status_filter = request.query_params.get('status')
        source_filter = request.query_params.get('source')
        salesperson_filter = request.query_params.get('salesperson')
        search = request.query_params.get('search')

        if status_filter:
            query['status'] = status_filter
        if source_filter:
            query['source'] = source_filter
        if salesperson_filter:
            query['salesperson'] = salesperson_filter
        if search:
            query['$or'] = [
                {'name': {'$regex': search, '$options': 'i'}},
                {'company': {'$regex': search, '$options': 'i'}},
                {'email': {'$regex': search, '$options': 'i'}}
            ]

        leads = list(leads_col.find(query).sort('created_at', -1))
        for lead in leads:
            lead['_id'] = str(lead['_id'])
        
        return Response(leads)

    def post(self, request):
        serializer = LeadSerializer(data=request.data)
        if serializer.is_valid():
            leads_col = get_collection('leads')
            lead_data = serializer.validated_data
            lead_data['created_at'] = datetime.utcnow()
            lead_data['updated_at'] = datetime.utcnow()
            lead_data['deal_value'] = float(lead_data['deal_value'])
            
            result = leads_col.insert_one(lead_data)
            lead_data['_id'] = str(result.inserted_id)
            return Response(lead_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LeadDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        leads_col = get_collection('leads')
        lead = leads_col.find_one({'_id': ObjectId(pk)})
        if lead:
            lead['_id'] = str(lead['_id'])
            return Response(lead)
        return Response({'error': 'Lead not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        leads_col = get_collection('leads')
        serializer = LeadSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            update_data = serializer.validated_data
            update_data['updated_at'] = datetime.utcnow()
            if 'deal_value' in update_data:
                update_data['deal_value'] = float(update_data['deal_value'])
            
            leads_col.update_one({'_id': ObjectId(pk)}, {'$set': update_data})
            return Response({'message': 'Lead updated successfully'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        leads_col = get_collection('leads')
        leads_col.delete_one({'_id': ObjectId(pk)})
        # Also delete notes for this lead
        notes_col = get_collection('notes')
        notes_col.delete_many({'lead_id': pk})
        return Response(status=status.HTTP_204_NO_CONTENT)

class NoteListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, lead_id):
        notes_col = get_collection('notes')
        notes = list(notes_col.find({'lead_id': lead_id}).sort('created_at', -1))
        for note in notes:
            note['_id'] = str(note['_id'])
        return Response(notes)

    def post(self, request, lead_id):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            notes_col = get_collection('notes')
            note_data = serializer.validated_data
            note_data['lead_id'] = lead_id
            note_data['created_at'] = datetime.utcnow()
            note_data['created_by'] = request.user.username
            
            result = notes_col.insert_one(note_data)
            note_data['_id'] = str(result.inserted_id)
            return Response(note_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        leads_col = get_collection('leads')
        
        total_leads = leads_col.count_documents({})
        new_leads = leads_col.count_documents({'status': 'New'})
        qualified_leads = leads_col.count_documents({'status': 'Qualified'})
        won_leads = leads_col.count_documents({'status': 'Won'})
        lost_leads = leads_col.count_documents({'status': 'Lost'})
        
        pipeline = [
            {'$group': {'_id': None, 'total_value': {'$sum': '$deal_value'}}}
        ]
        total_val_res = list(leads_col.aggregate(pipeline))
        total_estimated_value = total_val_res[0]['total_value'] if total_val_res else 0
        
        won_pipeline = [
            {'$match': {'status': 'Won'}},
            {'$group': {'_id': None, 'total_value': {'$sum': '$deal_value'}}}
        ]
        won_val_res = list(leads_col.aggregate(won_pipeline))
        total_won_value = won_val_res[0]['total_value'] if won_val_res else 0
        
        return Response({
            'totalLeads': total_leads,
            'newLeads': new_leads,
            'qualifiedLeads': qualified_leads,
            'wonLeads': won_leads,
            'lostLeads': lost_leads,
            'totalEstimatedValue': total_estimated_value,
            'totalWonValue': total_won_value
        })

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not username or not password or not email:
            return Response({'error': 'Please provide username, password and email'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
