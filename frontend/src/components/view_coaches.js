import React, { useEffect, useState } from "react";
import axios from "axios";
import icon from "../images/profileicon.png";
import "./view_coaches.css";
import NavbarClient from "./client_navbar";
import { useNavigate } from "react-router-dom";

const ViewCoaches = () => {
  const [coachData, setCoachData] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async function () {
      let result = await axios.get("http://localhost:4000/client/coaches");
      setCoachData(Object.values(result.data));
    };
    fetchData();
  }, []);

  console.log(coachData);

  const handleReview = () => {
    navigate("../addFeedback")
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
    
    <div className="main-container-view-coaches">
      <div>
        <h1 className="view-coaches-heading">Guftaar Coaches</h1>
      </div>
      <div className="container-view-coaches">
        <NavbarClient />
        {coachData.map((elem) => {
          return (
            <div className="coach-card-view-coaches">
              <div className="card-container-view-coaches">
                <div className="img-container-view-coaches">
                  <img src={icon} className="img-view-coaches"/>
                </div>
                <div className="content-container-view-coaches">
                  <div className="coach-card-name-view-coaches">
                    {`${elem.firstName} ` }
                    <div className="coach-email-view-coaches">{elem.email}</div>
                  </div>
                  <div className="highlight-div-details">
                    <div className="highlighted-flex-wrapper">
                      <span className="highlighted-div-content">
                        Qualification
                      </span>
                      <span className="highlighted-div-content">
                        Experience
                      </span>
                      <span className="highlighted-div-content">Rating</span>
                    </div>
                    <div className="highlighted-flex-wrapper">
                      <span className="highlighted-div-content-2">{elem.qualification}</span>
                      <span className="highlighted-div-content-2">{elem.yearsOfExperience}</span>
                      <span className="highlighted-div-content-2">{elem.rating}</span>
                    </div>
                  </div>
                  <div className="coach-card-btns">
                    {/* <button className="coach-card-btn1">
                      Schedule a Meeting
                    </button> */}
                    <button className="coach-card-btn1" onClick={handleReview}>Leave Review</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
}

export default ViewCoaches;
