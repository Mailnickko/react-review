const User = require("../models/user");
const normalizeErrors = require("../config/helpers");
const jwt = require("jsonwebtoken");
const config = require("../config/dev");

function parseToken(token) {
  // Token syntax is "Bearer somehash"
  return jwt.verify(token.split(" ")[1], config.SECRET);
}

function notAuthorized(res) {
  return res.status(401).send({
    errors: [
      { title: "Not authorized!", detail: "You need to login to get access!" }
    ]
  });
}

module.exports = {
  auth: (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
      return res.status(422).send({
        errors: [
          { title: "Data missing!", detail: "Provide email and password!" }
        ]
      });
    }

    User.findOne({ email })
      .then(foundUser => {
        if (!foundUser) {
          return res.status(422).send({
            errors: [{ title: "Invalid User!", detail: "User does not exist" }]
          });
        }
        if (foundUser.hasSamePassword(password)) {
          const token = jwt.sign(
            {
              userId: foundUser.id,
              username: foundUser.username
            },
            config.SECRET,
            { expiresIn: "1h" }
          );

          return res.json(token);
        } else {
          return res.status(422).send({
            errors: [
              { title: "Wrong Data!", detail: "Wrong email or password" }
            ]
          });
        }
      })
      .catch(err => {
        console.log("Error Authorizing User: ", err);
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      });
  },

  register: (req, res) => {
    const { username, email, password, passwordConfirmation } = req.body;

    if (!password || !email) {
      return res.status(422).send({
        errors: [
          { title: "Data missing!", detail: "Provide email and password!" }
        ]
      });
    }

    if (password !== passwordConfirmation) {
      return res.status(422).send({
        errors: [
          {
            title: "Invalid passsword!",
            detail: "Password is not a same as confirmation!"
          }
        ]
      });
    }

    User.findOne({ email })
      .then(foundUser => {
        if (foundUser) {
          return res.status(422).send({
            errors: [
              {
                title: "Invalid email!",
                detail: "User with this email already exist!"
              }
            ]
          });
        }
        const user = new User({
          username,
          email,
          password
        });

        user
          .save()
          .then(() => res.json({ registered: true }))
          .catch(err =>
            res.status(422).send({ errors: normalizeErrors(err.errors) })
          );
      })
      .catch(err => {
        console.log("Error Registering: ", err);
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      });
  },
  authMiddleware: (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      const user = parseToken(token);

      User.findById(user.userId)
        .then(foundUser => {
          if (foundUser) {
            // express suggested way to pass along dat to next handler
            res.locals.user = foundUser;
            next();
          } else {
            return notAuthorized(res);
          }
        })
        .catch(err => {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        });
    } else {
      return notAuthorized(res);
    }
  },
  getUser: (req, res) => {
    const requestedUserId = req.params.id;
    // set here from authorizeMiddleWare
    const user = res.locals.user;

    if (requestedUserId === user.id) {
      User.findById(requestedUserId)
        .then(foundUser => res.json(foundUser))
        .catch(err => {
          console.log("Error authorizing user");
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        });
    } else {
      User.findById(requestedUserId)
        .select("-revenue -stripeCustomerId -password")
        .exec(function(err, foundUser) {
          if (err) {
            return res
              .status(422)
              .send({ errors: normalizeErrors(err.errors) });
          }

          return res.json(foundUser);
        });
    }
  }
};
