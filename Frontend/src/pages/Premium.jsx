import React, { useContext } from "react";
import { BaseApi } from "../baseApi";
import axios from "axios";
import Mycontext from "../Mycontext";

const Premium = () => {
  const Users = useContext(Mycontext)
  const HandlePremium = () => {
    const GetPre = { IsPremium: true };
    axios
      .post(`${BaseApi}/auth/getpremium`, {GetPre,Users})
      .then((resp) => {
        console.log(resp);
      })
      .catch((e) => {
        console.log("Premium Error", e);
      });
  };
  return (
    <div>
      Premium
      <div style={{ border: "2px solid black", maxWidth: 350 }}>
        <button onClick={HandlePremium}> Get premium</button>
      </div>
    </div>
  );
};

export default Premium;
