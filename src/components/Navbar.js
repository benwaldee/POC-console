import { useEffect, useState } from 'react';
import "./CSS/Navbar.css"
import logo from './images/logo.png'
import { Link } from "react-router-dom";

function Navbar() {
    //STATE VARS
    //-----------------------------------------------------------------------------------------------------------
    const [formattedDate, setFormattedDate] = useState('');


    //USE EFFECTS
    //-----------------------------------------------------------------------------------------------------------
    useEffect(() => {
        const options = {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };

        const updateDateTime = () => {
            const currentDate = new Date();
            const formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(currentDate);
            setFormattedDate(formattedDateTime);
        };

        updateDateTime();

        const intervalId = setInterval(updateDateTime, 1000);

        return () => {
            clearInterval(intervalId); // clean up the interval when the component unmounts
        };
    }, []);

    //FUNCTIONS
    //-----------------------------------------------------------------------------------------------------------
    return (
        <>
            <div className='Navbar_outer-wrap'>
                <div className='Navbar_top'>
                    <div className='Navbar_top-left'>
                        <Link to="/">
                            <img className='Navbar_top-left-image' src={logo}></img>
                        </Link>
                        <div className='Navbar_top-left-text'>ADMINISTRATIVE APPLICATION</div>
                    </div>
                    <div className='Navbar_top-right'>
                        <div className='Navbar_top-right-text'> WELCOME <span style={{ color: '#76a1c5' }}>USER</span> {formattedDate}</div>
                    </div>
                </div>
                <div className='Navbar_bottom'>
                    <Link to="/users" className='Navbar_bottom-link'>USERS</Link>
                    <Link to="/loads" className='Navbar_bottom-link'>LOADS</Link>
                    <Link to="/deliveries" className='Navbar_bottom-link'>DELIVERIES</Link>
                    <Link to="/vins" className='Navbar_bottom-link'>VINS</Link>
                    <Link to="/damages" className='Navbar_bottom-link'>DAMAGES</Link>
                    <Link to="/dealers" className='Navbar_bottom-link'>DEALERS</Link>
                </div>

            </div >
        </>
    );

}

export default Navbar;
