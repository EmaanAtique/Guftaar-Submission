import { useState } from "react";
import "./form_content.css";
import reg from "../images/register.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert";

function Register(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState();
  let please = false;
  let [someError, setErr] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passwordRegex = /^(?=.*\d).{8,}$/;
    if (email === "") {
      document.getElementById("email").style.borderColor = "crimson";
      document.getElementById("email").style.borderWidth = "2px";
      document.getElementById("email").placeholder = "Email required";
      // setErr(true)
      please = true;
    } else if (!email.match(mailformat)) {
      document.getElementById("email").style.borderColor = "crimson";
      document.getElementById("email").style.borderWidth = "2px";
      document.getElementById("error-text-email").textContent = "Invalid email";
      document.getElementById("error-text-email").style.paddingBottom = "2%";
      document.getElementById("error-text-email").style.display = "block";
      // setErr(true)
      please = true;
    }
    if (pass === "") {
      document.getElementById("password").style.borderColor = "crimson";
      document.getElementById("password").style.borderWidth = "2px";
      document.getElementById("password").placeholder = "Password required";
      // setErr(true)
      please = true;
    } else if (!passwordRegex.test(pass)) {
      document.getElementById("password").style.borderColor = "crimson";
      document.getElementById("password").style.borderWidth = "2px";
      document.getElementById("error-text-pass").textContent =
        "Password must be at least 8 characters long, with a number.";
      document.getElementById("error-text-pass").style.display = "block";
      // setErr(true)
      please = true;
    }
    if (fname === "") {
      document.getElementById("fname").style.borderColor = "crimson";
      document.getElementById("fname").style.borderWidth = "2px";
      document.getElementById("fname").placeholder = "First name required";
      // setErr(true)
      please = true;
    }
    if (lname === "") {
      document.getElementById("lname").style.borderColor = "crimson";
      document.getElementById("lname").style.borderWidth = "2px";
      document.getElementById("lname").placeholder = "Last name required";
      // setErr(true)
      please = true;
    }
    if (!age) {
      document.getElementById("age").style.borderColor = "crimson";
      document.getElementById("age").style.borderWidth = "2px";
      document.getElementById("age").placeholder = "Age required";
      // setErr(true)
      please = true;
    } else if (age < 13) {
      document.getElementById("age").className = "error-control-r";
      document.getElementById("error-text-age").textContent =
        "To use Guftaar, you must be 13+.";
      document.getElementById("error-text-age").style.paddingBottom = "2%";
      document.getElementById("error-text-age").style.display = "block";
      // setErr(true)
      please = true;
    }

    if (please === false) {
      const newUser = {
        firstName: fname,
        lastName: lname,
        age: age,
        email: email,
        password: pass,
      };

      axios
        .post("http://localhost:4000/client/register", newUser, {
          headers: { "Content-Type": "application/json; charset=UTF-8" },
        })
        .then((response) => {
          if (
            response.data == "We already have an account made with this email"
          ) {
            document.getElementById("email").style.borderColor = "crimson";
            document.getElementById("email").style.borderWidth = "2px";
            document.getElementById("error-text-email").textContent =
              "Email already in use";
            document.getElementById("error-text-email").style.paddingBottom =
              "2%";
            document.getElementById("error-text-email").style.display = "block";

            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            setMessage("Account Created!");
            setType("success")
            setTimeout(() => {
              navigate("/client/login");
            }, 1000);
          }
        })
        .catch((err) => {
          window.location.reload();
        });
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  const navigate = useNavigate();
  function Toggle() {
    navigate("/client/login");
  }

  return (
    <>
    {type === "success" ? <Alert type={type} message={message} /> : null}{" "}
    <div className="client-bg">
      <div className="main-container">
        <div className="img-container">
          <h1 className="welcome-heading">Welcome to Guftaar</h1>
          <img src={reg} className="reg-img" />
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <label for="fname">First name</label>
            <input
              value={fname}
              className="input-field"
              onChange={(e) => setFname(e.target.value)}
              type="text"
              placeholder="Enter your name"
              id="fname"
              name="fname"
            ></input>
            <label for="lname">Last name</label>
            <input
              value={lname}
              className="input-field"
              onChange={(e) => setLname(e.target.value)}
              type="text"
              placeholder="Enter your surname"
              id="lname"
              name="lname"
            ></input>
            <label for="age">Age</label>
            <input
              value={age}
              className="input-field"
              onChange={(e) => setAge(e.target.value)}
              type="number"
              placeholder="Enter your age"
              id="age"
              name="age"
            ></input>
            <span id={"error-text-age"} className={"et"}></span>
            <label for="email">Enter your email</label>

            <input
              value={email}
              className="input-field"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              id="email"
              name="email"
            ></input>
            <span id={"error-text-email"} className={"et"}></span>
            <label for="password">Enter your password</label>

            <input
              type="password"
              className="input-field"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter password"
              id="password"
              name="password"
            ></input>
            <span id={"error-text-pass"} className={"et"}></span>
            <button type="submit" className="buttonL">
              Register
            </button>
            <button className="form-button" onClick={Toggle}>
              {" "}
              Already have an account? Login here{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default Register;
