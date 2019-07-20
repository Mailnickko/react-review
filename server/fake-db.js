const Rental = require("./models/rental");
const User = require("./models/user");
const Booking = require("./models/booking");

const fakeDbData = require("./data.json");

class FakeDB {
  constructor() {
    this.rentals = fakeDbData.rentals;
    this.users = fakeDbData.users;
  }

  async pushDataToDB() {
    const user = new User(this.users[0]);
    const user2 = new User(this.users[1]);
    const user3 = new User(this.users[2]);

    this.rentals.forEach((rental, i) => {
      const newRental = new Rental(rental);
      newRental.user = user;
      user.rentals.push(newRental);
      newRental.save().catch(err => `Failed to save newRental at index ${i}`);
    });

    const promises = [user.save(), user2.save(), user3.save()];

    Promise.all(promises)
      .then(() => console.log("All Saved"))
      .catch(err => console.log("Something went wrong", err));

    // await user.save().catch(err => console.log("Failed to saver user1"));
    // await user2.save().catch(err => console.log("Failed to saver user2"));
    // await user3.save().catch(err => console.log("Failed to saver user3"));
  }

  async seedDB() {
    await this.cleanDB();
    await this.pushDataToDB();
  }

  async cleanDB() {
    await User.remove({});
    await Rental.remove({});
    await Booking.remove({});
  }
}

module.exports = FakeDB;
