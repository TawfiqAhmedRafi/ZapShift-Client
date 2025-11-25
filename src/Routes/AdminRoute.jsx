import React from 'react';
import useAuth from '../hooks/useAuth';
import LoadingPage from '../Pages/LoadingPage';
import useRole from '../hooks/useRole';
import Forbidden from '../Components/Forbidden/Forbidden';

const AdminRoute = ({children}) => {
    const { loading}=useAuth();
    const {roleLoading , role}=useRole()
    if(loading || roleLoading){
        return <LoadingPage></LoadingPage>
    }

    if(role!== 'admin'){
        return <Forbidden></Forbidden>
    }

    return children ;
};

export default AdminRoute;