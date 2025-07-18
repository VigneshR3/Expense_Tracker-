import React, { useEffect, useState } from "react";
import BasicTable from "../component/BasicTable";
import axios from "axios";
import { BaseApi } from "../../baseApi";

const UserPage = () => {
  const [GetAllUser , setGetAllUser] = useState([])
  const getAllUser = () => {
    axios
      .get(`${BaseApi}/auth/get-alluser`)
      .then((resp) => {
        console.log("Response All user", resp);
        setGetAllUser(resp.data.allUser)
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  useEffect(()=>{
    getAllUser()
  },[])
  return (
    <div>
      UserList
      <BasicTable GetAllUser={GetAllUser} />
    </div>
  );
};

export default UserPage;
