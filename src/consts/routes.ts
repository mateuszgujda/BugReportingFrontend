import React from "react";
import Buglist from "../pages/Buglist";
import Login from "../pages/Login";
import BugDetails from "../pages/Bugdetails";
export interface Route {
  url: string;
  element: React.FC;
}
export const AppRoutes: Array<Route> = [
  {
    url: "/",
    element: Buglist,
  },
  {
    url: "/reports",
    element: Buglist
  },
  {
    url: "/reports/:id",
    element: BugDetails
  },
  {
    url: '/login',
    element: Login
  }
];
