import Si from "../images/change_pw.svg"
import './update_pw.css'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const bcrypt = require("bcryptjs");

function ChangePassword(){
    const navigate = useNavigate();
    const [current, setCurrent] = useState("");
    const [fromDB, setDB] = useState("");
    const [changed, setChanged] = useState("");
    const [changed1, setChanged1] = useState("");
    const [salted, setSalted] = useState("");


    const hashIt = (password, salt) => {
        const hashed = bcrypt.hashSync(password, salt);
        return hashed;
    }

    async function hashIt1(password) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        return [hashed, salt];
    }

    var passwordRegex = /^(?=.*\d).{8,}$/;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (changed === ""){
            document.getElementsByClassName('input-field-c')[0].style.borderColor = "crimson";
            document.getElementsByClassName('input-field-c')[0].style.borderWidth = "2px";
            document.getElementsByClassName('input-field-c')[0].placeholder = "Password required";
        }
        else if (!passwordRegex.test(changed)){
            document.getElementsByClassName('input-field-c')[0].style.borderColor = "crimson";
            document.getElementsByClassName('input-field-c')[0].style.borderWidth = "2px";

            document.getElementById('changed').textContent = "Password must have 8+ characters, with a number.";
            document.getElementById('changed').style.color = "crimson";
            document.getElementById('changed').style.display = "block"
            document.getElementById('changed').style.paddingBottom = "4%"
        }
        if (changed1 === ""){
            document.getElementsByClassName('input-field-c')[1].style.borderColor = "crimson";
            document.getElementsByClassName('input-field-c')[1].placeholder = "Password required";
            document.getElementsByClassName('input-field-c')[1].style.borderWidth = "2px";
        }
        else if (changed1 !== changed){
            document.getElementsByClassName('input-field-c')[1].style.borderColor = "crimson";
            document.getElementsByClassName('input-field-c')[1].style.borderWidth = "2px";

            document.getElementById('changed1').textContent = "Both passwords do not match.";
            document.getElementById('changed1').style.color = "crimson"
        }
        axios.post("http://localhost:4000/client/getPass", {id: localStorage.getItem("id")}).then((response) => {
            console.log(response.data);
            setDB(response.data[0].password);
            setSalted(response.data[0].salt);
        }).catch((err) => {
            console.log(err);
        });

        let x = "";
        try {
            x = hashIt(current, salted);
        } catch (error) {
            console.log(error);
        }

        if (fromDB !== x) {
            console.log("idhr masla");
            window.location.reload();
        } else {
            console.log("here")
            hashIt1(changed).then((val1) => {
                console.log(val1);
                const newObj = {
                    "new": val1[0],
                    "salted": val1[1],
                    "id": localStorage.getItem("id")
                }
                axios.post("http://localhost:4000/client/changePassword", newObj).then((response) => {
                    if (response.data.error) {
                        console.log(response.data.error);
                    } else {
                        console.log("password changed");
                        // navigate("/client/dashboard");
                    }
                }).catch((err) => {
                    console.log(err);
                })
            })
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
        <div className="upper"> 
        <div id="center-div">
            <div class="img-container"> 
                <img src={Si} class="change-pw-image"/>
            </div>
            <div className="form-container">
                <h1 id="form-heading">Update Password</h1>
                <form>
                    <label>Old Password</label>
                    <input placeholder="Enter old password" className="input-field-c" onChange={(e)=> setCurrent(e.target.value)} type="password"></input>
                    <label> New Password</label>
                    <input placeholder="Enter new password" className="input-field-c" onChange={(e)=> setChanged(e.target.value)} type="password"></input>
                    <span id="changed" style={{paddingBottom:"10px"}}></span>
                    <label className="try"> Confirm New Password</label>
                    <input placeholder="Re-enter password" className="input-field-c" onChange={(e)=> setChanged1(e.target.value)} type="password"></input>
                    <span id="changed1"></span>
                    <div className="btn-container">
                        <button type="submit" className="btn" onClick={handleSubmit}>Confirm</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}
}

export default ChangePassword; 
