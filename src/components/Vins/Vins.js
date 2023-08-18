import VinField from "./VinField.js";
import VinSearch from "./VinSearch";
import "../CSS/Join.css"
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useGeneralContext } from '../../context/GeneralContext';
import { useEffect, useState } from "react";

function Vins() {

    const [remountParent, setRemountParent] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [isDelete, setIsDelete] = useState(false)

    const { setClickedVin } = useGeneralContext()

    useEffect(() => {

        setClickedVin(null)

    }, [])

    //title setter
    useEffect(() => {
        document.title = "Vins";
    }, [])

    //watch for remount parent to change - only changes when a user submits an edit (if statement covers onMount)
    //then we can launch banner
    useEffect(() => {


        remountParent && setShowBanner(true)

        const timeoutId = setTimeout(() => {
            setShowBanner(false)
            setIsDelete(false)
        }, 3000)

        setRemountParent(false)


    }, [remountParent])

    //reMounter
    const handleRemount = (del = false) => {
        if (del) {
            setIsDelete(true)
            setRemountParent(!remountParent);
        }
        else {
            setRemountParent(!remountParent);
        }

    };


    return (
        <>
            <Navbar />
            {showBanner &&
                <div className="Join_banner">
                    <div className="Join_banner-spacer"></div>
                    <div className="Join_banner-text">Vin successfully {isDelete ? "deleted" : "edited"}</div>
                    <div className="Join_banner-exit"
                        onClick={() => { setShowBanner(false) }}
                    >
                        <div className="Join_banner-X">X</div>
                    </div>
                </div>
            }
            <div className="Join_outer-wrap">
                <div className="Join_Search-wrap">  <VinSearch handleRemount={handleRemount} remountParent={remountParent} /></div>
                <div className="Join_Field-wrap">  <VinField handleRemount={handleRemount} /></div>
            </div>
            <Footer />
        </>
    );

}

export default Vins;
