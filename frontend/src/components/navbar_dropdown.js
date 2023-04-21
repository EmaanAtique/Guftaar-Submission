import Dropdown from 'react-bootstrap/Dropdown'
import profile from "../images/Test Account.png";
import './dropdown.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function DropdownNavbar(props){
    const navigate = useNavigate()


    return(
        <Dropdown className='dropdown'>
            <Dropdown.Toggle style={{backgroundColor: 'transparent', padding:0, margin:0}}>  
                <img src={profile} className='navbar-img2'/>
            </Dropdown.Toggle>
            <Dropdown.Menu className='dropdown-menu' >
                <Dropdown.Item href='./changePassword' className='dropdown-item'>Update Password</Dropdown.Item>
                <Dropdown.Item className='dropdown-item' onClick={() => {
                    localStorage.clear()
                    navigate("/")
                }}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    ) 
}

export default DropdownNavbar;