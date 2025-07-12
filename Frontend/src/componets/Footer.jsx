import React from 'react';
import Footer from 'Footer';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-center py-3 mt-8">
      <p className="text-sm text-gray-600">© {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
