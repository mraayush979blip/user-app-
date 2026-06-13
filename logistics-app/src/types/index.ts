export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
}

export type ShipmentStatus = 'Pending' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface Shipment {
  id: string;
  trackingId: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  shipmentDate: string;
  deliveryDate?: string;
  weight: number;
  cost: number;
}
