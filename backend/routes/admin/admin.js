const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../../models/user");
const Coach = require("../../models/user");
const Client = require("../../models/user");
const crypto = require("crypto");
const Feedback = require("../../models/meeting");

const router = new express.Router();

const verifyJWT = (req, res, next) => {
  const token = req.headers["accesstoken"];
  if (!token) {
    res.status(404).json({ isLoggedIn: false, message: "No token provided" });
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
  // console.log("Got Request?")
  const adminLogin = req.body;
  // console.log(adminLogin.email)
  Admin.Admin.findOne({ email: adminLogin.email })
    .then((admin) => {
      if (!admin) {
        // console.log("This user doesn't exist")
        return res.json({
          error: "Invalid email or password",
        });
      }
      // console.log("user exists")
      bcrypt.compare(adminLogin.password, admin.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { id: admin._id, email: admin.email }, // ! CONFIRM THIS if needs to be replaced with username
            "harris123",
            { expiresIn: 86400 },
            (err, token) => {
              if (err) {
                // console.log("Incorrect Password")
                return res.json({ message: err });
              } else {
                return res.json({
                  message: "success",
                  token: token,
                  id: admin._id,
                  email: admin.email,
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
  Admin.Admin.updateOne({ _id: id }, { $set: { password: pass, salt: salted } })
    .exec()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

router.post("/addCoach", (req, res, next) => {
  const {
    firstName,
    lastName,
    gender,
    email,
    age,
    qualification,
    yearsOfExperience,
    password,
  } = req.body;

  const newCoach = new Coach.Coach({
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    age: age,
    qualification: qualification,
    yearsOfExperience: yearsOfExperience,
    password: password,
    email: email,
  });

  console.log(newCoach);

  newCoach
    .save()
    .then((response) => {
      console.log("saved to db");
      res.send({ status: "success", message: "Coach registered" });
      next(response);
    })
    .catch((err) => {
      console.log("error in saving");
      res.send({ status: "error", message:"email in use" });
    });

  const token = Coach.Token({
    userId: newCoach._id,
    token: crypto.randomBytes(32).toString("hex"),
  })
    .save()
    .then((response) => {
      console.log(response);
    });
});

router.post("/addAdmin", (req, res, next) => {
  const { firstName, lastName, gender, email, password, age } = req.body;
  const newAdmin = new Admin.Admin({
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    age: age,
    password: password,
    email: email,
  });

  console.log(newAdmin);

  newAdmin
    .save()
    .then((response) => {
      console.log("admin added to db");
      res.send({ status: "success", message: "Admin registered" });
      next(response);
    })
    .catch((err) => {
      console.log("error in adding admin to db");
      res.send({ status: "error", message:"email in use" });
    });

  const token = Admin.Token({
    userId: newAdmin._id,
    token: crypto.randomBytes(32).toString("hex"),
  })
    .save()
    .then((response) => {
      console.log(response);
    });
});

router.get("/getActorCount", async (req, res) => {
  try {
    const [clientCount, coachCount, adminCount] = await Promise.all([
      Client.Client.countDocuments(),
      Client.Coach.countDocuments(),
      Client.Admin.countDocuments(),
    ]);
    const data = { Clients: clientCount, Coach: coachCount, Admin: adminCount };
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log("in error:", err);
    res.send({ error: err });
  }
});

router.get("/getTopCoaches", (req, res) => {
  Coach.Coach.find({})
    .select("firstName lastName rating")
    .sort({ rating: -1 })
    .limit(4)
    .then((coaches) => {
      let count = 0;
      let toSend = {};
      coaches.forEach((coach) => {
        toSend[count] = coach;
        count++;
      });

      console.log(toSend);
      res.json(toSend);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/getAllCoaches", (req, res) => {
  // get the list of all coaches
  Coach.Coach.find({})
    .select("firstName lastName rating")
    .then((coaches) => {
      res.json({ coaches: coaches });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/updateRating", async (req, res) => {
  console.log("Got request", req.body.rating, req.body.id);
  const user = await Coach.Coach.findById(req.body.id);

  Coach.Coach.findById(req.body.id)
    .select("rating")
    .exec()
    .then(async (response) => {
      console.log("This coach:", user);
      console.log("Old rating", response.rating);
      user.rating = req.body.rating;
      await user.save();
      res.send("sucess");
    })
    .catch((err) => {
      console.log("in error for rating update");
      res.send({ error: err });
    });
});

router.get("/feedback", (req, res) => {
  console.log("Requesting for feedback"); 
  Feedback.Feedback.find({})
    .select("coachEmail feedback ")
    .exec()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

module.exports = router;
