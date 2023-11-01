import React from "react";
import Buglist from "../pages/Buglist";
export interface Route {
  url: string;
  element: React.ReactNode;
}
export const AppRoutes: Array<Route> = [
  {
    url: "/",
    element: Buglist(),
  },
];
