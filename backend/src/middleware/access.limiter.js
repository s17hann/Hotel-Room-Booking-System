/**
 * @name Hotel Room Booking System
 * @author Shihan
 * @description Hotel Room Booking and Management System Software ~ Developed By Shihan
 * @copyright ©2023 ― Shihan. All rights reserved.
 * @version v0.0.1
 *
 */

const path = require('path');
const fs = require('fs');
const appRoot = require('app-root-path');
const rateLimit = require('express-rate-limit');
const FileStreamRotator = require('file-stream-rotator');
const { errorResponse } = require('../configs/app.response');
const currentDateTime = require('../lib/current.date.time');
const logger = require('./winston.logger');

const createLimiterHandler = (filenamePrefix, title) => async (req, res, _next, options) => {
  try {
    const LOGS_FOLDER = `${appRoot}/logs/limiter`;

    if (!fs.existsSync(`${appRoot}/logs`)) {
      fs.mkdirSync(`${appRoot}/logs`);
    }

    if (!fs.existsSync(LOGS_FOLDER)) {
      fs.mkdirSync(LOGS_FOLDER);
    }

    const apiLimiterRotator = FileStreamRotator.getStream({
      date_format: 'YYYY-MM-DD',
      filename: path.join(LOGS_FOLDER, `${filenamePrefix}-%DATE%.log`),
      frequency: 'daily',
      verbose: false
    });

    const logMessage = `[${currentDateTime()}]\tTITLE: ${title}\tMETHOD: ${req.method}\tURL: ${req.url}\tCLIENT: ${req.headers['user-agent']}\n`;
    apiLimiterRotator.write(logMessage, 'utf8');
  } catch (err) {
    logger.error('API limiter error: ', err);
  }

  res.status(options.statusCode).send(errorResponse(
    29,
    'TOO MANY REQUEST',
    options.message.message
  ));
};

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 1000, // limit each IP to 1000 requests per window
  message: { message: 'Too many requests from this IP, please try again after a pause' },
  handler: createLimiterHandler('app-limiter', 'TOO MANY REQUEST'),
  standardHeaders: true,
  legacyHeaders: false
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { message: 'Too many requests from this IP, please try again after a 60 second pause' },
  handler: createLimiterHandler('api-limiter', 'TOO MANY API REQUEST'),
  standardHeaders: true,
  legacyHeaders: false
});

// Strict rate limiter for all sensitive auth routes (brute-force defense)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 10, // limit each IP to 10 auth requests per 15 minutes
  message: { message: 'Too many authentication attempts from this IP. Please try again after 15 minutes.' },
  handler: createLimiterHandler('auth-limiter', 'TOO MANY AUTH ATTEMPTS'),
  standardHeaders: true,
  legacyHeaders: false
});

// Strict rate limiter for placing booking orders (prevents rapid booking spam & race conditions)
const bookingOrderLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes window
  max: 15, // limit each IP to 15 booking attempts per 10 minutes
  message: { message: 'Too many booking requests from this IP. Please wait a few minutes before trying again.' },
  handler: createLimiterHandler('booking-limiter', 'TOO MANY BOOKING REQUESTS'),
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  limiter,
  apiLimiter,
  authLimiter,
  bookingOrderLimiter
};
