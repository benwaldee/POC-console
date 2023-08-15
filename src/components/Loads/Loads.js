import LoadField from "./LoadField";
import LoadSearch from "./LoadSearch";
import "../CSS/Join.css"
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useGeneralContext } from '../../context/GeneralContext';
import { useEffect } from "react";

function Loads() {

    const { clickedLoad, setClickedLoad } = useGeneralContext()

    useEffect(() => {

        setClickedLoad(null)

    }, [])

    //title setter
    useEffect(() => {
        document.title = "Loads";
    }, [])


    return (
        <>
            <Navbar />
            <div className="Join_outer-wrap">
                <div className="Join_Search-wrap">  <LoadSearch /></div>
                <div className="Join_Field-wrap">  <LoadField /></div>
            </div>
            <Footer />
        </>
    );

}

export default Loads;
