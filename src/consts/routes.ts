import React from "react";
import Buglist from "../pages/Buglist";
export interface Route {
  url: string;
  element: React.FC;
}
export const AppRoutes: Array<Route> = [
  {
    url: "/",
    element: Buglist,
  },
];
