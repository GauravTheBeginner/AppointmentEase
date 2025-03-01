import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, User, Mail, Phone, Trash2, RefreshCw } from 'lucide-react';

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time_slot: string;
  message: string;
  created_at: string;
}

const Dashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = JSON.parse(localStorage.getItem('appointments') || '[]');
      setAppointments(data || []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return;
    
    const existingAppointments: Appointment[] = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updatedAppointments = existingAppointments.filter((app: Appointment) => app.id !== id);
    
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    setAppointments(updatedAppointments);
  };

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), 'MMMM dd, yyyy');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Appointment Dashboard</h1>
        <button
          onClick={fetchAppointments}
          className="flex items-center mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-700 mb-2">No Appointments Found</h2>
          <p className="text-gray-500 mb-4">There are no appointments scheduled at the moment.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{appointment.name}</div>
                          <div className="text-sm text-gray-500">
                            Booked on {format(new Date(appointment.created_at), 'MMM dd, yyyy')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
                        <span className="text-sm text-gray-900">{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="h-5 w-5 text-indigo-600 mr-2" />
                        <span className="text-sm text-gray-500">{appointment.time_slot}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-900">{appointment.email}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Phone className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-500">{appointment.phone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-500 max-w-xs truncate">
                        {appointment.message || 'No additional message'}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;