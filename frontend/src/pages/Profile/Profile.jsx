import React, { useState } from 'react';

const UserProfile = () => {
  // This would typically come from your API/backend
  const [user, setUser] = useState({
    email: "jane.smith@example.com",
    firstName: "Jane",
    lastName: "Smith",
    phone: "+1 (555) 123-4567",
    dateOfBirth: new Date("1988-04-12"),
    address: {
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "United States"
    },
    profilePicture: "/api/placeholder/200/200",
    role: "premium",
    kycStatus: "verified",
    notificationPreferences: {
      email: true,
      push: true,
      sms: false
    },
    lastLoginAt: new Date("2025-03-14T18:30:00"),
    createdAt: new Date("2023-07-15"),
    updatedAt: new Date("2025-03-01")
  });

  const [activeTab, setActiveTab] = useState('profile');

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getKycStatusBadge = (status) => {
    const statusColors = {
      'verified': 'bg-emerald-900 text-emerald-200',
      'pending': 'bg-yellow-900 text-yellow-200',
      'rejected': 'bg-red-900 text-red-200',
      'not_submitted': 'bg-gray-800 text-gray-300'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleColors = {
      'admin': 'bg-purple-900 text-purple-200',
      'premium': 'bg-blue-900 text-blue-200',
      'user': 'bg-gray-800 text-gray-300'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[role]}`}>
        {role}
      </span>
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-300">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-800 to-purple-900 px-6 py-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative">
                <img 
                  src={user.profilePicture} 
                  alt="Profile" 
                  className="h-24 w-24 rounded-full border-4 border-gray-700"
                />
                <div className="absolute bottom-0 right-0 bg-gray-800 p-1 rounded-full">
                  {getRoleBadge(user.role)}
                </div>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-white">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-indigo-300">{user.email}</p>
                <div className="flex mt-2 justify-center sm:justify-start">
                  {getKycStatusBadge(user.kycStatus)}
                  <p className="ml-4 text-sm text-indigo-300">
                    Member since {formatDate(user.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="border-b border-gray-700">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-4 text-sm font-medium ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-purple-500 text-purple-400'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Profile Details
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`px-4 py-4 text-sm font-medium ${
                  activeTab === 'notifications'
                    ? 'border-b-2 border-purple-500 text-purple-400'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Notification Settings
              </button>
              <button
                onClick={() => setActiveTab('account')}
                className={`px-4 py-4 text-sm font-medium ${
                  activeTab === 'account'
                    ? 'border-b-2 border-purple-500 text-purple-400'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Account Info
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="px-6 py-6 sm:p-10">
            {activeTab === 'profile' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-100">Personal Information</h3>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                    <div>
                      <dt className="text-sm font-medium text-gray-400">Full name</dt>
                      <dd className="mt-1 text-sm text-gray-200">{user.firstName} {user.lastName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-400">Date of birth</dt>
                      <dd className="mt-1 text-sm text-gray-200">
                        {user.dateOfBirth ? formatDate(user.dateOfBirth) : 'Not provided'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-400">Email address</dt>
                      <dd className="mt-1 text-sm text-gray-200">{user.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-400">Phone number</dt>
                      <dd className="mt-1 text-sm text-gray-200">{user.phone || 'Not provided'}</dd>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-medium text-gray-100">Address</h3>
                  <div className="mt-4">
                    <div className="text-sm text-gray-200">
                      {user.address?.street && (
                        <p>{user.address.street}</p>
                      )}
                      {user.address?.city && user.address?.state && user.address?.zipCode && (
                        <p>{user.address.city}, {user.address.state} {user.address.zipCode}</p>
                      )}
                      {user.address?.country && (
                        <p>{user.address.country}</p>
                      )}
                      {(!user.address?.street && !user.address?.city) && (
                        <p className="text-gray-500">No address provided</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-medium text-gray-100">KYC Status</h3>
                  <div className="mt-4">
                    <div className="flex items-center">
                      {getKycStatusBadge(user.kycStatus)}
                      {user.kycStatus === 'not_submitted' && (
                        <button className="ml-4 px-3 py-1.5 bg-purple-700 text-white text-xs font-medium rounded hover:bg-purple-600">
                          Submit Documents
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h3 className="text-lg font-medium text-gray-100">Notification Preferences</h3>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center">
                    <input
                      id="email-notifications"
                      name="email-notifications"
                      type="checkbox"
                      checked={user.notificationPreferences.email}
                      className="h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 rounded"
                    />
                    <label htmlFor="email-notifications" className="ml-3">
                      <span className="text-sm font-medium text-gray-200">Email notifications</span>
                      <p className="text-sm text-gray-400">Receive updates and alerts via email</p>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="push-notifications"
                      name="push-notifications"
                      type="checkbox"
                      checked={user.notificationPreferences.push}
                      className="h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 rounded"
                    />
                    <label htmlFor="push-notifications" className="ml-3">
                      <span className="text-sm font-medium text-gray-200">Push notifications</span>
                      <p className="text-sm text-gray-400">Receive alerts on your device</p>
                    </label>
                  </div>
                  
                </div>
                <div className="mt-8">
                  <button className="px-4 py-2 bg-purple-700 text-white text-sm font-medium rounded hover:bg-purple-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-100">Account Information</h3>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                    <div>
                      <dt className="text-sm font-medium text-gray-400">Account role</dt>
                      <dd className="mt-1 text-sm text-gray-200 flex items-center">
                        {getRoleBadge(user.role)}
                        {user.role !== 'premium' && (
                          <button className="ml-4 px-3 py-1 bg-purple-700 text-white text-xs font-medium rounded hover:bg-purple-600">
                            Upgrade
                          </button>
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-400">Member since</dt>
                      <dd className="mt-1 text-sm text-gray-200">{formatDate(user.createdAt)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-400">Last login</dt>
                      <dd className="mt-1 text-sm text-gray-200">{formatDateTime(user.lastLoginAt)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-400">Last updated</dt>
                      <dd className="mt-1 text-sm text-gray-200">{formatDate(user.updatedAt)}</dd>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6 flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-100">Password</h3>
                    <p className="mt-1 text-sm text-gray-400">Update your password regularly for security</p>
                    <button className="mt-4 px-4 py-2 bg-gray-700 text-gray-200 text-sm font-medium rounded hover:bg-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500">
                      Change Password
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-red-400">Danger Zone</h3>
                    <p className="mt-1 text-sm text-gray-400">Permanently delete your account</p>
                    <button className="mt-4 px-4 py-2 bg-red-900 text-red-200 text-sm font-medium rounded hover:bg-red-800 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;