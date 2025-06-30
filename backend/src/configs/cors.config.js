/**
 * @name Hotel Room Booking System
 * @author Shihan
 * @description Hotel Room Booking and Management System Software ~ Developed By Shihan
 * @copyright ©2025 ― Shihan. All rights reserved.
 * @version v0.0.1
 *
 */

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3033',
  'http://localhost:3034',
  'http://localhost:5000',
  'http://localhost:5001',
  'http://localhost:5500',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:3033',
  'http://127.0.0.1:3034',
  'http://127.0.0.1:5000',
  'http://127.0.0.1:5001',
  'https://api-hotel-booking.vercel.app',
  'https://admin-beach-resort.vercel.app',
  'https://hotel-beach-resort.vercel.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (
      !origin ||
      allowedOrigins.indexOf(origin) !== -1 ||
      origin.startsWith('http://localhost:') ||
      origin.startsWith('http://127.0.0.1:') ||
      process.env.APP_NODE_ENV !== 'production'
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS origin'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = corsOptions;
