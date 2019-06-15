const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const config = require("./config/dev");
const Rental = require("./models/rental");
const FakeDB = require("./fake-db");

const bookingRoutes = require("./routes/bookings");
const rentalRoutes = require("./routes/rentals");
const userRoutes = require("./routes/users");

mongoose.connect(config.DB_URI).then(() => {
  const fakeDB = new FakeDB();
  fakeDB.seedDB();
});

app.use(bodyParser.json());
app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bookings", bookingRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
