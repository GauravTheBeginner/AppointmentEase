import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-indigo-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h2>
        <p className="mt-3 text-lg text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Home className="h-5 w-5 mr-2" />
            Go to Home
          </Link>
          <Link
            to="/book"
            className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;