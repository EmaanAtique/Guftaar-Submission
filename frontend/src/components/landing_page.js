import lc from "../images/landing_client.svg"
import lcc from "../images/landing_coach.svg"
import sb from "../images/speechbubble.png"
import footer from "../images/footer.png"
import { useNavigate } from 'react-router-dom';
import "../fonts/LeagueSpartan-VariableFont_wght.ttf"
import './landing_page.css';


function LandingPage(){
    const navigate = useNavigate();
    function CoachLogin(){
        navigate("/coach/login")
    }
    function Client(){
        navigate("/client/login")
    }
    return(
        <div className="first" style={{background: "#4d5399"}} > 
            <h1 id="GH"> Guftaar</h1>
            <h2 id="slogan"> speech made easy</h2>
            <button id ="clientsignup" onClick={Client}> 
            <img id="lc"src={lc}/> I'm looking for speech support </button>
            <button id ="coachlogin" onClick={CoachLogin}> 
            <img id="lcc"src={lcc}/> I'm a coach that offers services </button>
            <a id="admin" href="/admin/login"> Admin Login</a>
            <h1 id="abt"> about us</h1>
            <img id="sb" src={sb}></img>
            <p className="info" align="left">Guftaar is a speech therapy support web service, empowering PWS to take the first step in reclaiming their speech. With guided vocal practice, daily exercises and positive reinforcement, through Guftaar, we want to make it easier for you to overcome your stuttering.
                <br/>Beyond independent speech practice, Guftaar connects users to top rated coaches for one-one mentorship calls, and brings exclusive access to purchase complete stammer support courses.
                <br/>At Guftaar, we help make speech easy.</p>
            <h1 id="sj"> Take charge of your speech journey</h1>
            <a id="cta" href="/client/register"> sign up now</a>
            <img id="footer" src={footer}></img>
        </div>
    )
}

export default LandingPage;