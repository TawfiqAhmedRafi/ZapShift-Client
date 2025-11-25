import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../Pages/Rider/Rider";
import ResetPassword from "../Pages/Auth/ResetPassword/ResetPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp/VerifyOtp";
import ForgotPassword from "../Pages/Auth/ForgotPassword/ForgotPassword";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import MyParcels from "../Pages/DashBoard/MyParcels/MyParcels";
import Payment from "../Pages/DashBoard/Payment/Payment";
import PaymentSuccess from "../Pages/DashBoard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/DashBoard/Payment/PaymentCancelled";
import PaymentHistory from "../Pages/DashBoard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../Pages/DashBoard/ApproveRiders/ApproveRiders";

import PricingCalculator from "../Pages/Home/Calculator/PricingCalculator";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
      },
      {
          path : 'pricing',
         Component : PricingCalculator,
         loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
      },
      {
        path: "rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
      },
      {
        path: "send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
      },
      {
        path: "aboutUs",
        Component: AboutUs,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "forgot-password",
        Component: ForgotPassword,
      },
      {
        path: "verify-otp",
        Component: VerifyOtp,
      },
      {
        path: "reset-password",
        Component: ResetPassword,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children : [
      {
        path : 'my-parcels',
        Component : MyParcels
      },
      {
        path : 'payment/:parcelId',
        Component : Payment
      },
      {
        path : "payment-success",
        Component : PaymentSuccess
      },
      {
        path : "payment-cancelled",
        Component : PaymentCancelled
      },
      {
        path : 'payment-history',
        Component : PaymentHistory
      },
      {
        path : 'approve-riders',
        Component : ApproveRiders
      }
    ]
  },

  {
    path: "*",
    Component: ErrorPage,
  },
]);
