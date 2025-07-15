import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../componets/Header";

const view = () => {
  return (
    <div>
      <Header/>
      <Outlet />
    </div>
  );
};

export default view;
