const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Client = require("../../models/user");
const Coach = require("../../models/user");
const crypto = require("crypto");
const Meetings = require("../../models/meeting");
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

router.get("/", (req, res) => {
  res.send("Client route");
});

router.post("/register", (req, res, next) => {
  const { firstName, lastName, age, email, password } = req.body;
  const newClient = new Client.Client({
    firstName: firstName,
    lastName: lastName,
    age: age,
    email: email,
    password: password,
    dateOfJoining: Date.now(),
  });
  newClient
    .save()
    .then((response) => {
      res.send({ status: "success", message: "Client registered" });
      next(response);
    })
    .catch((err) => {
      res.send("We already have an account made with this email");
    });

  const token = new Client.Token({
    userId: newClient._id,
    token: crypto.randomBytes(32).toString("hex"),
  })
    .save()
    .then((response) => {});
});

router.post("/login", (req, res) => {
  const clientLogin = req.body;
  Client.Client.findOne({ email: clientLogin.email }).then((client) => {
    if (!client) {
      return res.json({
        error: "Invalid Email or Password",
      });
    }
    bcrypt.compare(clientLogin.password, client.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { id: client._id, username: client.firstName },
          "harris123", // TODO: Replace with env variable
          { expiresIn: 86400 },
          (err, token) => {
            if (err) {
              return res.json({ message: err });
            } else {
              return res.json({
                message: "success",
                token: token,
                id: client._id,
                email: client.email,
              });
            }
          }
        );
      } else {
        res.json({
          error: "Invalid Email or Password",
        });
      }
    });
  });
});

router.post("/changePassword", (req, res) => {
  const pass = req.body.new;
  const id = req.body.id;
  const salted = req.body.salted;
  Client.Client.updateOne(
    { _id: id },
    { $set: { password: pass, salt: salted } }
  )
    .exec()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

router.post("/getPass", (req, res) => {
  Client.Client.find({ _id: req.body.id })
    .exec()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

router.get("/coaches", (req, res) => {
  Coach.Coach.find({})
    .select("firstName lastName email rating qualification yearsOfExperience")
    .exec()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

router.post("/getClientDashboardDetails", (req, res) => {
  const { email } = req.body;
  Client.Client.findOne({ email: email })
    .select("firstName currentActiveCourse")
    .exec()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send({ error: err });
    });
});

router.post("/getStreak", async (req, res) => {
  const { email } = req.body;
  const user = await Client.Client.findOne({ email: email });
  Client.Client.findOne({ email: email })
    .select("streakLastUpdated streakCount")
    .exec()
    .then(async (response) => {
      console.log(response.streakLastUpdated);
      console.log(response.streakCount);
      let lastUpdated = response.streakLastUpdated;
      console.log(lastUpdated);
      const now = new Date();
      console.log(now.getTime());
      console.log(lastUpdated.getTime());
      const timeDiff = Math.abs(now.getTime() - lastUpdated.getTime());
      const diffHours = Math.ceil(timeDiff / (1000 * 60 * 60));
      if (diffHours > 24) {
        user.streakCount = 0;
        user.activityStatus.linkLater = false;
        user.activityStatus.syllableCounting = false;
        user.activityStatus.breathingExercise = false;
        await user.save();
        res.json({ streak: user.streakCount });
      } else {
        res.json({ streak: response.streakCount });
      }
    })
    .catch((err) => {
      res.send({ error: err });
    });
});

router.post("/getMeetings", (req, res) => {
  let name = "";
  let date = "";
  const now = new Date();
  const { email } = req.body;

  Meetings.Meetings.find({ clientEmail: email })
    .select("coachEmail meetingDate ")
    .exec()
    .then((emailResponse) => {
      const upcomingMeeting = emailResponse.find(
        (meeting) => meeting.meetingDate.getTime() > now.getTime()
      );
      if (upcomingMeeting) {
        date = upcomingMeeting.meetingDate;
        const coachEmail = upcomingMeeting.coachEmail;
        Client.Coach.findOne({ email: coachEmail })
          .select("firstName")
          .exec()
          .then((nameResponse) => {
            name = nameResponse.firstName;
            let toSend = { name: name, time: date };
            res.send(toSend);
          })
          .catch((err) => {
            res.send("");
          });
      } else {
        res.send("");
      }
    })
    .catch((err) => {
      res.send({ error: err });
    });
});

router.post("/updateLinkLater", async (req, res) => {
  const { email, linkLater } = req.body;
  const user = await Client.Client.findOne({ email: email });
  user.activityStatus.linkLater = true;
  await user.save();

  if (
    user.activityStatus.linkLater &&
    user.activityStatus.syllableCounting &&
    user.activityStatus.breathingExercise
  ) {
    user.streakCount += 1;
    await user.save();
  }
});

router.post("/updateSyllableCounting", async (req, res) => {
  const { email, syllableCounting } = req.body;
  const user = await Client.Client.findOne({ email: email });
  user.activityStatus.syllableCounting = true;
  await user.save();

  if (
    user.activityStatus.linkLater &&
    user.activityStatus.syllableCounting &&
    user.activityStatus.breathingExercise
  ) {
    user.streakCount += 1;
    const now = new Date();
    user.lastUpdated = now.getTime();
    await user.save();
  }
});

router.post("/updateBreathingExercise", async (req, res) => {
  const { email, breathingExercise } = req.body;
  const user = await Client.Client.findOne({ email: email });
  user.activityStatus.breathingExercise = true;
  await user.save();

  if (
    user.activityStatus.linkLater &&
    user.activityStatus.syllableCounting &&
    user.activityStatus.breathingExercise
  ) {
    user.streakCount += 1;
    await user.save();
  }
});

router.post("/addFeedback", (req, res) => {
  const { email, feedback } = req.body;
  console.log("Received from client:", email, feedback);
  const newFeedback = new Feedback.Feedback({
    coachEmail: email,
    feedback: feedback,
  });

  console.log(newFeedback);

  newFeedback
    .save()
    .then((response) => {
      console.log("Succefully saved to db");
      res.send({ status: "success", message: "response saved" });
      // next(response);
    })
    .catch((err) => {
      console.log("Error in saving in db");
      res.send({ status: "error" });
      // console.log("in error")
    });
});

module.exports = router;
