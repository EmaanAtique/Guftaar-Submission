import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./breathing.css";
import NavbarClient from "./client_navbar";
import cross from "../images/cross.svg";
import { useState } from "react";
import tick from "../images/tick.png";
import { useNavigate } from "react-router-dom";
import SetBreathingTime from "./set_breathing_time";
import clench from "../images/clench.png";
import relax from "../images/relax.png";
import axios from "axios";

function LinkLator(props) {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [opt, setOpt] = useState([
    "Clench your cheek and jaw muscles",
    "Relax your cheek and jaw muscles",
  ]);
  const [remainingTime, setRemainingTime] = useState();

  const navigate = useNavigate();

  const secs = () => {
    if (opt.length !== 1) {
      return <h1> {remainingTime} seconds </h1>;
    } else {
      return null;
    }
  };

  const handleTick = () => {
    navigate("../");
    const toSend = { email: localStorage.getItem("email"), linkLater: true };
    axios
      .post("http://localhost:4000/client/updateLinkLater", toSend)
      .then((res) => {
        if (res.data.status === 200) {
          console.log("Updated Link Later");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
      <h3 className="titleL">Linklator Voice Progression</h3>
      <a href="./">
        <img className="gobackcross" src={cross} />
      </a>
      <div class="fade-in-text" key={count}>
        <h1 className={`instr`}>{opt[count]}</h1>
      </div>
      <div id="timer">
        <CountdownCircleTimer
          colors="url(#grad)"
          isPlaying
          isGrowing
          isReverse
          duration={7}
          colorsTime={[7, 5, 3, 0]}
          onComplete={() => {
            setCount((count + 1) % opt.length);
            setTotalCount(totalCount + 1);
            if (totalCount + 1 === 6) {
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
            setRemainingTime(remainingTime);
            if (opt.length !== 1) {
              if (totalCount % 2 == 0) {
                return (
                  <div id="expression">
                    <img id="expr" src={clench}></img>
                  </div>
                );
              } else {
                return (
                  <div id="expression">
                    <img id="expr" src={relax}></img>
                  </div>
                );
              }
            } else {
              return <img id="tick" src={tick} onClick={() => handleTick()} />;
            }
          }}
        </CountdownCircleTimer>
      </div>
      {opt.length !== 1 && <h1 id="timeleft"> {remainingTime} seconds </h1>}
    </div>
  );
}
}

export default LinkLator;
