from django.urls import path
from .views import (
    RegisterView,
    CustomTokenObtainPairView,
    MeView,
    CustomTokenRefreshView,
    RoomListCreateView,
    RoomDetailView,
    BookingListCreateView,
    BookingDetailView,
    TeamMemberListView,
)

urlpatterns = [
    # Auth
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('auth/me/', MeView.as_view(), name='me'),

    # Rooms
    path('rooms/', RoomListCreateView.as_view(), name='rooms'),
    path('rooms/<int:pk>/', RoomDetailView.as_view(), name='room-detail'),

    # Bookings / Reservations
    path('bookings/', BookingListCreateView.as_view(), name='bookings'),
    path('bookings/<int:pk>/', BookingDetailView.as_view(), name='booking-detail'),

    # About / Team
    path('team/', TeamMemberListView.as_view(), name='team'),
]
