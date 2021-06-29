/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// import Person from "@material-ui/icons/Person";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Users",
    icon: PeopleAltIcon,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/category",
    name: "Category",
    icon: ViewModuleIcon,
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/subcategory",
    name: "Sub-Category",
    icon: ViewModuleIcon,
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/poduct",
    name: "Product",
    icon: ViewModuleIcon,
    component: TableList,
    layout: "/admin",
  },
];

export default dashboardRoutes;
