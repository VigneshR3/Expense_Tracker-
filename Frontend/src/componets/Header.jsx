import React from 'react';
import { Link } from 'react-router-dom';
import Header from 'Header';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Expense Tracker</h1>
        <nav>
          <Link to="/home" className="mr-4 hover:underline">Home</Link>
          <Link to="/login" className="hover:underline">Logout</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
