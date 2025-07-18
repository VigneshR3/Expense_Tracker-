import React, { useContext } from "react";
import { BaseApi } from "../baseApi";
import axios from "axios";
import Mycontext from "../Mycontext";
import { toast,ToastContainer } from "react-toastify";

const Premium = () => {
  const Users = useContext(Mycontext)

  const notify = (message)=>{toast(message)}
  const HandlePremium = () => {
    const GetPre = { IsPremium: true };
    axios
      .post(`${BaseApi}/auth/getpremium`, {GetPre,Users})
      .then((resp) => {
        console.log(resp);
        notify("Your got Premium")
      })
      .catch((e) => {
        console.log("Premium Error", e);
        notify("Please Login")
      });
  };
  return (
    <div>
      Premium
      <ToastContainer />
      <div style={{ border: "2px solid black", maxWidth: 350 }}>
        <button onClick={HandlePremium}> Get premium</button>
      </div>
    </div>
  );
};

export default Premium;
