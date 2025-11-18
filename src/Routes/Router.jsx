import { createBrowserRouter } from "react-router";
import RooyLayout from "../Layouts/RooyLayout";
import Home from "../Pages/Home/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RooyLayout,
    children: [
      {
        index: true,
        Component: Home , 
      },
    ],
  },
]);
