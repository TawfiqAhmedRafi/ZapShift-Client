import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useUserDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const summaryQuery = useQuery({
    queryKey: ["user-dashboard-summary", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/dashboard/summary?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const performanceQuery = useQuery({
    queryKey: ["user-dashboard-performance", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/dashboard/performance?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return { summaryQuery, performanceQuery };
};

export default useUserDashboard;
