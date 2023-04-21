import "./App.css";
import "./fonts/LeagueSpartan-VariableFont_wght.ttf";
import LandingPage from "./components/landing_page.js";
import { Routes, Route, Link } from "react-router-dom";
import CoachLogin from "./components/coach-login";
import Login from "./components/login";
import Register from "./components/register";
import AdminLogin from "./components/admin_login";
import Dashboard from "./components/client_dashboard";
import ChangePass from "./components/change_password";
import AdminDashboard from "./components/admin_dashboard";
import AddEmployee from "./components/add_employee";
import AddCoach from "./components/add_coach_form";
import AddAdmin from "./components/add_admin_form";
import DailyActivities from "./components/daily_activities";
import SetBreathingTime from "./components/set_breathing_time";
import SpeechTechniques from "./components/speech_techniques";
import BreathingExercise from "./components/breathing";
import LinkLator from "./components/linklater";
import CoachDashboard from "./components/coach_dashboard";
import ViewCoaches from "./components/view_coaches"
import QuickPractice from "./components/quick_practice";
import { useState } from "react";
import SyllableCounting from "./components/syllable_counting";
import SyllableCountingResult from "./components/syllableResult"
import Courses from "./components/courses";
import CoachFeedback from "./components/coach_feedback";
import ReadReviews from "./components/read_reviews";
import SingleCoachFeedback from "./components/single_coach_feedback"
import Notes from "./components/main-notes"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} />
         
          <Route path="coach">
            <Route path="login" element={<CoachLogin />} />
            <Route path="dashboard" element={<CoachDashboard />} />
            <Route path="changePassword" element={<ChangePass />} />
            <Route path="notes" element={<Notes/>} />

          </Route>
          
          <Route path="client">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="changePassword" element={<ChangePass />} />
            <Route path="speechTechniques" element={<SpeechTechniques />} />
            <Route path="quickPractice" element={<QuickPractice />} />
            <Route path="courses" element={<Courses />} />
            {/* <Route path="coaches" element={<Coach} */}
            <Route path="viewCoaches" element={<ViewCoaches />} />
            <Route path="addFeedback" element={<CoachFeedback />} />


            <Route path="dailyActivities">
              <Route index element={<DailyActivities />} />
              <Route path="setBreathingTime" element={<SetBreathingTime />} />
              <Route path="BreathingExercise" element={<BreathingExercise />} />
              <Route path="Linklator" element={<LinkLator />} />
              <Route path="SyllableCounting" element={<SyllableCounting />} />
              <Route path="SyllableCountingResult" element={<SyllableCountingResult />} />
            </Route>
          </Route>

          <Route path="admin">
            <Route path="login" element={<AdminLogin />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="addEmployee" element={<AddEmployee />} />
            <Route path="addCoach" element={<AddCoach />} />
            <Route path="addAdmin" element={<AddAdmin />} />
            <Route path="changePassword" element={<ChangePass />} />
            <Route path="readReviews" element={<ReadReviews />} />
            <Route path="readReviewCoach" element={<SingleCoachFeedback />} />
          
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
