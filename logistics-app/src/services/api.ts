import type { Shipment } from '../types';

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const fetchShipments = async (): Promise<Shipment[]> => {
  const response = await fetch('/api/shipments/', {
    headers: {
      ...getAuthHeaders()
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch shipments');
  }
  return response.json();
};

export const createShipment = async (shipmentData: Omit<Shipment, 'id' | 'trackingId' | 'status' | 'shipmentDate'>): Promise<Shipment> => {
  const payload = {
    ...shipmentData,
    trackingId: `TRK-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}`,
    status: 'Pending',
    shipmentDate: new Date().toISOString().split('T')[0],
  };

  const response = await fetch('/api/shipments/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create shipment');
  }
  return response.json();
};
