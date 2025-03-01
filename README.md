# AppointEase - Appointment Booking System

A full-stack web application for booking and managing appointments with email notifications.

## Features

- Interactive calendar interface for selecting appointment dates and times
- Real-time availability checking
- Email notifications for both clients and administrators
- Admin dashboard for appointment management
- Responsive design for all devices
- Secure data storage with Supabase

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: Supabase (PostgreSQL)
- **Email**: Nodemailer
- **Routing**: React Router
- **Forms**: React Hook Form
- **Date Handling**: date-fns
- **Icons**: Lucide React

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` and fill in your credentials
4. Connect to Supabase by clicking the "Connect to Supabase" button in the top right
5. Run the migrations to set up the database schema
6. Start the development server:
   ```
   npm run dev
   ```
7. In a separate terminal, start the backend server:
   ```
   npm run server
   ```

## Environment Variables

The following environment variables are required:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `EMAIL_HOST`: SMTP server host
- `EMAIL_PORT`: SMTP server port
- `EMAIL_SECURE`: Whether to use secure connection (true/false)
- `EMAIL_USER`: SMTP username
- `EMAIL_PASS`: SMTP password
- `EMAIL_FROM`: Sender email address
- `ADMIN_EMAIL`: Admin email address for notifications
- `PORT`: Server port (default: 3001)

## Database Schema

The application uses a single `appointments` table with the following structure:

- `id`: UUID, primary key
- `name`: Text, client's full name
- `email`: Text, client's email address
- `phone`: Text, client's phone number
- `date`: Date, appointment date
- `time_slot`: Text, appointment time
- `message`: Text, optional additional information
- `created_at`: Timestamp, when the appointment was booked

## License

MIT