const express = require("express");
const mongoose = require("mongoose");
const app = express();
const config = require("./config/dev");
const Rental = require("./models/rental");
const FakeDB = require("./fake-db");

const rentalRoutes = require("./routes/rentals");

mongoose.connect(config.DB_URI).then(() => {
  const fakeDB = new FakeDB();
  fakeDB.seedDB();
});

app.use("/api/v1/rentals", rentalRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
