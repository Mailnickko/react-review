const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");

router.get("", (req, res) => {
  Rental.find({})
    .select("-bookings") // get without bookings
    .exec()
    .then(foundRentals => {
      res.json(foundRentals);
    })
    .catch(err => {
      res.status(422).send({
        errors: [
          { title: "Get Rentals Error", detail: "Could not find any rentals" }
        ]
      });
    });
});

router.get("/:id", (req, res) => {
  const rentalId = req.params.id;
  Rental.findById(rentalId)
    .populate("user", "username -_id")
    .populate("bookings", "startAt endAt -_id")
    .exec()
    .then(foundRental => {
      res.json(foundRental);
    })
    .catch(err => {
      res.status(422).send({
        errors: [
          {
            title: "Get Rental By Id Error",
            detail: "Could not find any rental with that id"
          }
        ]
      });
    });
});

module.exports = router;
