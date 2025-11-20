import React from 'react';
import useAuth from '../hooks/useAuth';
import LoadingPage from '../Pages/LoadingPage';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user , loading} = useAuth();
    const location = useLocation();
    if(loading) return <LoadingPage></LoadingPage>
    if(!user) {
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }
    return children;
};

export default PrivateRoute;