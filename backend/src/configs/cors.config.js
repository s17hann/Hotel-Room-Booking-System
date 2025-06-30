/**
 * @name Hotel Room Booking System
 * @author Shihan
 * @description Hotel Room Booking and Management System Software ~ Developed By Shihan
 * @copyright ©2023 ― Shihan. All rights reserved.
 * @version v0.0.1
 *
 */

const allowedOrigins = [
  'http://localhost:3033',
  'http://localhost:3034',
  'http://localhost:5001',
  'http://localhost:5500',
  'http://127.0.0.1:3033',
  'http://127.0.0.1:3034',
  'http://127.0.0.1:5001',
  'https://api-hotel-booking.vercel.app',
  'https://admin-beach-resort.vercel.app',
  'https://hotel-beach-resort.vercel.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS origin'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = corsOptions;
