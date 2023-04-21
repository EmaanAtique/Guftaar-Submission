import './client_home.css';
import Login from "./login"
import Register from "./register"
import { useState } from 'react';


function ClientHome(props){
    const [currentForm, setcurrentForm] = useState('login')

    const toggleForm = (formName) => {
        setcurrentForm(formName)
    }

    return(

        <div className='client-bg'>
            {currentForm === "login" ? <Login  onFormSwitch={toggleForm}/> : <Register  onFormSwitch={toggleForm}/>}
        </div>
    )
}

export default ClientHome;