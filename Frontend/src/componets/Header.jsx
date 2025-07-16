import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import Mycontext from '../Mycontext';
 

const Header = () => {
  const user = useContext(Mycontext)
  console.log("mycontext",user)
  const HandleLogout = ()=>{
    localStorage.removeItem('token')
  }
  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div style={{display:'flex',justifyContent:"space-between",padding:"0px",margin:"0px"}}>

        <h1 className="text-xl font-bold" style={{padding:"0px",margin:"0px"}}>Expense Tracker</h1>
        <Avatar  initials={user?.username}/>
        </div>
        <nav  >
          <Link to="/home" className="mr-4 hover:underline"style={{color:"white",textDecoration:"none"}}>Home</Link>
           
           {
            Object.keys(user).length === 0 &&
            <Link to="/login" className="hover:underline"style={{color:"white",textDecoration:"none"}}>Login</Link>
           }
           {
            Object.keys(user).length !== 0 &&
            <button  onClick={HandleLogout}className=" " style={{backgroundColor:'#ff5722',border:'none',color:"white"}}>Logout</button>
           }
           <Link to={'/premium'} style={{color:"white",textDecoration:"none",marginLeft:20}}>Premium</Link>
          
        </nav>
      </div>
    </header>
  );
};

export default Header;
