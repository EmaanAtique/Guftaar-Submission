import "./add_admin_form.css";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import "react-dropdown/style.css";
import { useNavigate } from "react-router-dom";
import cross from "../images/cross.svg";
import NavbarAdmin from "./navbar_admin";
import axios from "axios";


function AdminForm() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCPass] = useState("");

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState();

  const [valid, setValid] = useState(true);
  let check = false

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

  const addAdmin = async (e) => {
    const toSend = {
      firstName: fname,
      lastName: lname,
      age: age,
      gender: gender,
      password: pass,
      email: email,
    };

    // alert("before axios"); 
    axios.post("http://localhost:4000/admin/addAdmin", toSend)
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
        alert("Account Created!")
        // setMessage("Account Created!");
        // setType("success")
      }
    })
    .catch((err) => {
      // alert("idher2")
      alert(err);
    });
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    validate();
    if(check == false){
      // alert("all data valid"); 
      await addAdmin(e);
    } else {
      // alert("invalid data"); 
    }
  };

  function validate() {
    if (fname == "") {
      document.getElementById("fname").style.borderColor = "crimson";
      document.getElementById("fname").style.borderWidth = "2px";
      document.getElementById("fname").placeholder = "First name required";
      check = true
    } else {
      document.getElementById("fname").style.borderColor = "";
      document.getElementById("fname").style.borderWidth = "";
    }
    if (lname == "") {
      document.getElementById("lname").style.borderColor = "crimson";
      document.getElementById("lname").style.borderWidth = "2px";
      document.getElementById("lname").placeholder = "Last name required";
      check = true
    } else {
      document.getElementById("lname").style.borderColor = "";
      document.getElementById("lname").style.borderWidth = "";
    }
    
    if (!age) {
      document.getElementById("age").style.borderColor = "crimson";
      document.getElementById("age").style.borderWidth = "2px";
      document.getElementById("age").placeholder = "Age required";
      check = true
    } else if (age < 20) {
      document.getElementById("age").className = "error-control-r";
      document.getElementById("error-text-age").textContent ="An admin must be 20+.";
      document.getElementById("error-text-age").style.paddingBottom = "2%";
      document.getElementById("error-text-age").style.display = "block";
      check = true
    }
    else{
      document.getElementById("age").className = "input-field-add-2";
      document.getElementById("age").style.borderColor = "";
      document.getElementById("age").style.borderWidth = "";
      document.getElementById("error-text-age").style.display = "none";
    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passwordRegex = /^(?=.*\d).{8,}$/;
    
    if (email === "") {
      document.getElementById("email").style.borderColor = "crimson";
      document.getElementById("email").style.borderWidth = "2px";
      document.getElementById("email").placeholder = "Email required";
      check = true
    } else if (!email.match(mailformat)) {
      document.getElementById("email").style.borderColor = "crimson";
      document.getElementById("email").style.borderWidth = "2px";
      document.getElementById("error-text-email").textContent = "Invalid email";
      document.getElementById("error-text-email").style.paddingBottom = "2%";
      document.getElementById("error-text-email").style.display = "block";
      check = true
    } else {
      document.getElementById("email").style.borderColor = "";
      document.getElementById("email").style.borderWidth = "";
      document.getElementById("error-text-email").textContent = "";
      document.getElementById("error-text-email").style.paddingBottom = "";
      document.getElementById("error-text-email").style.display = "";
    }

    if (pass === "") {
      document.getElementById("password").style.borderColor = "crimson";
      document.getElementById("password").style.borderWidth = "2px";
      document.getElementById("password").placeholder = "Password required";
      check = true
    } else if (!passwordRegex.test(pass)) {
      document.getElementById("password").style.borderColor = "crimson";
      document.getElementById("password").style.borderWidth = "2px";
      document.getElementById("error-text-pass").textContent = "Password must be at least 8 characters long, with a number.";
      document.getElementById("error-text-pass").style.display = "block";
      check = true
    } else {
      document.getElementById("password").style.borderColor = "";
      document.getElementById("password").style.borderWidth = "";
      document.getElementById("error-text-pass").textContent = "";
    }

    if (cpass === "") {
      document.getElementById("cpassword").style.borderColor = "crimson";
      document.getElementById("cpassword").style.borderWidth = "2px";
      document.getElementById("cpassword").placeholder = "Password required";
      check = true
    } else if (cpass != pass) {
      document.getElementById("cpassword").style.borderColor = "crimson";
      document.getElementById("cpassword").style.borderWidth = "2px";
      document.getElementById("error-text-cpass").textContent ="Passwords do not match.";
      document.getElementById("error-text-cpass").style.display = "block";
      check = true
    } else {
      document.getElementById("cpassword").style.borderColor = "";
      document.getElementById("cpassword").style.borderWidth = "";
      document.getElementById("error-text-cpass").textContent = "";
      document.getElementById("error-text-cpass").style.display = "";
    }
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
    <div className="formbg-2">
      <NavbarAdmin />
      <a href="AddEmployee">
        <img className="gobackcross" src={cross} />
      </a>
      <div className="center-container-2">
     
        <div className="form-header-2">
          <h3 className="guftaar-name-2"> Guftaar</h3>
          <p className="create-2"> Add Admin</p>
          <p className="details-2"> Fill in the details below</p>
        </div>
        <div className="form-content-employee-2">
          <div className="form-row-1-2">
            <div className="input-row-1-2">
              <label for="fname" className="lf-2">
                First name
              </label>
              <input
                value={fname}
                className="input-field-add-2"
                onChange={(e) => setFname(e.target.value)}
                type="text"
                placeholder="Enter your name"
                id="fname"
                name="fname"
              ></input>
            </div>
            <div className="input-row-1-2">
              <label for="lname" className="lf-2">
                Last name
              </label>
              <input
                value={lname}
                className="input-field-add-2"
                onChange={(e) => setLname(e.target.value)}
                type="text"
                placeholder="Enter your surname"
                id="lname"
                name="lname"
              ></input>
            </div>
          </div>
          <div className="form-row-1-2">
            <div className="input-row-2-2">
              <label for="email" className="lf-2 lef-pad-2-2">
                Email
              </label>
              <input
                value={email}
                className="input-field-add-2"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                id="email"
                name="email"
              ></input>
              <span id={"error-text-email"} className={"et"}></span>
            </div>
            <div className="input-row-2-2">
              <label for="age" className="lf-2 lef-pad-2-2">
                Age
              </label>
              <input
                value={age}
                className="input-field-add-2"
                onChange={(e) => setAge(e.target.value)}
                type="number"
                placeholder="Enter your age"
                id="age"
                name="age"
              ></input>
              <span id={"error-text-age"} className={"et"}></span>
            </div>
          </div>
          <div className="form-row-1-2">
            <div className="input-row-2-2">
              <label for="password" className="lf-2 lef-pad-2-2">
                Enter your password
              </label>
              <input
                type="password"
                className="input-field-add-2"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Enter password"
                id="password"
                name="password"
              ></input>
              <span id={"error-text-pass"} className={"et"}></span>
            </div>
            <div className="input-row-2-2">
              <label for="cpassword" className="lf-2 lef-pad-2-2">
                Confirm your password
              </label>
              <input
                type="password"
                className="input-field-add-2"
                value={cpass}
                onChange={(e) => setCPass(e.target.value)}
                placeholder="Confirm password"
                id="cpassword"
                name="cpassword"
              ></input>
              <span id={"error-text-cpass"} className={"et"}></span>
            </div>
          </div>
          <div className="button-row-2">
            <button type="submit" className="buttonLL-2" onClick={handleAdminSubmit}>
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
}
export default AdminForm;
