/**
 * @name Hotel Room Booking System
 * @author Shihan
 * @description Hotel Room Booking and Management System Software ~ Developed By Shihan
 * @copyright ©2025 ― Shihan. All rights reserved.
 * @version v0.0.1
 *
 */

import {
  FaBeer, FaCocktail, FaHiking, FaShuttleVan
} from 'react-icons/fa';

const services = [
  {
    icon: <FaCocktail />,
    title: 'Free Cocktails',
    info: 'Enjoy handcrafted artisan cocktails and refreshing tropical drinks served daily at our oceanfront lounge.'
  },
  {
    icon: <FaHiking />,
    title: 'Endless Hiking',
    info: 'Explore guided nature trails and scenic coastal paths with breathtaking panoramic ocean and mountain views.'
  },
  {
    icon: <FaShuttleVan />,
    title: 'Free Shuttle',
    info: 'Complimentary private luxury airport transfers and local area chauffeured transportation on demand.'
  },
  {
    icon: <FaBeer />,
    title: 'Craft Beverages',
    info: 'Curated selection of local craft beers, chilled premium ciders, and signature beverages available 24/7.'
  }
];

export default services;
