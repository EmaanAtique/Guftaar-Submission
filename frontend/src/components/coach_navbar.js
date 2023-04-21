import './coach_navbar.css'
import pi from "../images/profileicon.png"
import hi from "../images/Home.png";
import {Link, Route, Router} from 'react-router-dom'
import LandingPage from './landing_page';
import DropdownNavbar from './navbar_dropdown';
import { useNavigate } from 'react-router-dom';


function NavbarCoach(){
    const navigate = useNavigate();

    function GoBack(){
        navigate("/coach/dashboard")
    }

    return(
        <nav>
            <ul className='nav-items-list'>
                <li className='guftaar-logo nav-item'><a onClick={GoBack}>Guftaar</a></li>
                <li className='nav-item4'> <a className='nav-anchor' href='/coach/notes'>notes </a></li>
                <div className='navbar-icons'>    
               <img src={hi} className='navbar-img-home2' onClick={GoBack}/>
                </div>
                <DropdownNavbar />
                
            </ul>
        </nav>
    )
}

export default NavbarCoach; 