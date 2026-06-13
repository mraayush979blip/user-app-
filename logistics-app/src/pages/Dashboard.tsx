import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { mockUser } from '../data/mockData';
import type { Shipment, ShipmentStatus } from '../types';
import { useEffect, useState } from 'react';
import { fetchShipments } from '../services/api';
import NewShipmentModal from '../components/NewShipmentModal';

const statusColors: Record<ShipmentStatus, string> = {
  'Pending': 'bg-yellow-100 text-yellow-800',
  'In Transit': 'bg-blue-100 text-blue-800',
  'Out for Delivery': 'bg-orange-100 text-orange-800',
  'Delivered': 'bg-green-100 text-green-800',
  'Cancelled': 'bg-red-100 text-red-800'
};

export default function Dashboard() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  const loadShipments = async () => {
    try {
      const data = await fetchShipments();
      setShipments(data);
    } catch (err) {
      console.error('Failed to load shipments:', err);
    }
  };

  useEffect(() => {
    loadShipments();
  }, []);

  const recentShipments = shipments.slice(0, 5);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {mockUser.name.split(' ')[0]}!</h1>
          <p className="text-gray-500 mt-1">Here is what's happening with your shipments today.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>New Shipment</span>
        </button>
      </div>

      {/* Quick Track */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Track</h2>
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter Tracking ID (e.g. AWB1234...)"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <Link to="/orders" className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap">
            Track Now
          </Link>
        </div>
      </div>

      {/* Recent Shipments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Shipments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-3 font-medium">Tracking ID</th>
                <th className="px-6 py-3 font-medium">Origin</th>
                <th className="px-6 py-3 font-medium">Destination</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentShipments.map((shipment) => (
                <tr key={shipment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{shipment.trackingId}</td>
                  <td className="px-6 py-4 text-gray-600">{shipment.origin}</td>
                  <td className="px-6 py-4 text-gray-600">{shipment.destination}</td>
                  <td className="px-6 py-4 text-gray-600">{shipment.shipmentDate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[shipment.status]}`}>
                      {shipment.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recentShipments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No shipments found. Create your first one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <NewShipmentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onShipmentCreated={loadShipments}
      />
    </div>
  );
}
