import React from 'react';
import { Calendar, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 text-indigo-400" />
              <span className="ml-2 text-xl font-bold">AppointEase</span>
            </div>
            <p className="text-gray-300">
              Simplifying appointment scheduling for professionals and clients alike.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/book" className="text-gray-300 hover:text-white">Book Appointment</a></li>
              <li><a href="/dashboard" className="text-gray-300 hover:text-white">Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-indigo-400 mr-2" />
                <span>support@appointease.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-indigo-400 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} AppointEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;