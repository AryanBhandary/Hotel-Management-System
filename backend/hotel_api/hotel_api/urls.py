from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # All API endpoints start with /api/
    path('api/', include('hotel.urls')),
]
