import './navbar_admin.css'
import pi from "../images/profileicon.png"
import hi from "../images/Home.png";
import {Link, Route, Router} from 'react-router-dom'
import LandingPage from './landing_page';
import DropdownNavbar from './navbar_dropdown';
import { useNavigate } from 'react-router-dom';


function NavbarAdmin(){
    const navigate = useNavigate();

    function GoBack(){
        navigate("/admin/dashboard")
    }

    return(
        <nav>
            <ul className='nav-items-list'>
                <li className='guftaar-logo nav-item'><a onClick={GoBack}>Guftaar</a></li>
                <li className='nav-item2'> <a className='nav-anchor' href='/admin/addEmployee'>add employees</a></li>
                <li className='nav-item3'> <a className='nav-anchor' href='/admin/readReviews'>coach profiles</a></li>
                <div className='navbar-icons'>    
               <img src={hi} className='navbar-img-home2' onClick={GoBack}/>
                </div>
                <DropdownNavbar />
                
            </ul>
        </nav>
    )
}

export default NavbarAdmin; 