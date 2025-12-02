import React, { useState } from 'react';
import useRole from '../../../hooks/useRole';
import LoadingPage from '../../LoadingPage';
import AdminDashboard from './AdminDashboard';
import RiderDashboard from './RiderDashboard';
import UserDashboard from './UserDashboard';

const DashboardHome = () => {
  const { role, roleLoading } = useRole();
  const [viewUserDashboard, setViewUserDashboard] = useState(false); 

  if (roleLoading) return <LoadingPage />;

  // Admin view with toggle
  if (role === 'admin') {
    return (
      <div>
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setViewUserDashboard(!viewUserDashboard)}
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
          >
            {viewUserDashboard ? 'Switch to Admin Dashboard' : 'Switch to User Dashboard'}
          </button>
        </div>
        {viewUserDashboard ? <UserDashboard /> : <AdminDashboard />}
      </div>
    );
  }

  // Rider view
  if (role === 'rider') return <RiderDashboard />;

  // Default user view
  return <UserDashboard />;
};

export default DashboardHome;
