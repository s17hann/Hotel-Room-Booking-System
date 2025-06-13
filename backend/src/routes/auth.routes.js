/**
 * @name Hotel Room Booking System
 * @author Shihan
 * @description Hotel Room Booking and Management System Software ~ Developed By Shihan
 * @copyright ©2023 ― Shihan. All rights reserved.
 * @version v0.0.1
 *
 */

const router = require('express').Router();
const avatarUpload = require('../middleware/user.avatar.upload');
const { authLimiter } = require('../middleware/access.limiter');
const { isAuthenticatedUser, isRefreshTokenValid, isBlocked } = require('../middleware/app.authentication');
const {
  register, loginUser, logoutUser, forgotPassword, resetPassword, changePassword, sendEmailVerificationLink, emailVerification, refreshToken
} = require('../controllers/auth.controllers');

// routes for register, login and logout user
router.route('/auth/registration').post(authLimiter, avatarUpload.single('avatar'), register);
router.route('/auth/login').post(authLimiter, avatarUpload.none(), loginUser);
router.route('/auth/logout').post(isAuthenticatedUser, isBlocked, logoutUser);

// routes for forgot & change password
router.route('/auth/forgot-password').post(authLimiter, forgotPassword);
router.route('/auth/reset-password/:token').post(authLimiter, resetPassword);
router.route('/auth/change-password').post(authLimiter, isAuthenticatedUser, isBlocked, changePassword);

// routes for user email verification
router.route('/auth/send-email-verification-link').post(authLimiter, isAuthenticatedUser, isBlocked, sendEmailVerificationLink);
router.route('/auth/verify-email/:token').post(authLimiter, isAuthenticatedUser, isBlocked, emailVerification);

// route for get user refresh JWT Token
router.route('/auth/refresh-token').get(authLimiter, isRefreshTokenValid, refreshToken);

module.exports = router;
