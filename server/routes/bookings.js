const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");

const UserCtrl = require("../controllers/userController");
const BookingCtrl = require("../controllers/bookingController");

router.post("", UserCtrl.authMiddleware, BookingCtrl.createBooking);

router.get("/manage", UserCtrl.authMiddleware, BookingCtrl.getUserBookings);

module.exports = router;
