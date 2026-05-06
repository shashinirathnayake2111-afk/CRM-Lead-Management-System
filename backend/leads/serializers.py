from rest_framework import serializers

class LeadSerializer(serializers.Serializer):
    _id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=255)
    company = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=20)
    source = serializers.CharField(max_length=100)
    salesperson = serializers.CharField(max_length=100)
    status = serializers.CharField(max_length=50) # New, Contacted, Qualified, Proposal Sent, Won, Lost
    deal_value = serializers.DecimalField(max_digits=12, decimal_places=2)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

class NoteSerializer(serializers.Serializer):
    _id = serializers.CharField(read_only=True)
    lead_id = serializers.CharField()
    content = serializers.CharField()
    created_by = serializers.CharField()
    created_at = serializers.DateTimeField(read_only=True)
