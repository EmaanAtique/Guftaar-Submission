const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Coach = require("../../models/user");
const crypto = require("crypto");
const Meetings = require("../../models/meeting");
const Client = require("../../models/user");
const Feedback = require("../../models/meeting");

const router = new express.Router();

const verifyJWT = (req, res, next) => {
  const token = req.headers["accesstoken"];
  if (!token) {
    res.json({ isLoggedIn: false, message: "No token provided" });
  } else {
    jwt.verify(token, "harris123", (err, decoded) => {
      // TODO: Replace with env variable
      if (err) {
        return res.json({ isLoggedIn: false, message: "Invalid token" });
      } else {
        req.user = {};
        req.userId = decoded.id;
        req.user.username = decoded.username;
        next();
      }
    });
  }
};

router.post("/login", (req, res) => {
  const coachLogin = req.body;
  Coach.Coach.findOne({ email: coachLogin.email })
    .then((coach) => {
      if (!coach) {
        return res.json({
          error: "Invalid email or password",
        });
      }
      bcrypt.compare(coachLogin.password, coach.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { id: coach._id, email: coach.email },
            "harris123",
            { expiresIn: 86400 },
            (err, token) => {
              if (err) {
                return res.json({ message: err });
              } else {
                return res.json({
                  message: "success",
                  token: token,
                  id: coach._id,
                  email: coach.email,
                });
              }
            }
          );
        } else {
          res.json({ error: "Invalid email or password" });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/changePassword", (req, res) => {
  const pass = req.body.new;
  const id = req.body.id;
  const salted = req.body.salted;
  Coach.Coach.updateOne({ _id: id }, { $set: { password: pass, salt: salted } })
    .exec()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json({ error: err });
    });
});


router.post("/getName", (req, res) =>  {
  console.log(req.body)
  Coach.Coach.findOne({ email: req.body.email})
    .select("firstName")
    .exec()
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      console.log("in error")
      res.json({ error: err });
    });
});

// router.post("/getMeetings", (req, res) =>  {
//   const now = new Date();
//   const { email } = req.body;

//   Meetings.Meetings.find({ coachEmail: email })
//     .select("clientEmail meetingDate ")
//     .exec()
//     .then((emailResponse) => {
//       let futureMeetings = new Array()

//       emailResponse.map((elem) => {
//         if (elem.meetingDate.getTime() > now.getTime()){
//           futureMeetings.push(elem)
//         }
//       })
//       let toSend = new Map()

//       futureMeetings.map((elem, index) => {
//         let date = elem.meetingDate;
//         let email = elem.clientEmail
//         console.log(date, email)
//         Client.Client.findOne({ email: email })
//             .select("firstName")
//             .exec()
//             .then((response) => {
//               toSend.set(index, {date: date, clientName: response.firstName})
//               console.log(toSend)
//             })
//             .catch((err) => {
//               console.log("error")
//             });
//       })
//       res.send(toSend)
//     })
//     .catch((err) => {
//       res.send({ error: err });
//     });
// });

router.post("/getMeetings", (req, res) =>  {
  const now = new Date();
  const { email } = req.body;

  Meetings.Meetings.find({ coachEmail: email })
    .select("clientEmail meetingDate ")
    .exec()
    .then((emailResponse) => {
      let futureMeetings = new Array()

      emailResponse.map((elem) => {
        if (elem.meetingDate.getTime() > now.getTime()){
          futureMeetings.push(elem)
        }
      })
      let toSend = {}

      // Use Promise.all to wait for all Promises to resolve
      Promise.all(futureMeetings.map((elem, index) => {
        let date = elem.meetingDate;
        let email = elem.clientEmail
        console.log(date, email)
        return Client.Client.findOne({ email: email })
            .select("firstName")
            .exec()
            .then((response) => {
              toSend[index] = {date: date, clientName: response.firstName}
              console.log(toSend)
            })
            .catch((err) => {
              console.log("error")
            });
      }))
      .then(() => {
        res.send(toSend);
      })
      .catch((err) => {
        res.send({ error: err });
      });
    })
    .catch((err) => {
      res.send({ error: err });
    });
});


module.exports = router;
