import React from "react";
import Buglist from "../pages/Buglist";
import Login from "../pages/Login";
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
    url: '/login',
    element: Login
  }
];
