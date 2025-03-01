import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Home, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Calendar className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AppointEase</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              <Home className="h-5 w-5 mr-1" />
              <span>Home</span>
            </Link>
            <Link to="/book" className="flex items-center text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              <Calendar className="h-5 w-5 mr-1" />
              <span>Book Appointment</span>
            </Link>
            <Link to="/dashboard" className="flex items-center text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              <User className="h-5 w-5 mr-1" />
              <span>Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;