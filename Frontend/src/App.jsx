import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import View from "./pages/View";
import { useContext, useEffect, useState } from "react";
import Mycontext from "./Mycontext";
import {jwtDecode} from "jwt-decode";
import HomeProtecter from "./HomeProtecter";



function App() {
  const [User, setUser] = useState({});
  const token = localStorage.getItem("token");
     
  useEffect(()=>{
    
    if (token ) {
      try {
      const decoded = jwtDecode(token);
        console.log("Decoded user:", decoded);
          setUser(decoded)
      } catch (error) {
        console.error("Invalid token:", error.message);
          
      }
    }
  },[token]) 

 
 
   
  return (
    <Mycontext value={User}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<View />}>
            <Route index element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<HomeProtecter><Home /></HomeProtecter> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </Mycontext>
  );
}

export default App;
