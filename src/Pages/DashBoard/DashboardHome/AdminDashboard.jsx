import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  PieChart, Pie, Cell, Tooltip as ReTooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  BarChart, Bar
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

// Colors for pie chart
const COLORS = ["#0088FE", "#00C49F", "#FF8042", "#FFBB28"];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  // 1️⃣ Total stats
  const { data: stats } = useQuery({
  queryKey: ["dashboard-stats"],
  queryFn: async () => {
    const res = await axiosSecure.get("/dashboard/stats");
    return res.data;
  },
});

const { data: deliveryStatus } = useQuery({
  queryKey: ["delivery-status"],
  queryFn: async () => {
    const res = await axiosSecure.get("/dashboard/delivery-status");
    return res.data;
  },
});

const { data: monthlyRevenue } = useQuery({
  queryKey: ["monthly-revenue"],
  queryFn: async () => {
    const res = await axiosSecure.get("/dashboard/monthly-revenue");
    return res.data;
  },
});


const { data: riderPerformance } = useQuery({
  queryKey: ["rider-performance"],
  queryFn: async () => {
    const res = await axiosSecure.get("/dashboard/rider-performance");
    return res.data;
  },
});

  return (
    <div className="p-6 space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded shadow">
          <h2 className="text-sm">Total Parcels</h2>
          <p className="text-2xl font-bold">{stats?.totalParcels || 0}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow">
          <h2 className="text-sm">Delivered Parcels</h2>
          <p className="text-2xl font-bold">{stats?.deliveredParcels || 0}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded shadow">
          <h2 className="text-sm">Pending Parcels</h2>
          <p className="text-2xl font-bold">{stats?.pendingParcels || 0}</p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded shadow">
          <h2 className="text-sm">Total Revenue</h2>
          <p className="text-2xl font-bold">${stats?.totalRevenue || 0}</p>
        </div>
        <div className="bg-indigo-500 text-white p-4 rounded shadow">
          <h2 className="text-sm">Users</h2>
          <p className="text-2xl font-bold">{stats?.totalUsers || 0}</p>
        </div>
        <div className="bg-pink-500 text-white p-4 rounded shadow">
          <h2 className="text-sm">Riders</h2>
          <p className="text-2xl font-bold">{stats?.totalRiders || 0}</p>
        </div>
      </div>

      {/* Delivery Status Pie Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Delivery Status</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={deliveryStatus || []}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {(deliveryStatus || []).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <ReTooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Monthly Revenue Line Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Monthly Revenue</h2>
        <LineChart
          width={600}
          height={300}
          data={monthlyRevenue || []}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="month" />
          <YAxis />
          <ReTooltip />
          <Legend />
          <Line type="monotone" dataKey="totalRevenue" stroke="#ff7300" />
        </LineChart>
      </div>

      {/* Rider Performance Bar Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Rider Performance</h2>
        <BarChart
          width={700}
          height={300}
          data={riderPerformance || []}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="riderName" />
          <YAxis />
          <ReTooltip />
          <Legend />
          <Bar dataKey="deliveries" fill="#413ea0" />
        </BarChart>
      </div>
    </div>
  );
};

export default AdminDashboard;
