const Rental = require("./models/rental");
const User = require("./models/user");
const Booking = require("./models/booking");

class FakeDB {
  constructor() {
    this.rentals = [
      {
        title: "Nice view on ocean",
        city: "San Francisco",
        street: "Main street",
        category: "condo",
        image:
          "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 4,
        shared: true,
        description: "Very nice apartment in center of the city.",
        dailyRate: 43
      },
      {
        title: "Modern apartment in center",
        city: "New York",
        street: "Time Square",
        category: "apartment",
        image:
          "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 1,
        shared: false,
        description: "Very nice apartment in center of the city.",
        dailyRate: 11
      },
      {
        title: "Old house in nature",
        city: "Spisska Nova Ves",
        street: "Banicka 1",
        category: "house",
        image:
          "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 5,
        shared: true,
        description: "Very nice apartment in center of the city.",
        dailyRate: 23
      }
    ];

    this.users = [
      {
        username: "Test User",
        email: "test@test.com",
        password: "password"
      },
      {
        username: "Test User2",
        email: "test2@test.com",
        password: "password"
      },
      {
        username: "Test User 3",
        email: "test3@test.com",
        password: "password"
      }
    ];
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
