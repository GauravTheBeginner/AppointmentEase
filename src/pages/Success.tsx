import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, ArrowLeft } from 'lucide-react';

interface LocationState {
  name: string;
  date: string;
  time: string;
}

const Success = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  if (!state) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Something went wrong</h1>
        <p className="mb-6 text-gray-600">We couldn't find your appointment details.</p>
        <Link
          to="/book"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Go back to booking
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-3">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Appointment Confirmed!</h1>
        <p className="text-xl mb-8 text-gray-600">
          Thank you, {state.name}! Your appointment has been successfully booked.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Appointment Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-center bg-white p-4 rounded-lg shadow-sm">
              <Calendar className="h-6 w-6 text-indigo-600 mr-2" />
              <span className="text-gray-800">{state.date}</span>
            </div>
            <div className="flex items-center justify-center bg-white p-4 rounded-lg shadow-sm">
              <Clock className="h-6 w-6 text-indigo-600 mr-2" />
              <span className="text-gray-800">{state.time}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-8 text-left">
          <h3 className="text-lg font-medium text-blue-800 mb-2">What's Next?</h3>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            <li>A confirmation email has been sent to your email address</li>
            <li>You'll receive a reminder 24 hours before your appointment</li>
            <li>If you need to reschedule, please contact us at least 24 hours in advance</li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Return to Home
          </Link>
          <Link
            to="/book"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Book Another Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;