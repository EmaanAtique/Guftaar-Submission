import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./breathing.css";
import NavbarClient from "./client_navbar";
import cross from "../images/cross.svg";
import { useState } from "react";
import tick from "../images/tick.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

function BreathingExercise(props) {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [opt, setOpt] = useState([
    "Breathe in slowly",
    "Hold your breath",
    "Breathe out slowly",
  ]);

  const navigate = useNavigate();

  const location = useLocation();
  const { rounds } = location.state;

  const handleTick = async () => {
    navigate("/client/dailyActivities/");
    const res = await axios.post("http://localhost:4000/client/updateBreathingExercise", {
      email: localStorage.getItem("email"),
      breathingExercise: true,
    });
    if (res.status === 200) {
    }
    
  };

  if (!localStorage.getItem("token")){
    return (
      <div>
        <h1> Not Authorized</h1>
      </div>
    )
  }
  else{
  return (
    <div className="activity-bg">
      <svg>
        <defs>
          <linearGradient id="grad" x1="1" y1="0" x2="0" y2="0">
            <stop offset="5%" stopColor="#E975A8" />
            <stop offset="95%" stopColor="#726CF8" />
          </linearGradient>
        </defs>
      </svg>
      <NavbarClient />
      <h3 className="titlequestion">Breathing Exercise</h3>
      <a href="./">
        <img className="gobackcross" src={cross} />
      </a>
      <div class="fade-in-text" key={count}>
        <h1 className={`instr`}>{opt[count]}</h1>
      </div>
      <div id="timer">
        <CountdownCircleTimer
          colors="url(#grad)"
          isGrowing
          isPlaying
          duration={6}
          colorsTime={[6, 4, 2, 0]}
          onComplete={() => {
            setCount((count + 1) % opt.length);
            setTotalCount(totalCount + 1);
            if (totalCount + 1 === rounds) {
              setCount(0);
              setOpt(["All done!"]);
              return { shouldRepeat: false };
            } else {
              return { shouldRepeat: true };
            }
          }}
          size={350}
          strokeWidth={18}
        >
          {({ remainingTime }) => {
            if (opt.length !== 1) {
              return <div className="time">{remainingTime} sec</div>;
            } else {
              return <img id="tick" src={tick} onClick={() => handleTick()} />;
            }
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}
}

export default BreathingExercise;
