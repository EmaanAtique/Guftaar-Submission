import { useState, useEffect } from "react";
import "./syllable.css"
import NavbarClient from "./client_navbar";
import cross from "../images/cross.svg";
import ProgressBar from "@ramonak/react-progress-bar";
import Questions from "./questions";
import { useNavigate } from "react-router-dom";

const SyllableCounting = () => {
    const [quesInd, setQuesInd] = useState(0);
    const [markedAns, setMarkedAns] = useState(new Array(3));
    const [rand, setRand] = useState(false);
  
    const pool = ["BICYCLE", "ELEPHANT", "COMPUTER", "EDUCATION", "HELICOPTER", "TELEPHONE", "CHOCOLATE", "CAMERA", "AQUARIUM", "TELESCOPE"];
    const poolOpts = [["Three", "Two", "One"],["Two", "Three", "One"], ["One", "Two", "Three"], ["Four", "Three", "Two"], ["Four", "Two", "One"], ["Three", "One", "Four"], ["Two", "One", "Three"], ["One", "Three", "Two"], ["One", "Four", "Two"], ["One", "Three", "Four"]];
    const poolAns = ["Three", "Three", "Three", "Four", "Four", "Four", "Three", "Three", "Four", "Four"];
  
    const [words, setWords] = useState([]);
    const [quesList, setQuesList] = useState([]);
    const [ansList, setAnsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    const [render, setRender] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        function randomize(){
          let arr = [];
          for (let i = 0; i < 3; i++) {
            arr.push(Math.floor(Math.random() * 10));
          }
          for (let j = 0; j < 3; j++){
            if (words.length < 3){
              setWords(words => [...words, pool[arr[j]]]);
              setQuesList(quesList => [...quesList, poolOpts[arr[j]]]);
              setAnsList(ansList => [...ansList, poolAns[arr[j]]]);
            }
          }
          setIsLoading(false);
          setRand(true);
        }
        randomize();
      }, []);

      function handleChange(){
        console.log("clicked")
        setQuesInd(quesInd+1);
        if (quesInd === 2){
          navigate('../syllableCountingResult' , {state: {markedAns: markedAns}});
        }
      }
    
      function renderF(){
        if (quesInd < 2){
          var el = document.getElementById("quizBox").className = 'anim';
          setTimeout(() => {
            document.getElementById("quizBox").className = '';
          }, 500)
          void el.offsetWidth;
        }
      }
      if (isLoading){
        
        return (
          <div>
            <h1>Loading...</h1>
          </div>
        );
      }

    else{
    return (
        <div className="activity-bg"> 
        <NavbarClient/>
        <div className="topbar">
        <div className="status"> {quesInd+1} of 3</div>
        <h3 className="titleL">Syllable Counting Activity</h3>
        <a href="./">
          <img className="gobackcross" src={cross} />
        </a>
        </div>
        <h2 className = "progl"> Progress</h2>
        <h1 className='titleQ'> How many syllables are in the following word?</h1>
        <ProgressBar className="prog"
            completed={quesInd+1}
            bgColor="linear-gradient(90deg, #726CF8 0%, #E975A8 100%)"
            height="50px"
            width=""
            isLabelVisible={false}
            baseBgColor="rgba(114, 108, 248, 0.2)"
            labelColor=""
            animateOnRender
            maxCompleted={3}
    />
    <div className="anim">
      <div id="quizBox" >
   
    <h1 id="word" > {words[quesInd]}</h1>
       {<Questions  render={renderF} quesInd={quesInd} handle={handleChange} ans={markedAns} quesList={quesList} ansList={ansList} /> }
        </div>
        </div>
        </div>
    );
}}
export default SyllableCounting;