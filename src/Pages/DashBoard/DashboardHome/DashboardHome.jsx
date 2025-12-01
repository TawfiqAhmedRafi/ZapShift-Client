import React from 'react';
import useRole from '../../../hooks/useRole';
import LoadingPage from '../../LoadingPage'
import AdminDashboard from './AdminDashboard';
import RiderDashboard from './RiderDashboard';
import UserDashboard from './UserDashboard';
const DashboardHome = () => {
    const {role , roleLoading} = useRole();
    if(roleLoading){
        return <LoadingPage></LoadingPage>
    }
    if(role === 'admin'){
        return <AdminDashboard></AdminDashboard>
    }
    if(role === 'rider'){
        return <RiderDashboard></RiderDashboard>
    }
    else{
        return <UserDashboard></UserDashboard>
    }
    
};

export default DashboardHome;