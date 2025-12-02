import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useUserDashboard from "../../../hooks/useUserDashboard";
import LoadingPage from "../../LoadingPage";

const COLORS = ["#4ade80", "#60a5fa", "#fbbf24", "#f87171", "#a78bfa"];

const UserDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7) // current month YYYY-MM
  );

  const { summaryQuery, performanceQuery } = useUserDashboard(selectedMonth);

  const summary = summaryQuery.data;
  const performance = performanceQuery.data;

  if (summaryQuery.isLoading || performanceQuery.isLoading)
    return <LoadingPage></LoadingPage>;

  return (
    <div className="p-6 space-y-10">
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Card
          title="Total Parcels"
          value={summary?.totalParcels ?? 0}
          bg="bg-blue-500"
        />
        <Card
          title="Delivered"
          value={summary?.delivered ?? 0}
          bg="bg-green-500"
        />
        <Card
          title="In Transit"
          value={summary?.inTransit ?? 0}
          bg="bg-yellow-500"
        />
        <Card
          title="Pending"
          value={summary?.pending ?? 0}
          bg="bg-orange-400"
        />
        <Card
          title="Active Orders"
          value={summary?.active ?? 0}
          bg="bg-purple-500"
        />
        <Card
          title="Total Spend ($)"
          value={summary?.totalSpend ?? 0}
          bg="bg-pink-500"
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 gap-10">
        {/* PIE CHART */}
        <div className="p-6  rounded-xl shadow-lg bg-white text-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Parcel Status Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performance.statusCounts}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                label={({ name, percent }) =>
                  `${formatStatus(name)}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {performance.statusCounts?.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [value, formatStatus(name)]}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                formatter={(value) => formatStatus(value)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Month Selector */}
        <div>
           <div className="flex justify-end mb-4">
  <label className="relative inline-flex items-center">
    <span className="sr-only">Select Month</span>
    <input
      type="month"
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
      className="
        appearance-none
        border
        border-gray-300
        rounded-lg
        px-4
        py-2
        pr-10
        bg-white
        text-gray-700
        font-medium
        shadow-sm
        hover:shadow-md
        focus:outline-none
        focus:ring-2
        focus:ring-green-400
        transition
        duration-200
      "
    />
    {/* Calendar icon inside the input */}
    <span className="absolute right-3 text-gray-400 pointer-events-none">
      📅
    </span>
  </label>
</div>
        {/* BAR CHART */}
        <div className="px-6 py-3  rounded-xl  bg-white">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
            Deliveries Per Day ({selectedMonth})
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performance.dailyBarChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="delivered" fill="#4ade80" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        </div>
      </div>
    </div>
  );
};

// CARD COMPONENT
const Card = ({ title, value, bg }) => (
  <div
    className={`p-5 shadow-md rounded-xl text-white flex flex-col justify-center items-center ${bg}`}
  >
    <p className="text-sm md:text-base">{title}</p>
    <h2 className="text-2xl md:text-3xl font-bold mt-2">{value}</h2>
  </div>
);

// FORMAT STATUS LABELS
const formatStatus = (status) =>
  status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default UserDashboard;
