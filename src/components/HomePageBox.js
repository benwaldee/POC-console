import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGeneralContext } from '../context/GeneralContext';
import "./CSS/HomePageBox.css"

function HomePageBox() {
    //STATE VARS
    //-----------------------------------------------------------------------------------------------------------
    //USE EFFECTS
    //-----------------------------------------------------------------------------------------------------------
    //FUNCTIONS
    //-----------------------------------------------------------------------------------------------------------
    return (
        <>
            <div className='HomePageBox_outer-wrap'>
                <div className='HomePageBox_title' >AUTOTRAN ADMINISTRATIVE SUITE</div>
                <div className='HomePageBox_text'>PLEASE USE THE NAVIGATION LINKS AT THE TOP TO ACCESS DIFFERENT SECTIONS OF THE ADMINISTRATION PANEL.</div>
            </div>
        </>
    );

}

export default HomePageBox;
