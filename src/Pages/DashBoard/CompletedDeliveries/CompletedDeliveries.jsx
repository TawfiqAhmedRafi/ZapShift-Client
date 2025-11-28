import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import LoadingPage from '../../LoadingPage';

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: parcels = [], isFetching  } = useQuery({
    queryKey: ['parcels', user.email, 'parcel-delivered'],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel-delivered`
      );
      return res.data;
    },
  });

  const calculatePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.cost * 0.8;
    }
    return parcel.cost * 0.6;
  };

  if (isFetching) {
    return <LoadingPage />;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-secondary">Completed Deliveries: {parcels.length}</h2>

      <div className="overflow-x-auto rounded-xl   bg-white">
        <table className="min-w-full">
          <thead className="bg-[#94C6CB]/30 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Tracking Id</th>
              <th className="py-3 px-4 text-left">PickUp Location</th>
              <th className="py-3 px-4 text-left">Delivered Location</th>
              <th className="py-3 px-4 text-left">Cost</th>
              <th className="py-3 px-4 text-left">Payout Amount</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr
                key={parcel._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-200"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 font-medium">{parcel.parcelName}</td>
                <td className="py-3 px-4 font-mono">{parcel.trackingId}</td>
                <td className="py-3 px-4">{parcel.senderAddress}, {parcel.senderDistrict}</td>
                <td className="py-3 px-4">{parcel.receiverAddress}, {parcel.receiverDistrict}</td>
                <td className="py-3 px-4">৳{parcel.cost}</td>
                <td className="py-3 px-4 font-semibold text-green-600">
                  ৳{calculatePayout(parcel)}
                </td>
                <td className="py-3 px-4">
                  <button className="bg-secondary text-white px-4 py-2 rounded-md shadow hover:bg-secondary/90 transition-all duration-200">
                    Cash Out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;