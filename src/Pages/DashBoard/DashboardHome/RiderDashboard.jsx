import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import WorkStatusToggle from "./WorkStatusToggle";

const COLORS = ["#0088FE", "#00C49F", "#FF8042", "#FFBB28", "#FF4560"];

const RiderDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isMobile, setIsMobile] = useState(false);

  // --- Fetch rider stats ---
  const { data: stats } = useQuery({
    queryKey: ["rider-dashboard-stats"],
    queryFn: async () => (await axiosSecure.get("/rider/dashboard/stats")).data,
    enabled: !!user?.email,
  });

  // --- Fetch completed parcels ---
  const { data: completedParcels } = useQuery({
    queryKey: ["rider-dashboard-completed"],
    queryFn: async () =>
      (await axiosSecure.get("/rider/dashboard/completed")).data,
    enabled: !!user?.email,
  });

  // --- Fetch performance data ---
  const { data: performance } = useQuery({
    queryKey: ["rider-dashboard-performance"],
    queryFn: async () =>
      (await axiosSecure.get("/rider/dashboard/performance")).data,
    enabled: !!user?.email,
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pie chart data
  const deliveryStatusData = [
    { status: "Delivered", count: stats?.delivered || 0 },
    { status: "Pending", count: stats?.pending || 0 },
  ];
  const calculatePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.cost * 0.8;
    }
    return parcel.cost * 0.6;
  };

  // Total income from delivered parcels
  const totalIncome = completedParcels?.reduce(
    (sum, p) => sum + calculatePayout(p),
    0
  );
  const formatLabel = (label) =>
    label
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  const formatStatus = (status) =>
    status
      .split(/[_-]/) // split by underscore or dash
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div className="p-4 md:p-6 space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          {
            title: "Total Deliveries",
            value: stats?.totalDeliveries || 0,
            bg: "bg-blue-500",
          },
          {
            title: "Delivered",
            value: stats?.delivered || 0,
            bg: "bg-green-500",
          },
          { title: "Pending", value: stats?.pending || 0, bg: "bg-yellow-500" },
          {
            title: "Total Income",
            value: `$ ${totalIncome || 0} `,
            bg: "bg-purple-500",
          },
          {
            title: "Work Status",
            value: stats?.workStatus ? formatStatus(stats.workStatus) : "N/A",
            bg: "bg-indigo-500",
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
      {/* toggle */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-secondary">Work Status</h2>
        <WorkStatusToggle
          currentStatus={stats?.workStatus || "unavailable"}
          inDelivery={stats?.workStatus === "in_delivery"}
          email={user?.email}
        />
      </div>

      {/* Delivery Status Pie Chart */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg md:text-2xl font-bold mb-4 text-center text-secondary">
          Delivery Status
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={deliveryStatusData}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {deliveryStatusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <ReTooltip
              formatter={(value, name) => [value, formatLabel(name)]}
            />
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

      {/* Performance Chart */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg md:text-2xl font-bold mb-4 text-center text-secondary">
          Deliveries Over Time
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={performance || []}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid stroke="#f0f0f0" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <ReTooltip />
            <Legend verticalAlign="bottom" height={36} />
            <Bar
              dataKey="delivered"
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

export default RiderDashboard;
