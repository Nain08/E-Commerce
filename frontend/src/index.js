import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
// Create routes using react-router-dom's Route component
const router = createBrowserRouter(
  // Define a route for the root URL ("/")
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Define a nested route for the home screen */}
      {/* Using index={true} provides a way to create nested routes where a child route matches the exact URL path of its parent route, ensuring more precise route matching and rendering behavior. */}
      <Route index={true} path="/" element={<HomeScreen />}></Route>

      {/* Define a route for product details screen */}
      <Route path="/product/:id" element={<ProductScreen />}></Route>

      {/* Define a route for cart screen */}
      <Route path="/cart" element={<CartScreen />}></Route>

    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
