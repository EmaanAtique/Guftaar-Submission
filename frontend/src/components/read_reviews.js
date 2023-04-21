import React, { useEffect, useState } from "react";
import axios from "axios";
import icon from "../images/profileicon.png";
import "./view_coaches.css";
import NavbarAdmin from "./navbar_admin";
import { useNavigate } from "react-router-dom";

const ReadReviews = () => {
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

  const handleReview = (email) => {
    // alert(email); 
    navigate("../readReviewCoach", {state:{mail: email}});
  }
  
  const handleEditRating = async function (coachIndex) {
    let newRating = prompt('Enter new rating for coach:');
    if (newRating < 0 || newRating > 5){
      alert("Rating must be between 0 and 5")
      newRating = prompt('Enter new rating for coach:');
    }
    if (newRating !== null) {
      const response = await axios.post("http://localhost:4000/admin/updateRating", {rating:newRating, id: coachIndex});
      window.location.reload();
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

    
    <div className="main-container-view-coaches">
      <div>
        <h1 className="view-coaches-heading">Guftaar Coaches</h1>
      </div>
      <div className="container-view-coaches">
        <NavbarAdmin />
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
                    <button className="coach-card-btn1" onClick={() => handleEditRating(elem._id)}>Set Rating</button>
                    <button className="coach-card-btn1" onClick={() => handleReview(`${elem.email}`)}>Read Reviews</button>
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

export default ReadReviews;
