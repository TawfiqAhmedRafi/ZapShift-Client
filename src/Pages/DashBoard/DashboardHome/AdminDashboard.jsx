import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FF8042",
  "#FFBB28",
  "#FF4560",
  "#775DD0",
  "#3F51B5",
];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [revenuePeriod, setRevenuePeriod] = useState("monthly");
  const [isMobile, setIsMobile] = useState(false);
  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => (await axiosSecure.get("/dashboard/stats")).data,
  });

  const { data: deliveryStatus } = useQuery({
    queryKey: ["delivery-status"],
    queryFn: async () =>
      (await axiosSecure.get("/dashboard/delivery-status")).data,
  });

  const { data: revenueData } = useQuery({
    queryKey: ["revenue", revenuePeriod],
    queryFn: async () =>
      (await axiosSecure.get(`/dashboard/revenue?period=${revenuePeriod}`))
        .data,
  });

  const { data: riderPerformance } = useQuery({
    queryKey: ["rider-performance"],
    queryFn: async () =>
      (await axiosSecure.get("/dashboard/rider-performance")).data,
  });
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatLabel = (label) => {
  return label
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

  return (
    <div className="p-4 md:p-6 space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          {
            title: "Total Parcels",
            value: stats?.totalParcels || 0,
            bg: "bg-blue-500",
          },
          {
            title: "Delivered Parcels",
            value: stats?.deliveredParcels || 0,
            bg: "bg-green-500",
          },
          {
            title: "Pending Parcels",
            value: stats?.pendingParcels || 0,
            bg: "bg-yellow-500",
          },
          {
            title: "Total Revenue",
            value: `$${stats?.totalRevenue || 0}`,
            bg: "bg-purple-500",
          },
          {
            title: "Users",
            value: stats?.totalUsers || 0,
            bg: "bg-indigo-500",
          },
          {
            title: "Riders",
            value: stats?.totalRiders || 0,
            bg: "bg-pink-500",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className={`${card.bg} text-white p-4 rounded-lg shadow-lg flex flex-col items-center`}
          >
            <h2 className="text-sm md:text-base font-medium">{card.title}</h2>
            <p className="text-2xl md:text-3xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Delivery Status Pie Chart */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg md:text-2xl font-bold mb-4 text-center text-secondary">
          Delivery Status
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={deliveryStatus || []}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {(deliveryStatus || []).map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <ReTooltip formatter={(value, name) => [value, formatLabel(name)]}  />
            <Legend
             formatter={(value) => formatLabel(value)}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ flexWrap: "wrap" }}
              height={isMobile ? 80 : 100}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Line Chart with Toggle */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className=" flex-col justify-center items-center mb-4">
          <h2 className="text-lg md:text-2xl text-center font-bold text-secondary">
            Revenue
          </h2>
          <div className="text-center md:text-right mt-3 md:mt-5">
            <button
              onClick={() => setRevenuePeriod("weekly")}
              className={`px-4 py-1 rounded-l-md font-medium ${
                revenuePeriod === "weekly"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setRevenuePeriod("monthly")}
              className={`px-4 py-1 rounded-r-md font-medium ${
                revenuePeriod === "monthly"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={revenueData || []}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B8D856" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#B8D856" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#f0f0f0" strokeDasharray="5 5" />
            <XAxis dataKey="period" />
            <YAxis />
            <ReTooltip />
            <Legend verticalAlign="bottom" height={36} />
            <Area
              type="monotone"
              dataKey="totalRevenue"
              stroke="#B8D856"
              fill="url(#colorRevenue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Rider Performance Bar Chart */}
      <div className="bg-white p-1 md:p-4 rounded-lg shadow-lg">
        <h2 className="text-lg md:text-2xl text-secondary font-bold mb-4 text-center">
          Rider Performance
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={riderPerformance || []}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid stroke="#f0f0f0" strokeDasharray="5 5" />
            <XAxis dataKey="riderName" />
            <YAxis />
            <ReTooltip />
            <Legend verticalAlign="bottom" height={36} />
            <Bar
              dataKey="deliveries"
              fill="#B8D856"
              barSize={30}
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
