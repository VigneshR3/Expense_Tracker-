import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { BaseApi } from "../baseApi";

const AdminProtecter = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    axios
      .get(`${BaseApi}/auth/ischeck-user`)
      .then((resp) => {
        console.log("Admin check response:", resp);

        const role = resp.data?.role;

        // Only allow if role is strictly "ADMIN"
        if (role === "ADMIN") {
          setIsAuthorized(true);
          console.log("if...")
        } else {
          console.log("Else ")
          setIsAuthorized(false)
        }
      })
      .catch((error) => {
        console.error("Error checking admin auth:", error);
        setIsAuthorized(false);
        console.log("fefefe###")
       
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (!isAuthorized) return <Navigate to={"/login"}  />;

  return children;
};

export default AdminProtecter;
