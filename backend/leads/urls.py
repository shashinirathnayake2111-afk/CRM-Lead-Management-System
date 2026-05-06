from django.urls import path
from .views import LeadListCreateView, LeadDetailView, NoteListCreateView, DashboardStatsView

urlpatterns = [
    path('leads/', LeadListCreateView.as_view(), name='lead-list-create'),
    path('leads/<str:pk>/', LeadDetailView.as_view(), name='lead-detail'),
    path('leads/<str:lead_id>/notes/', NoteListCreateView.as_view(), name='note-list-create'),
    path('dashboard/', DashboardStatsView.as_view(), name='dashboard-stats'),
]
