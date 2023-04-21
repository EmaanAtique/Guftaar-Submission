import React, { useEffect, useState } from 'react'
import './coach_feedback.css'
import rev_img from '../images/review_feedback.svg'
import axios from 'axios'
import { Dropdown } from "primereact/dropdown";
import NavbarClient from './client_navbar';


const CoachFeedback = () => {
  const [coachData, setCoachData] = useState([]); 
  const [coachSelected, setCoach] = useState(''); 
  const [coachEmail, setCoachEmail] = useState(''); 
  const [feedback, setFeedback] = useState(''); 

  useEffect(() => {
    const fetchData = async function () {
      let result = await axios.get("http://localhost:4000/client/coaches");
      setCoachData(Object.values(result.data))
    };
    fetchData();
  }, []);

  const coachNames = []; 
  const coachMails = []; 
  coachData.map((elem) => {
    coachNames.push(`${elem.firstName} ${elem.lastName}`); 
    coachMails.push(`${elem.email}`);

  })

  const handleFeedback = async (e) => {
    e.preventDefault(); 
    // alert("before axios")
    const toSend = {
      email: coachEmail, 
      feedback: feedback
    }; 

    axios
      .post("http://localhost:4000/client/addFeedback", toSend)
      .then((response) => {
        if (response.data.status === "success") {
          // alert("Success!"); 
        } else {
          // alert("Failed"); 
        }
      })
      .catch((err) => {
        // alert("idher2")
        // alert(err);
      });

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
    <div className='main-container-coach-feedback'>
        <NavbarClient />
        <div className='feedback-form-coach'>
            <div className="img-container-feedback">
              <h1 className='course-feedback-heading'> Coach Feedback</h1>
              <img src={rev_img} className='review-image'/>
            </div>
            <div className='feedback-form-content'>
              {/* <label>Select a Coach</label>
              <Dropdown
                className='feedback-dropdown'
                options={coachNames}
                onChange={(e) => {
                  setCoach(e.value);
                }}
              ></Dropdown> */}

              <label className='label-coach-feedback'>Select Coach Email</label>
              <Dropdown
                value={coachEmail}
                className='feedback-dropdown'
                options={coachMails}
                onChange={(e) => {
                  setCoachEmail(e.value);
                }}
              ></Dropdown>
              <label>Enter Review</label>
              <textarea className='text-area-feedback' placeholder='Leave a review' onChange={(e) => setFeedback(e.target.value)}></textarea>
              <button className='btn-coach-feedback' onClick={handleFeedback}>Submit</button>
            </div>
        </div>
    </div>
  )
}
}

export default CoachFeedback