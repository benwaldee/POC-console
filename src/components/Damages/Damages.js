import DamageField from "./DamageField";
import DamageSearch from "./DamageSearch";
import "../CSS/Join.css"
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useGeneralContext } from '../../context/GeneralContext';
import { useEffect } from "react";

function Damages() {

    const { setClickedDamage } = useGeneralContext()

    useEffect(() => {

        setClickedDamage(null)

    }, [])

    //title setter
    useEffect(() => {
        document.title = "Damages";
    }, [])


    return (
        <>
            <Navbar />
            <div className="Join_outer-wrap">
                {/* <div className="Join_Search-wrap">  <DamageSearch /></div>
                <div className="Join_Field-wrap">  <DamageField /></div> */}
            </div>
            <Footer />
        </>
    );

}

export default Damages;
