/**
 * @name Hotel Room Booking System
 * @author Shihan
 * @description Hotel Room Booking and Management System Software ~ Developed By Shihan
 * @copyright ©2023 ― Shihan. All rights reserved.
 * @version v0.0.1
 *
 */

const mongoose = require('mongoose');
const logger = require('../middleware/winston.logger');

mongoose.set('strictQuery', false);

const connectDatabase = async () => {
  const connectionString = process.env.MONGO_URI;

  if (!connectionString) {
    logger.error('MONGO_URI is not defined in environment variables');
    return;
  }

  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    logger.info('Connection established to MongoDB database (Atlas/Local) successfully!');
  } catch (error) {
    logger.error('Error connecting to MongoDB database: ', error);
  }
};

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected. Attempting reconnection...');
});

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB connection error: ', err);
});

module.exports = connectDatabase;
