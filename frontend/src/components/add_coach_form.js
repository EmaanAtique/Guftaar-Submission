import "./add_coach_form.css";
import { useState } from "react";
// import Dropdown from 'react-dropdown';
import { Dropdown } from "primereact/dropdown";
import "react-dropdown/style.css";
import { useNavigate } from "react-router-dom";
import cross from "../images/cross.svg";
import NavbarAdmin from "./navbar_admin";
import axios from 'axios'; 
import Alert from "./Alert";


function CoachForm() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCPass] = useState("");

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState();
  const [qual, setQual] = useState("");
  const [exp, setExp] = useState();
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [err, seterr] = useState(true)
  let please = false;

  const navigate = useNavigate();

  function shift() {
    navigate("/admin/addEmployee");
  }

  const options = ["Male", "Female", "Other"];
  const options2 = [
    "No experience",
    "1 year",
    "2 years",
    "3 years",
    "4 years",
    "5+ years",
  ];

  const addCoach = async (e) => {
    e.preventDefault();
    const toSend = {
      firstName: fname,
      lastName: lname,
      age: age,
      gender: gender,
      qualification: qual,
      yearsOfExperience: exp,
      email: email,
      password: pass,
    };

    axios
      .post("http://localhost:4000/admin/addCoach", toSend)
      .then((response) => {
        // alert(response.data.message)
        // alert(response.status)
        if (
          response.data.message == "email in use"
        ) {
          document.getElementById("email").style.borderColor = "crimson";
          document.getElementById("email").style.borderWidth = "2px";
          document.getElementById("error-text-email").textContent =
            "Email already in use";
          document.getElementById("error-text-email").style.paddingBottom =
            "2%";
          document.getElementById("error-text-email").style.display = "block";
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1500);
        }
        else{
          alert("Created")
          // setMessage("Account Created!");
          // setType("success")
        }
      })
      .catch((err) => {
        // alert("idher2")
        alert(err);
      });
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    validate();
    // alert("clicked!");
    // alert(please)
    if (please == false){
      await addCoach(e);
    }else{
      // alert("data not valid")
    }
  };

  function validate() {
    if (fname == "") {
      document.getElementById("fname").style.borderColor = "crimson";
      document.getElementById("fname").style.borderWidth = "2px";
      document.getElementById("fname").placeholder = "First name required";
      seterr(false)
      please = true;
    } else {
      document.getElementById("fname").style.borderColor = "";
      document.getElementById("fname").style.borderWidth = "";
    }

    // alert("name validated"); 
    if (lname == "") {
      document.getElementById("lname").style.borderColor = "crimson";
      document.getElementById("lname").style.borderWidth = "2px";
      document.getElementById("lname").placeholder = "Last name required";
      seterr(false)
      please = true;
    } else {
      document.getElementById("lname").style.borderColor = "";
      document.getElementById("lname").style.borderWidth = "";
    }

    // alert("last name validated"); 
    if (!gender) {
      document.getElementById("error-text-gen").textContent = "Gender required";
      document.getElementById("error-text-gen").style.textDecorationColor =
        "crimson";
        seterr(false)
        please = true;
    } else {
      document.getElementById("error-text-gen").textContent = "";
      document.getElementById("error-text-gen").style.textDecorationColor = "";
    }

    // alert("gender validated"); 
    if (!age) {
      document.getElementById("age").style.borderColor = "crimson";
      document.getElementById("age").style.borderWidth = "2px";
      document.getElementById("age").placeholder = "Age required";
      seterr(false)
      please = true;
    } else if (age < 20) {
      document.getElementById("age").className = "error-control-r";
      document.getElementById("error-text-age").textContent =
        "A coach must be 20+.";
      document.getElementById("error-text-age").style.paddingBottom = "2%";
      document.getElementById("error-text-age").style.display = "block";
      seterr(false)
      please = true;
    }

    // alert("age validated"); 
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passwordRegex = /^(?=.*\d).{8,}$/;

    if (email === "") {
      document.getElementById("email").style.borderColor = "crimson";
      document.getElementById("email").style.borderWidth = "2px";
      document.getElementById("email").placeholder = "Email required";
      seterr(false)
      please = true;
    } else if (!email.match(mailformat)) {
      document.getElementById("email").style.borderColor = "crimson";
      document.getElementById("email").style.borderWidth = "2px";
      document.getElementById("error-text-email").textContent = "Invalid email";
      document.getElementById("error-text-email").style.paddingBottom = "2%";
      document.getElementById("error-text-email").style.display = "block";
      seterr(false)
      please = true;
    } else {
      document.getElementById("email").style.borderColor = "";
      document.getElementById("email").style.borderWidth = "";
      document.getElementById("error-text-email").textContent = "";
      document.getElementById("error-text-email").style.paddingBottom = "";
      document.getElementById("error-text-email").style.display = "";
    }
    // alert("email validated"); 

    if (pass === "") {
      document.getElementById("password").style.borderColor = "crimson";
      document.getElementById("password").style.borderWidth = "2px";
      document.getElementById("password").placeholder = "Password required";
      seterr(false)
      please = true;
    } else if (!passwordRegex.test(pass)) {
      document.getElementById("password").style.borderColor = "crimson";
      document.getElementById("password").style.borderWidth = "2px";
      document.getElementById("error-text-pass").textContent =
        "Password must be at least 8 characters long, with a number.";
      document.getElementById("error-text-pass").style.display = "block";
      seterr(false)
      please = true;
    } else {
      document.getElementById("password").style.borderColor = "";
      document.getElementById("password").style.borderWidth = "";
      document.getElementById("error-text-pass").textContent = "";
    }

    // alert("password valdiated"); 

    if (qual == "") {
      document.getElementById("qual").style.borderColor = "crimson";
      document.getElementById("qual").style.borderWidth = "2px";
      document.getElementById("qual").placeholder = "Qualification required";
      seterr(false)
      please = true;
    } else {
      document.getElementById("qual").style.borderColor = "";
      document.getElementById("qual").style.borderWidth = "";
    }

    // alert("qualification validated"); 

    if (!exp) {
      document.getElementById("exp").placeholder = "Experience required";
      document.getElementById("exp").style.borderColor = "crimson";
      document.getElementById("exp").style.borderWidth = "2px";
      seterr(false)
        please = true;
    } else {
      // document.getElementById("error-text-exp").textContent = "";
      // document.getElementById("error-text-exp").style.textDecorationColor = "";
    }

    // alert("experience validated"); 

    if (cpass === "") {
      document.getElementById("cpassword").style.borderColor = "crimson";
      document.getElementById("cpassword").style.borderWidth = "2px";
      document.getElementById("cpassword").placeholder = "Password required";
      seterr(false)
      please = true;
    } else if (cpass != pass) {
      document.getElementById("cpassword").style.borderColor = "crimson";
      document.getElementById("cpassword").style.borderWidth = "2px";
      document.getElementById("error-text-cpass").textContent =
        "Passwords do not match.";
      document.getElementById("error-text-cpass").style.display = "block";
      seterr(false)
      please = true;
    } else {
      document.getElementById("cpassword").style.borderColor = "";
      document.getElementById("cpassword").style.borderWidth = "";
      document.getElementById("error-text-cpass").textContent = "";
      document.getElementById("error-text-cpass").style.display = "";
    }
    // alert("cpass validated"); 
  }
  if (!localStorage.getItem("token")){
    return (
      <div>
        <h1> Not Authorized</h1>
      </div>
    )
  }
  else{
  return (
    <>
    {/* {type === "success" ? <Alert type={type} message={message} /> : null}{" "} */}
    <div className="formbg">
      <NavbarAdmin />
      <a href="AddEmployee">
        <img className="gobackcross" src={cross} />
      </a>
      <div className="center-container">
        {/* <div className="ftext"> */}
        <div className="form-header">
          <h3 className="guftaar-name"> Guftaar</h3>
          <p className="create"> Add Coach</p>
          <p className="details"> Fill in the details below</p>
        </div>
        <div className="form-content-employee">
          <div className="form-row-1">
            <div className="input-row-1">
              <label for="fname" className="lf">
                First name
              </label>
              <input
                value={fname}
                className="input-field-add"
                onChange={(e) => setFname(e.target.value)}
                type="text"
                placeholder="Enter your name"
                id="fname"
                name="fname"
              ></input>
            </div>
            <div className="input-row-1">
              <label for="lname" className="lf">
                Last name
              </label>
              <input
                value={lname}
                className="input-field-add"
                onChange={(e) => setLname(e.target.value)}
                type="text"
                placeholder="Enter your surname"
                id="lname"
                name="lname"
              ></input>
            </div>
            <div className="input-row-1">
              <label for="gender" className="lf lf-pad">
                Gender
              </label>
              <Dropdown
                className="gen"
                options={options}
                onChange={(e) => {
                  setGender(e.value);
                }}
                value={gender}
                id="gender"
                name="gender"
              ></Dropdown>
              <span id={"error-text-gen"} className={"et"}></span>
            </div>
          </div>
          <div className="form-row-1">
            <div className="input-row-2">
              <label for="email" className="lf lef-pad-2">
                Email
              </label>
              <input
                value={email}
                className="input-field-add"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                id="email"
                name="email"
              ></input>
              <span id={"error-text-email"} className={"et"}></span>
            </div>
            <div className="input-row-2">
              <label for="age" className="lf lef-pad-2">
                Age
              </label>
              <input
                value={age}
                className="input-field-add"
                onChange={(e) => setAge(e.target.value)}
                type="number"
                placeholder="Enter your age"
                id="age"
                name="age"
              ></input>
              <span id={"error-text-age"} className={"et"}></span>
            </div>
          </div>
          <div className="form-row-1">
            <div className="input-row-2">
              <label for="qual" className="lf lef-pad-2">
                Qualification
              </label>
              <input
                value={qual}
                className="input-field-add"
                onChange={(e) => setQual(e.target.value)}
                type="text"
                placeholder="Enter your qualification"
                id="qual"
                name="qual"
              ></input>
            </div>
            <div className="input-row-2">
              <label for="exp" className="lf lef-pad-2">
                Past Experience
              </label>

              {/* NEEDS TO BE CHANGED */}
              <input
                value={exp}
                className="input-field-add"
                onChange={(e) => setExp(e.target.value)}
                type="text"
                placeholder="Enter your years of experience"
                id="exp"
                name="exp"
              ></input>
              {/* <span id={"error-text-exp"} className={"et"}></span> */}
            </div>
          </div>
          <div className="form-row-1">
            <div className="input-row-2">
              <label for="password" className="lf lef-pad-2">
                Enter your password
              </label>
              <input
                type="password"
                className="input-field-add"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Enter password"
                id="password"
                name="password"
              ></input>
              <span id={"error-text-pass"} className={"et"}></span>
            </div>
            <div className="input-row-2">
              <label for="cpassword" className="lf lef-pad-2">
                Confirm your password
              </label>
              <input
                type="password"
                className="input-field-add"
                value={cpass}
                onChange={(e) => setCPass(e.target.value)}
                placeholder="Confirm password"
                id="cpassword"
                name="cpassword"
              ></input>
              <span id={"error-text-cpass"} className={"et"}></span>
            </div>
          </div>
          <div className="button-row">
            <button type="submit" className="buttonLL" onClick={handleSubmit2} id ="but">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
}

export default CoachForm;
