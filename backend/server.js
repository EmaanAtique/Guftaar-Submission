const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// const Meetings = require("./models/meeting")
require("dotenv").config();

const clientRouter = require("./routes/client/client");
const coachRouter = require("./routes/coach/coach");
const adminRouter = require("./routes/admin/admin");

const app = express();
const port = 4000; // TODO: Replace with process.env.PORT

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));

app.use("/client", clientRouter);
app.use("/coach", coachRouter);
app.use("/admin", adminRouter);

const uri =
  "mongodb+srv://harrisahmad55:ladBob12@cluster0.4d91bik.mongodb.net/guftaar"; // TODO: Replace with process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database connection established");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

