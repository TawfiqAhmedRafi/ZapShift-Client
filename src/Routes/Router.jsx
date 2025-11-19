import { createBrowserRouter } from "react-router";
import RooyLayout from "../Layouts/RooyLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RooyLayout,
    children: [
      {
        index: true,
        Component: Home , 
      },
      {
        path : "coverage",
        Component : Coverage,
        loader : ()=> fetch('/serviceCenter.json').then((res)=>res.json())
      }
    ],
  },
]);
