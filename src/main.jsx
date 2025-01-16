import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Home.jsx";
import Retailer from "./Retailer.jsx";
import Login from "./Login.jsx";
import Register  from "./Register.jsx"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Retailer />
  },
  {
    path: "/main",
    element: <Home />
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  }
 
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);