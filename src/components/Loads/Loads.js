import LoadField from "./LoadField";
import LoadSearch from "./LoadSearch";
import "../CSS/Join.css"
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useGeneralContext } from '../../context/GeneralContext';
import { useEffect, useState } from "react";

function Loads() {

    const [remountParent, setRemountParent] = useState(false);
    const { clickedLoad, setClickedLoad } = useGeneralContext()

    useEffect(() => {

        setClickedLoad(null)

    }, [])

    //title setter
    useEffect(() => {
        document.title = "Loads";
    }, [])

    //reMounter
    const handleRemount = () => {
        setRemountParent(!remountParent);
    };


    return (
        <>
            <Navbar />
            <div className="Join_outer-wrap">
                <div className="Join_Search-wrap">  <LoadSearch remountParent={remountParent} /></div>
                <div className="Join_Field-wrap">  <LoadField handleRemount={handleRemount} /></div>
            </div>
            <Footer />
        </>
    );

}

export default Loads;
