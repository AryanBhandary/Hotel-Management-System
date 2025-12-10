from django.contrib import admin
from .models import Room, Booking, TeamMember


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ("number", "room_type", "price_per_night", "capacity", "is_available")
    search_fields = ("number", "room_type")
    list_filter = ("room_type", "is_available")


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "room", "check_in", "check_out", "status", "created_at")
    search_fields = ("user__username", "room__number")
    list_filter = ("status",)
    raw_id_fields = ("user", "room")


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "order")
    search_fields = ("name", "role")
    ordering = ("order", "id")
