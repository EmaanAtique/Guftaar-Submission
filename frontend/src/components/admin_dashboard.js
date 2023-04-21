import React from 'react';
import si from "../images/staricon.png"
import ei from "../images/editicon.png"
import "./admin_dashboard.css"
import addEmployee from './add_employee';
import NavbarAdmin from './navbar_admin';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  
  const [adminCount, setAdminCount] = useState(0);
  const [coachCount, setCoachCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [topCoaches, setTopCoaches] = useState([]);
  const [display, setdisplay] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchInfo = async function () {
      const actorCount = await axios.get(
        "http://localhost:4000/admin/getActorCount"
      );
      setAdminCount(actorCount.data.Admin);
      setCoachCount(actorCount.data.Coach);
      setClientCount(actorCount.data.Clients);
    };
    fetchInfo();
  }, []);

  useEffect(() => {
    const fetchInfo = async function () {
      const starCoaches = await axios.get(
        "http://localhost:4000/admin/getTopCoaches"
      );
      setTopCoaches (Object.values((starCoaches.data)))
      setdisplay(true)
      // alert(topCoaches.firstName)
    };
    fetchInfo();
  }, []);

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
      <div className="dashboard-container">
       <NavbarAdmin />
      <div className="coachbox">
        <h2>{coachCount}</h2>
        <p>coaches</p>
      </div>
      <div className="adminbox">
        <h2>{adminCount}</h2>
        <p>admins</p>
      </div>
      <div className="userbox">
        <h2>{clientCount}</h2>
        <p>users</p>
      </div>
      <div className="empbox">
        <h2>add employee</h2>
        <a href='addEmployee'><button class="circlebutton">
          <span class="plusicon">+</span>
        </button></a>
      </div>
      <div className="heading">
        <h1>Administrator Centre</h1>
      </div>
    <div className="dashboard-container">
      {/* ... */}
      <div className="reviewbox">
        <h1>Top Coaches</h1>
        <ul className="names">
          {display && topCoaches.map((coach) => (
            <li key={coach._id}>{coach.firstName} {coach.lastName}</li>
          ))}
        </ul>

        {display && topCoaches.map((coach, index) => (
          <div className={`row${index+1}`} key={coach._id}>
            <h3 className={`icon${index+1}text`}>{coach.rating}</h3>
            <img src={si} alt="StarIcon" className={`staricon${index+1}`}></img>
            <button type="button" className="editbutton" onClick={() => handleEditRating(coach._id)}>
              <img src={ei} alt="EditIcon" className={`editicon${index+1}`} />
            </button>
          </div>
        ))}

      </div>
        <p className='ratingtext'> rating</p>
        <p className='edittext'> edit</p>
        <button class="viewbutton" onClick={() => {navigate('/admin/readReviews')}}>view all</button>
    </div>
    </div>
  )}
        }
export default Dashboard;
