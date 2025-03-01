
import { Link } from 'react-router-dom';
import { Calendar, Clock, Mail, CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Schedule Appointments with Ease
              </h1>
              <p className="text-xl mb-8">
                Book appointments online, receive confirmations via email, and manage your schedule effortlessly.
              </p>
              <Link
                to="/book"
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300"
              >
                Book Now
              </Link>
            </div>
           
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose AppointEase?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <Calendar className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Easy Scheduling</h3>
              <p className="text-gray-600">
                Browse available time slots and book appointments with just a few clicks.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <Mail className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Email Notifications</h3>
              <p className="text-gray-600">
                Receive confirmation emails and reminders about your upcoming appointments.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <Clock className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Time Management</h3>
              <p className="text-gray-600">
                Manage your schedule efficiently with our intuitive calendar interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 rounded-full p-4 mb-4">
                <Calendar className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">1. Choose Date</h3>
              <p className="text-gray-600">
                Select a date from our interactive calendar.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 rounded-full p-4 mb-4">
                <Clock className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">2. Select Time</h3>
              <p className="text-gray-600">
                Pick an available time slot that works for you.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 rounded-full p-4 mb-4">
                <Mail className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">3. Confirm Details</h3>
              <p className="text-gray-600">
                Enter your information and appointment details.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 rounded-full p-4 mb-4">
                <CheckCircle className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">4. Get Confirmation</h3>
              <p className="text-gray-600">
                Receive an email confirmation with all appointment details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Book your appointment now and experience the simplicity of our scheduling system.
          </p>
          <Link
            to="/book"
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300"
          >
            Book an Appointment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;