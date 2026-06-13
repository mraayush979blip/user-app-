
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, User, LogOut, Search } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const MainLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Orders', path: '/orders', icon: Package },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background-secondary flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Package className="text-primary w-8 h-8 mr-2" />
          <span className="text-xl font-bold text-gray-900">ShipTrack</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-orange-50 text-primary font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {/* Top Header (Mobile & Desktop) */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="md:hidden flex items-center">
            <Package className="text-primary w-8 h-8 mr-2" />
            <span className="text-xl font-bold text-gray-900">ShipTrack</span>
          </div>
          <div className="hidden md:flex flex-1 max-w-lg items-center">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search shipments, orders..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
             <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-primary font-bold">
                A
             </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 pb-safe">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full py-2 ${
                isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <item.icon className={`w-6 h-6 mb-1 ${isActive ? 'text-primary' : ''}`} />
              <span className="text-xs font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default MainLayout;
