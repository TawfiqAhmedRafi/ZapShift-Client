import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserDashboard = (month) => {
  const axiosSecure = useAxiosSecure();

 const summaryQuery = useQuery({
  queryKey: ["user-summary"],
  queryFn: async () => {
    const res = await axiosSecure.get("/user/dashboard/summary");
    return res.data || {};
  },
});
  const performanceQuery = useQuery({
    queryKey: ["user-performance", month], // query key includes month
    queryFn: async () => {
      const res = await axiosSecure.get("/user/dashboard/performance", {
        params: { month },
      });
      return res.data;
    },
  });

  return { summaryQuery, performanceQuery };
};

export default useUserDashboard;
