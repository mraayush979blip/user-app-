import type { Shipment, User } from '../types';

export const mockUser: User = {
  id: 1,
  name: "Aayush Sharma",
  email: "aayush@example.com",
  phone: "+91 9876543210",
  address: "Indore, Madhya Pradesh, India",
  avatar: "https://i.pravatar.cc/150?img=11"
};

export const mockShipments: Shipment[] = [
  {
    id: "shp_001",
    trackingId: "AWB1234567890",
    origin: "Mumbai, Maharashtra",
    destination: "Delhi, NCR",
    status: "Delivered",
    shipmentDate: "2026-06-01",
    deliveryDate: "2026-06-03",
    weight: 12.5,
    cost: 450
  },
  {
    id: "shp_002",
    trackingId: "AWB1234567891",
    origin: "Bangalore, Karnataka",
    destination: "Hyderabad, Telangana",
    status: "In Transit",
    shipmentDate: "2026-06-10",
    weight: 5.2,
    cost: 200
  },
  {
    id: "shp_003",
    trackingId: "AWB1234567892",
    origin: "Chennai, Tamil Nadu",
    destination: "Pune, Maharashtra",
    status: "Out for Delivery",
    shipmentDate: "2026-06-11",
    weight: 8.0,
    cost: 320
  },
  {
    id: "shp_004",
    trackingId: "AWB1234567893",
    origin: "Indore, Madhya Pradesh",
    destination: "Ahmedabad, Gujarat",
    status: "Pending",
    shipmentDate: "2026-06-14",
    weight: 2.5,
    cost: 150
  },
  {
    id: "shp_005",
    trackingId: "AWB1234567894",
    origin: "Kolkata, West Bengal",
    destination: "Patna, Bihar",
    status: "Delivered",
    shipmentDate: "2026-05-25",
    deliveryDate: "2026-05-28",
    weight: 20.0,
    cost: 800
  },
  {
    id: "shp_006",
    trackingId: "AWB1234567895",
    origin: "Surat, Gujarat",
    destination: "Jaipur, Rajasthan",
    status: "In Transit",
    shipmentDate: "2026-06-12",
    weight: 15.0,
    cost: 550
  },
  {
    id: "shp_007",
    trackingId: "AWB1234567896",
    origin: "Lucknow, Uttar Pradesh",
    destination: "Bhopal, Madhya Pradesh",
    status: "Delivered",
    shipmentDate: "2026-06-05",
    deliveryDate: "2026-06-07",
    weight: 3.0,
    cost: 180
  },
  {
    id: "shp_008",
    trackingId: "AWB1234567897",
    origin: "Delhi, NCR",
    destination: "Chandigarh",
    status: "Out for Delivery",
    shipmentDate: "2026-06-12",
    weight: 1.5,
    cost: 100
  },
  {
    id: "shp_009",
    trackingId: "AWB1234567898",
    origin: "Gurgaon, Haryana",
    destination: "Noida, Uttar Pradesh",
    status: "Delivered",
    shipmentDate: "2026-06-08",
    deliveryDate: "2026-06-09",
    weight: 10.0,
    cost: 300
  },
  {
    id: "shp_010",
    trackingId: "AWB1234567899",
    origin: "Hyderabad, Telangana",
    destination: "Vijayawada, Andhra Pradesh",
    status: "Pending",
    shipmentDate: "2026-06-15",
    weight: 4.5,
    cost: 220
  },
  {
    id: "shp_011",
    trackingId: "AWB1234567900",
    origin: "Mumbai, Maharashtra",
    destination: "Goa",
    status: "Delivered",
    shipmentDate: "2026-05-20",
    deliveryDate: "2026-05-22",
    weight: 7.2,
    cost: 350
  },
  {
    id: "shp_012",
    trackingId: "AWB1234567901",
    origin: "Pune, Maharashtra",
    destination: "Nagpur, Maharashtra",
    status: "In Transit",
    shipmentDate: "2026-06-11",
    weight: 6.8,
    cost: 280
  },
  {
    id: "shp_013",
    trackingId: "AWB1234567902",
    origin: "Ahmedabad, Gujarat",
    destination: "Rajkot, Gujarat",
    status: "Delivered",
    shipmentDate: "2026-06-02",
    deliveryDate: "2026-06-03",
    weight: 9.0,
    cost: 250
  },
  {
    id: "shp_014",
    trackingId: "AWB1234567903",
    origin: "Jaipur, Rajasthan",
    destination: "Jodhpur, Rajasthan",
    status: "Out for Delivery",
    shipmentDate: "2026-06-12",
    weight: 2.0,
    cost: 120
  },
  {
    id: "shp_015",
    trackingId: "AWB1234567904",
    origin: "Bhopal, Madhya Pradesh",
    destination: "Indore, Madhya Pradesh",
    status: "Delivered",
    shipmentDate: "2026-06-09",
    deliveryDate: "2026-06-10",
    weight: 18.5,
    cost: 600
  }
];
