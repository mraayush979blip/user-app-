import { useState } from 'react';
import { Search, Filter, RotateCcw, Package, ChevronRight, X } from 'lucide-react';
import { mockShipments } from '../data/mockData';
import type { Shipment, ShipmentStatus } from '../types';

const statusColors: Record<ShipmentStatus, string> = {
  'Pending': 'bg-yellow-100 text-yellow-800',
  'In Transit': 'bg-blue-100 text-blue-800',
  'Out for Delivery': 'bg-orange-100 text-orange-800',
  'Delivered': 'bg-green-100 text-green-800',
  'Cancelled': 'bg-red-100 text-red-800'
};

const Orders = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Shipment | null>(null);

  // Filter based on tab and search query
  const filteredOrders = mockShipments.filter(shipment => {
    const isHistory = shipment.status === 'Delivered' || shipment.status === 'Cancelled';
    const matchesTab = activeTab === 'current' ? !isHistory : isHistory;
    const matchesSearch = shipment.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          shipment.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          shipment.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders & History</h1>
          <p className="text-gray-500 mt-1">Manage and track your active and past shipments.</p>
        </div>
        
        {/* Search and Filter */}
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders..."
              className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
          <button className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline text-sm font-medium">Filter</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab('current')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'current'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Current Orders
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'history'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Order History
          </button>
        </nav>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Tracking ID</p>
                  <p className="font-semibold text-gray-900 mt-0.5">{order.trackingId}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{order.origin}</p>
                </div>
                <div className="px-3 flex-shrink-0 flex items-center justify-center text-gray-300">
                  <div className="w-8 border-t-2 border-dashed border-gray-300 relative">
                    <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-sm font-medium text-gray-900">{order.destination}</p>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="text-sm text-gray-500 flex items-center">
                  <Package className="w-4 h-4 mr-1.5" />
                  {order.weight} kg • ₹{order.cost}
                </div>
                <button 
                  onClick={() => setSelectedOrder(order)}
                  className="text-primary hover:text-orange-700 text-sm font-medium flex items-center group"
                >
                  Details <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-center bg-white rounded-xl border border-gray-200 border-dashed">
            <Package className="w-12 h-12 text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
            <p className="text-gray-500 mt-1 max-w-sm">We couldn't find any orders matching your current filters.</p>
          </div>
        )}
      </div>

      {/* Pagination (Visual only) */}
      {filteredOrders.length > 0 && (
        <div className="mt-auto flex justify-center py-4 border-t border-gray-200">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 rounded bg-primary text-white text-sm font-medium">1</button>
            <button className="px-3 py-1 rounded border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">2</button>
            <button className="px-3 py-1 rounded border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50">Next</button>
          </nav>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Order Details</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-sm text-gray-500">Tracking ID</p>
                  <p className="font-bold text-gray-900 text-lg">{selectedOrder.trackingId}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[selectedOrder.status]}`}>
                  {selectedOrder.status}
                </span>
              </div>

              {/* Timeline mockup */}
              <div className="mb-8 pl-4 border-l-2 border-orange-200 space-y-6 relative">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 bg-primary rounded-full border-2 border-white"></div>
                  <p className="text-sm font-medium text-gray-900">Order Placed</p>
                  <p className="text-xs text-gray-500 mt-1">{selectedOrder.shipmentDate}</p>
                </div>
                <div className="relative">
                  <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white ${['In Transit', 'Out for Delivery', 'Delivered'].includes(selectedOrder.status) ? 'bg-primary' : 'bg-gray-300'}`}></div>
                  <p className={`text-sm font-medium ${['In Transit', 'Out for Delivery', 'Delivered'].includes(selectedOrder.status) ? 'text-gray-900' : 'text-gray-400'}`}>In Transit</p>
                  <p className="text-xs text-gray-500 mt-1">Moving to destination</p>
                </div>
                <div className="relative">
                  <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white ${['Out for Delivery', 'Delivered'].includes(selectedOrder.status) ? 'bg-primary' : 'bg-gray-300'}`}></div>
                  <p className={`text-sm font-medium ${['Out for Delivery', 'Delivered'].includes(selectedOrder.status) ? 'text-gray-900' : 'text-gray-400'}`}>Out for Delivery</p>
                </div>
                <div className="relative">
                  <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white ${selectedOrder.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <p className={`text-sm font-medium ${selectedOrder.status === 'Delivered' ? 'text-gray-900' : 'text-gray-400'}`}>Delivered</p>
                  {selectedOrder.deliveryDate && <p className="text-xs text-gray-500 mt-1">{selectedOrder.deliveryDate}</p>}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4 border border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Origin</p>
                  <p className="text-sm text-gray-900 mt-1">{selectedOrder.origin}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Destination</p>
                  <p className="text-sm text-gray-900 mt-1">{selectedOrder.destination}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Weight</p>
                  <p className="text-sm text-gray-900 mt-1">{selectedOrder.weight} kg</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Cost</p>
                  <p className="text-sm text-gray-900 mt-1 font-semibold text-primary">₹{selectedOrder.cost}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-end">
               {activeTab === 'history' && (
                 <button className="flex items-center text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors mr-3">
                   <RotateCcw className="w-4 h-4 mr-2" /> Reorder
                 </button>
               )}
              <button 
                onClick={() => setSelectedOrder(null)}
                className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
