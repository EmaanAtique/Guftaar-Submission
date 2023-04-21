const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
  meetingId: { type: String, required: true },
  clientEmail: { type: String, required: true, unique: false},
  coachEmail: { type: String, required: true },
  meetingDate: { type: Date, default: Date.now() },
});

const clientNotes = new Schema({
  clientEmail: { type: String, required: true, unique: false},
  coachEmail: { type: String, required: true },
  note: { type: String, default: "" },
});

const coachFeedback = new Schema({
  coachEmail: { type: String, required: true },
  feedback: { type: String, default: "" },
});

const Meetings = mongoose.model("Meetings", meetingSchema);
const Notes = mongoose.model("Notes", clientNotes);
const Feedback = mongoose.model("Feedback", coachFeedback);

module.exports = { Meetings, Notes, Feedback };
