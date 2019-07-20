const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");
const User = require("../models/user");
const UserCtrl = require("../controllers/userController");

router.get("/manage", UserCtrl.authMiddleware, function(req, res) {
  const user = res.locals.user;

  Rental.where({ user })
    .populate("bookings")
    .exec()
    .then(foundRentals => {
      return res.json(foundRentals);
    })
    .catch(err => {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    });
});

router.get("", (req, res) => {
  const city = req.query.city;
  const query = city ? { city: city.toLowerCase() } : {};

  Rental.find(query)
    .select("-bookings") // get without bookings
    .exec()
    .then(foundRentals => {
      if (city && foundRentals.length === 0) {
        return res.status(422).send({
          errors: [
            {
              title: "No Rentals Found!",
              detail: `There are no rentals for city ${city}`
            }
          ]
        });
      }

      return res.json(foundRentals);
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

// delete Rental
router.delete("/:id", UserCtrl.authMiddleware, function(req, res) {
  const user = res.locals.user;

  Rental.findById(req.params.id)
    .populate("user", "_id")
    // find bookings happening in the future
    .populate({
      path: "bookings",
      select: "startAt",
      match: { startAt: { $gt: new Date() } }
    })
    .exec()
    .then(foundRental => {
      if (user.id !== foundRental.user.id) {
        return res.status(422).send({
          errors: [
            { title: "Invalid User!", detail: "You are not rental owner!" }
          ]
        });
      }

      if (foundRental.bookings.length > 0) {
        return res.status(422).send({
          errors: [
            {
              title: "Active Bookings!",
              detail: "Cannot delete rental with active bookings!"
            }
          ]
        });
      }

      foundRental
        .remove()
        .then(() => {
          return res.json({ status: "deleted" });
        })
        .catch(err => {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        });
    })
    .catch(err => {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    });
});

// create Rental
router.post("", UserCtrl.authMiddleware, function(req, res) {
  const {
    title,
    city,
    street,
    category,
    image,
    shared,
    bedrooms,
    description,
    dailyRate
  } = req.body;
  const user = res.locals.user;

  const rental = new Rental({
    title,
    city,
    street,
    category,
    image,
    shared,
    bedrooms,
    description,
    dailyRate
  });
  rental.user = user;

  Rental.create(rental)
    .then(newRental => {
      User.update({ _id: user.id }, { $push: { rentals: newRental } });
      return res.json(newRental);
    })
    .catch(err => {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    });
});

module.exports = router;
