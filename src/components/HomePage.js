import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGeneralContext } from '../context/GeneralContext';
import "./CSS/HomePage.css"
import Navbar from './Navbar';
import Footer from './Footer';
import HomePageBox from './HomePageBox';

function HomePage() {
    //STATE VARS
    //-----------------------------------------------------------------------------------------------------------
    //USE EFFECTS
    //-----------------------------------------------------------------------------------------------------------
    //FUNCTIONS
    //-----------------------------------------------------------------------------------------------------------
    return (
        <>
            <Navbar />
            <HomePageBox />
            <Footer />
        </>
    );

}

export default HomePage;
