import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingPage from '../../LoadingPage';

const Payment = () => {
    const {parcelId} = useParams();
    const axiosSecure=useAxiosSecure();
    const {isLoading,data: parcel } = useQuery({
        queryKey : ['parcels', parcelId],
        queryFn : async ()=>{
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data
        }
    })
    if(isLoading){
       return <LoadingPage></LoadingPage>
    }
    return (
        <div>
            <h2>please pay for :  {parcel.parcelName}</h2>
            <button className='btn btn-primary'>Pay Now</button>
        </div>
    );
};

export default Payment;