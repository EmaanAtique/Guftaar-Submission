import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../components/courses.css"
import {Container, Row, Col, Nav, Tab, TabContainer} from "react-bootstrap";
import bg from "../images/2.png"
import bg2 from "../images/3.png"
import bg3 from "../images/soc.png"
import bg4 from "../images/voice.png"
import bg5 from "../images/non.png"
import bg6 from "../images/art.png"




import NavbarClient from "./client_navbar";

const Courses = () => {
    const courses = [
        {
            title: "Overcoming Public Speaking Anxiety",
            description: "coming soon",
            imgUrl: bg,
        },
        {
            title: "Stammer and Social Settings",
            description: "pre register at the Guftaar office",
            imgUrl: bg3,
        },
        {
            title: "Find Your Voice",
            description: "coming soon",
            imgUrl: bg4,
        },
        {
            title: "Non-Verbal Communication",
            description: "coming soon",
            imgUrl: bg5,
        } ,
        {
            title: "Unlocking Fluency",
            description: "coming soon",
            imgUrl: bg2,
        } ,
        {
            title: "Language and Literacy",
            description: "coming soon",
            imgUrl: bg6,
        } 
    ]
    if (!localStorage.getItem("token")){
        return (
          <div>
            <h1> Not Authorized</h1>
          </div>
        )
      }
      else{
    return(
        <div className="course-bg">
            <NavbarClient/>
            <section id="sect">
                <div className="container-courses">
                <h1 id="head"> Guftaar Courses</h1>
                <div className="course-cards">
                    {
                        courses.map((course, index) => {
                            return(
                                
                                <div key={index} className="card">
                                    <img id="course-img" src={course.imgUrl} ></img>
                                    <h3 id="nameH"> {course.title} </h3>
                                    <p> {course.description} </p>
                                </div>
                            )
                        })
                    }
                    </div>
                    </div>
            </section>
            </div>

   
    )
}
}

export default Courses;