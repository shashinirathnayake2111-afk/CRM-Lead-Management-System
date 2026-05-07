from django.urls import path
from .views import LeadListCreateView, LeadDetailView, NoteListCreateView, NoteDetailView, DashboardStatsView, RegisterView

urlpatterns = [
    path('leads/', LeadListCreateView.as_view(), name='lead-list-create'),
    path('leads/<str:pk>/', LeadDetailView.as_view(), name='lead-detail'),
    path('leads/<str:lead_id>/notes/', NoteListCreateView.as_view(), name='note-list-create'),
    path('notes/<int:pk>/', NoteDetailView.as_view(), name='note-detail'),
    path('dashboard/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('auth/register/', RegisterView.as_view(), name='register'),
]
