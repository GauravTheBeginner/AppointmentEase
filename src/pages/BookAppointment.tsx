import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { format, addDays, startOfDay, addHours, isBefore, isAfter } from 'date-fns';
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const BookAppointment = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(startOfDay(addDays(new Date(), 1)));
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  // Generate available time slots
  useEffect(() => {
    // Generate time slots from 9 AM to 5 PM
    const times: string[] = [];
    const startHour = 9;
    const endHour = 17;
    
    for (let hour = startHour; hour < endHour; hour++) {
      times.push(`${hour}:00`);
      times.push(`${hour}:30`);
    }

    // Filter out past times if the selected date is today
    const now = new Date();
    const filteredTimes = times.filter(time => {
      const [hours, minutes] = time.split(':').map(Number);
      const timeDate = new Date(selectedDate);
      timeDate.setHours(hours, minutes);
      
      if (format(selectedDate, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd')) {
        return isAfter(timeDate, now);
      }
      return true;
    });

    setAvailableTimes(filteredTimes);
    setSelectedTime('');
  }, [selectedDate]);

  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = addDays(today, i);
      options.push(date);
    }
    
    return options;
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(new Date(date));
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  const onSubmit = async (data: FormData) => {
    if (!selectedTime) {
      alert('Please select a time slot');
      return;
    }

    setLoading(true);

    try {
      const appointmentData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time_slot: selectedTime,
        created_at: new Date().toISOString()
      };

      // Save to localStorage instead of Supabase
      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      existingAppointments.push(appointmentData);
      localStorage.setItem('appointments', JSON.stringify(existingAppointments));

      // Send confirmation email via server
      await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: data.email,
          name: data.name,
          date: format(selectedDate, 'MMMM dd, yyyy'),
          time: selectedTime
        }),
      });

      navigate('/success', { 
        state: { 
          name: data.name,
          date: format(selectedDate, 'MMMM dd, yyyy'),
          time: selectedTime
        } 
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Book Your Appointment</h1>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Calendar Section */}
          <div className="bg-indigo-50 p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-indigo-800">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Select Date & Time
            </h2>
            
            {/* Date Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose a Date
              </label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={format(selectedDate, 'yyyy-MM-dd')}
                onChange={(e) => handleDateChange(e.target.value)}
              >
                {generateDateOptions().map((date) => (
                  <option key={format(date, 'yyyy-MM-dd')} value={format(date, 'yyyy-MM-dd')}>
                    {format(date, 'EEEE, MMMM dd, yyyy')}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose a Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.map((time) => {
                  const isBooked = bookedSlots.includes(time);
                  return (
                    <button
                      key={time}
                      type="button"
                      className={`p-2 rounded-md text-center ${
                        selectedTime === time
                          ? 'bg-indigo-600 text-white'
                          : isBooked
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-indigo-100'
                      } border ${
                        selectedTime === time
                          ? 'border-indigo-600'
                          : 'border-gray-300'
                      }`}
                      onClick={() => !isBooked && handleTimeSelection(time)}
                      disabled={isBooked}
                    >
                      <div className="flex items-center justify-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {time}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Form Section */}
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
              <User className="h-5 w-5 mr-2" />
              Your Information
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      {...register('phone', { required: 'Phone number is required' })}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      {...register('message')}
                      rows={4}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Tell us about your appointment needs..."
                    ></textarea>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading || !selectedTime}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 ${
                      loading || !selectedTime ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    }`}
                  >
                    {loading ? 'Booking...' : 'Book Appointment'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-blue-800 mb-2">What happens next?</h3>
        <p className="text-blue-700">
          After booking, you'll receive a confirmation email with your appointment details. 
          We'll also send you a reminder 24 hours before your scheduled time.
        </p>
      </div>
    </div>
  );
};

export default BookAppointment;