import "./add_employee.css";
import cross from "../images/cross.svg";
import admin from "../images/adminadd.png";
import coach from "../images/coachadd.png";
import NavbarAdmin from "./navbar_admin";

function add_employee() {
  if (!localStorage.getItem("token")){
    return (
      <div>
        <h1> Not Authorized</h1>
      </div>
    )
  }
  else{
  return (
    <div className="employeeBack">
      <NavbarAdmin />
      <h3 className="titlequestion">Add Employee</h3>
      <a href="Dashboard">
        <img className="gobackcross" src={cross} />
      </a>
      <h1 className="whichquestion">
        Which employee type are you creating an account for?
      </h1>
      <div className="adminBack">
        <h3 className="categorya">Administrator</h3>
        <a href="addAdmin">
          {" "}
          <img className="adminpic" src={admin} />{" "}
        </a>
      </div>
      <div className="coachBack">
        <a href="addCoach">
          <img className="coachpic" src={coach} />{" "}
        </a>
        <h3 className="categoryc">Coach</h3>
      </div>
    </div>
  );
}
}
export default add_employee;
