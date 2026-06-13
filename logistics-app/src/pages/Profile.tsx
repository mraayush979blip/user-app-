import { useState } from 'react';
import { User as UserIcon, Mail, Phone, MapPin, Edit3, Shield, Key } from 'lucide-react';
import { mockUser } from '../data/mockData';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUser);

  const handleSave = () => {
    // Mock save functionality
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-500 mt-1">Manage your account details and preferences.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Cover / Header */}
        <div className="h-32 bg-gradient-to-r from-orange-100 to-orange-200 relative">
           <div className="absolute -bottom-12 left-8">
              <img 
                src={userData.avatar} 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-white object-cover"
              />
           </div>
        </div>

        <div className="pt-16 pb-8 px-8 border-b border-gray-100 flex flex-col sm:flex-row sm:justify-between items-start gap-4">
           <div>
             <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
             <p className="text-gray-500 flex items-center mt-1">
               <Shield className="w-4 h-4 mr-1 text-green-500" /> Verified Enterprise Customer
             </p>
           </div>
           <button 
             onClick={() => isEditing ? handleSave() : setIsEditing(true)}
             className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors"
           >
             {isEditing ? (
               <span>Save Changes</span>
             ) : (
               <>
                 <Edit3 className="w-4 h-4" />
                 <span>Edit Profile</span>
               </>
             )}
           </button>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Personal Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                <UserIcon className="w-4 h-4 mr-2" /> Full Name
              </label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  className="w-full border-b border-gray-300 focus:border-primary focus:outline-none py-1 text-gray-900"
                />
              ) : (
                <p className="text-gray-900 font-medium">{userData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                <Mail className="w-4 h-4 mr-2" /> Email Address
              </label>
              {isEditing ? (
                <input 
                  type="email" 
                  value={userData.email}
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                  className="w-full border-b border-gray-300 focus:border-primary focus:outline-none py-1 text-gray-900"
                />
              ) : (
                <p className="text-gray-900 font-medium">{userData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                <Phone className="w-4 h-4 mr-2" /> Phone Number
              </label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={userData.phone}
                  onChange={(e) => setUserData({...userData, phone: e.target.value})}
                  className="w-full border-b border-gray-300 focus:border-primary focus:outline-none py-1 text-gray-900"
                />
              ) : (
                <p className="text-gray-900 font-medium">{userData.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                <MapPin className="w-4 h-4 mr-2" /> Default Address
              </label>
              {isEditing ? (
                <textarea 
                  value={userData.address}
                  onChange={(e) => setUserData({...userData, address: e.target.value})}
                  className="w-full border border-gray-300 rounded-md p-2 focus:border-primary focus:outline-none text-gray-900"
                  rows={2}
                />
              ) : (
                <p className="text-gray-900 font-medium leading-relaxed">{userData.address}</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
             <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Security & Preferences</h3>
             
             <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex justify-between items-center">
               <div>
                 <p className="font-medium text-gray-900 flex items-center">
                   <Key className="w-4 h-4 mr-2 text-gray-500" /> Password
                 </p>
                 <p className="text-sm text-gray-500 mt-1">Last changed 3 months ago</p>
               </div>
               <button className="text-sm font-medium text-primary hover:text-orange-700">Change</button>
             </div>

             <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
               <p className="font-medium text-gray-900 mb-3">Notification Preferences</p>
               <div className="space-y-3">
                 <label className="flex items-center">
                   <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4" defaultChecked />
                   <span className="ml-2 text-sm text-gray-700">Email updates on delivery</span>
                 </label>
                 <label className="flex items-center">
                   <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4" defaultChecked />
                   <span className="ml-2 text-sm text-gray-700">SMS tracking alerts</span>
                 </label>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
