from rest_framework import viewsets, permissions
from .models import Shipment
from .serializers import ShipmentSerializer

class ShipmentViewSet(viewsets.ModelViewSet):
    queryset = Shipment.objects.all().order_by('-id') # Ordering by id as it proxies creation order better
    serializer_class = ShipmentSerializer
    permission_classes = [permissions.IsAuthenticated]
