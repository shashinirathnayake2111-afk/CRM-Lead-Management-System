from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .models import Lead, Note
from .serializers import LeadSerializer, NoteSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from django.db.models import Sum, Q
from django.db import models

class LeadListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LeadSerializer

    def get_queryset(self):
        queryset = Lead.objects.all().order_by('-created_at')
        status_filter = self.request.query_params.get('status')
        source_filter = self.request.query_params.get('source')
        salesperson_filter = self.request.query_params.get('salesperson')
        search = self.request.query_params.get('search')

        if status_filter:
            queryset = queryset.filter(status=status_filter)
        if source_filter:
            queryset = queryset.filter(source=source_filter)
        if salesperson_filter:
            queryset = queryset.filter(salesperson=salesperson_filter)
        if search:
            queryset = queryset.filter(
                models.Q(name__icontains=search) |
                models.Q(company__icontains=search) |
                models.Q(email__icontains=search)
            )
        return queryset

class LeadDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

class NoteListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, lead_id):
        notes = Note.objects.filter(lead_id=lead_id).order_by('-created_at')
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    def post(self, request, lead_id):
        data = request.data.copy()
        data['lead'] = lead_id
        data['created_by'] = request.user.username
        serializer = NoteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total_leads = Lead.objects.count()
        new_leads = Lead.objects.filter(status='New').count()
        qualified_leads = Lead.objects.filter(status='Qualified').count()
        won_leads = Lead.objects.filter(status='Won').count()
        lost_leads = Lead.objects.filter(status='Lost').count()
        
        total_estimated_value = Lead.objects.aggregate(total=Sum('deal_value'))['total'] or 0
        total_won_value = Lead.objects.filter(status='Won').aggregate(total=Sum('deal_value'))['total'] or 0
        
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
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            email = request.data.get('email')

            if not username or not password or not email:
                return Response({'error': 'Please provide username, password and email'}, status=status.HTTP_400_BAD_REQUEST)

            if User.objects.filter(username=username).exists():
                return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

            User.objects.create_user(username=username, email=email, password=password)
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
