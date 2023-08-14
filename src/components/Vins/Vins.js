import VinField from "./VinField.js";
import VinSearch from "./VinSearch";
import "../CSS/Join.css"
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useGeneralContext } from '../../context/GeneralContext';
import { useEffect } from "react";

function Vins() {

    const { setClickedVin } = useGeneralContext()

    useEffect(() => {

        setClickedVin(null)

    }, [])

    return (
        <>
            <Navbar />
            <div className="Join_outer-wrap">
                <div className="Join_Search-wrap">  <VinSearch /></div>
                <div className="Join_Field-wrap">  <VinField /></div>
            </div>
            <Footer />
        </>
    );

}

export default Vins;
