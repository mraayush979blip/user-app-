from django.contrib import admin
from .models import Shipment

@admin.register(Shipment)
class ShipmentAdmin(admin.ModelAdmin):
    list_display = ('trackingId', 'origin', 'destination', 'status', 'shipmentDate', 'weight', 'cost')
    search_fields = ('trackingId', 'origin', 'destination')
    list_filter = ('status', 'shipmentDate')
