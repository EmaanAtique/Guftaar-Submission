import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./single_coach_feedback.css";
import axios from "axios";
import NavbarAdmin from "./navbar_admin";

const SingleCoachFeedback = () => {
  const location = useLocation();
  const coachMail = location.state?.mail;
  const [coachData, setCoachData] = useState([]);
  
  useEffect(() => {
    const fetchData = async function () {
      let result = await axios.get("http://localhost:4000/admin/feedback");
      setCoachData(Object.values(result.data))
    };
    fetchData();
  }, []);
  
  const all_reviews = []; 
  coachData.map((elem) => {
    if(elem.coachEmail === coachMail){
      all_reviews.push(elem.feedback)
    }
  }) 

  console.log(coachData);
  console.log(all_reviews); 
  if (!localStorage.getItem("token")){
    return (
      <div>
        <h1> Not Authorized</h1>
      </div>
    )
  }
  else{
  return (
    <div className="main-container-review-cards">
      <NavbarAdmin />
      <div className="heading-admin-review">
        <h1>Coach Reviews</h1>
      </div>
      <div className="review-cards-container">

          {all_reviews.map((elem) => {
            return(
              <div className="main-review-card">
                <div className="main-review-card-header">
                  <div>Review</div>
                </div>
                <div className="main-review-card-content">
                  <div>{elem}</div>
                </div>
              </div>
            ); 
          })}

      </div>
    </div>
  );
};
}

export default SingleCoachFeedback;
