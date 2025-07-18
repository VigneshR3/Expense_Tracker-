import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { BaseApi } from "./baseApi";

const HomeProtecter = ({ children }) => {
  const [isCheck, setIsCheck] = useState(false);
  const [isUser, setIsUser] = useState(false);
   
  useEffect(() => {
    axios
      .get(`${BaseApi}/auth/ischeck-user`)
      .then((resp) => {
        console.log("protect", resp);
   
        setIsUser(true);
        setIsCheck(true);
      })
      .catch((e) => {
        setIsUser(false);
        setIsCheck(true);
      });
  }, []);
  if (!isCheck) {
    return <p>loading...</p>;
  }
  if (!isUser && isCheck) {
    return <Navigate to={"/login"} />;
  }
   
  return children;
};

export default HomeProtecter;
