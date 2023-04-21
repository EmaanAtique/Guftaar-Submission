import './daily_activities.css'
import cross from "../images/cross.svg";
import Dashboard from './client_dashboard';
import breathing from "../images/breathing.png";
import syllable from "../images/syllable.png";
import link from "../images/link.svg";
import setBreathingTime from './set_breathing_time'
import { useNavigate } from 'react-router-dom';
import NavbarClient from './client_navbar';

function Daily_Activities(){
    const navigate = useNavigate();

    function GoBack(){
        navigate("/client/dashboard")
    }

    function GoTimer(){
        navigate("/client/dailyActivities/setBreathingTime")
    }
    function GoLinkLator(){
        navigate("/client/dailyActivities/Linklator")
    }
    function GoSyllable(){
        navigate("/client/dailyActivities/syllableCounting")
    }

    if (!localStorage.getItem("token")){
        return (
          <div>
            <h1> Not Authorized</h1>
          </div>
        )
      }
      else{
return(
    <div className='dailyBack'>
         <NavbarClient />
         <h3 className='titlequestion'>Daily Activities</h3>  
         <img className="gobackcross"src={cross} onClick={GoBack}/>
         <h1 className='whichquestion'>Which activity do you want to play?</h1>

         <div className='syllableBack' onClick={GoSyllable}>
         <img className='syllablepic' src={syllable}/>
         <h3 className= 'categorysc'>Syllable Counting</h3>
         </div>

         <div className='breathingBack' onClick={GoTimer}>
        <img className='breathingpic' src={breathing}/>
         <h3 className= 'categorybe'>Breathing Exercise</h3>
         </div>

         <div className='linkBack' onClick={GoLinkLator}>
         <img className='linkpic' src={link}/>
         <h3 className= 'categoryll'>Link Later Voice Progression</h3>
         </div>

    </div>
);
}
}

export default Daily_Activities;