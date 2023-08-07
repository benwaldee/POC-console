import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGeneralContext } from '../context/GeneralContext';
import "./CSS/Footer.css"

function Footer() {
    //STATE VARS
    //-----------------------------------------------------------------------------------------------------------
    //USE EFFECTS
    //-----------------------------------------------------------------------------------------------------------
    //FUNCTIONS
    //-----------------------------------------------------------------------------------------------------------
    return (
        <>
            <div className='Footer_outer-wrap'>
                <div className='Footer_copyright' >COPYRIGHT© 2023 CASSENS TRANSPORT COMPANY. ALL RIGHTS RESERVED.</div>
                <div className='Footer_text'>REPRODUCTION IN WHOLE OR IN PART IN ANY FORM OR MEDIUM WITHOUT EXPRESS WRITTEN PERMISSION IS PROHIBITED.</div>
                <div className='Footer_info'>POC SERVERLESS V3 | AWS LAMBDA | API GATEWAY | DOCUMENTDB </div>
            </div>
        </>
    );

}

export default Footer;
