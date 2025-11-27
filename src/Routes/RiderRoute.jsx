import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import LoadingPage from '../Pages/LoadingPage';
import Forbidden from '../Components/Forbidden/Forbidden';

const RiderRoute = ({children}) => {
     const { loading , user}=useAuth();
    const {roleLoading , role}=useRole()
    if(loading || !user || roleLoading){
        return <LoadingPage></LoadingPage>
    }

    if(role!== 'rider'){
        return <Forbidden></Forbidden>
    }

    return children ;
};


export default RiderRoute;