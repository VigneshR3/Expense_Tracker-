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
import { jwtDecode } from "jwt-decode";
import HomeProtecter from "./HomeProtecter";
import Premium from "./pages/Premium";
import AdminView from "./Admin/AdminView";
import Dhashboard from "./Admin/pages/Dhashboard";
import UserDetails from "./Admin/pages/UserDetails";
import UserPage from "./Admin/pages/UserPage";
import AdminProtecter from "./Admin/AdminProtecter";
import NOTfound from "./Admin/pages/NOTfound";

function App() {
  const [User, setUser] = useState({});
  const token =
    localStorage.getItem("userToken") || localStorage.getItem("adminToken");

  console.log("token", token);
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded user:", decoded);

        setUser(decoded);
      } catch (error) {
        console.error("Invalid token:", error.message);
        setUser(null);
      }
    }
  }, [token]);

  return (
    <>
      {/* //Admin Routers */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin"
            element={
              <AdminProtecter>
                <AdminView />
              </AdminProtecter>
            }
          >
            <Route index element={<Dhashboard />} />
            <Route path="/admin/detail" element={<UserDetails />} />
            <Route path="/admin/user" element={<UserPage />} />
           
            <Route index element={<Dhashboard />} />
            {/* <Route path="*" element={<NOTfound />} /> */}
          </Route>
        </Routes>
      
      {/* User Router */}
      <Mycontext value={User}>
         
          <Routes>
            <Route path="/" element={<View />}>
              <Route index element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/home"
                element={
                  <HomeProtecter>
                    <Home />
                  </HomeProtecter>
                }
              />
              <Route path="/premium" element={<Premium />} />
              {/* <Route path="*" element={<NOTfound />} /> */}
            </Route>
          </Routes>
      </Mycontext>
        </BrowserRouter>
    </>
  );
}

export default App;
