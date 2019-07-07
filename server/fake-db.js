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

    this.rentals.forEach(async rental => {
      const newRental = new Rental(rental);
      newRental.user = user;
      user.rentals.push(newRental);

      await newRental.save();
    });

    await user.save();
    await user2.save();
    await user3.save();
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
