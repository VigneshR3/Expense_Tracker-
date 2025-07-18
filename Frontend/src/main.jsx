import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";
axios.interceptors.request.use((request) => {
   try {
var token = ""
     token = localStorage?.getItem("adminToken")|| localStorage?.getItem("userToken");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  } catch (error) {
    console.error("Token error:", error);
    return request;
  }
});
 
createRoot(document.getElementById("root")).render(
  
    <App />
  
);
