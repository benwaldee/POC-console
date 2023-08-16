import { useEffect } from 'react';
import axios from 'axios';
import { useGeneralContext } from '../context/GeneralContext';
import Navbar from './Navbar';
import Footer from './Footer';
import HomePageBox from './HomePageBox';

function HomePage() {
    //STATE VARS
    //-----------------------------------------------------------------------------------------------------------
    const { setLoadArr } = useGeneralContext()
    const { setUserArr } = useGeneralContext()
    //USE EFFECTS
    //-----------------------------------------------------------------------------------------------------------
    useEffect(() => {

        const fetchLoads = async () => {
            try {

                const loads = await axios.get('https://4kdavonrj6.execute-api.us-east-1.amazonaws.com/v1/all')

                setLoadArr(loads.data.loadArr)

            } catch (error) {
                console.error("error w loads", error)
            }
        }

        fetchLoads()

        const fetchUsers = async () => {
            try {

                const users = await axios.get('https://kek6x29n3i.execute-api.us-east-1.amazonaws.com/users')
                setUserArr(users.data.userArr)

            } catch (error) {
                console.error("error w users", error)
            }
        }

        fetchUsers()

    }, [])

    //title setter
    useEffect(() => {
        document.title = "Cassens App";
    }, [])


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
