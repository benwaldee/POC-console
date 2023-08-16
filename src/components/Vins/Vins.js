import VinField from "./VinField.js";
import VinSearch from "./VinSearch";
import "../CSS/Join.css"
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useGeneralContext } from '../../context/GeneralContext';
import { useEffect, useState } from "react";

function Vins() {

    const [remountParent, setRemountParent] = useState(false);
    const { setClickedVin } = useGeneralContext()

    useEffect(() => {

        setClickedVin(null)

    }, [])

    //title setter
    useEffect(() => {
        document.title = "Vins";
    }, [])

    //reMounter
    const handleRemount = () => {
        setRemountParent(!remountParent);
    };

    return (
        <>
            <Navbar />
            <div className="Join_outer-wrap">
                <div className="Join_Search-wrap">  <VinSearch remountParent={remountParent} /></div>
                <div className="Join_Field-wrap">  <VinField handleRemount={handleRemount} /></div>
            </div>
            <Footer />
        </>
    );

}

export default Vins;
