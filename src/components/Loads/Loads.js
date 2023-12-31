import LoadField from "./LoadField";
import LoadSearch from "./LoadSearch";
import "../CSS/Join.css"
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useGeneralContext } from '../../context/GeneralContext';
import { useEffect, useState } from "react";
import CreateLoadModal from './CreateLoadModal'

function Loads() {

    const [remountParent, setRemountParent] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [bannerType, setBannerType] = useState(null)


    const { clickedLoad, setClickedLoad } = useGeneralContext()

    useEffect(() => {

        setClickedLoad(null)

    }, [])

    //title setter
    useEffect(() => {
        document.title = "Loads";
    }, [])

    //watch for remount parent to change - only changes when a user submits an edit (if statement covers onMount)
    //then we can launch banner
    //now includes the delete event - triggered from UserSearch
    useEffect(() => {


        remountParent && setShowBanner(true)

        const timeoutId = setTimeout(() => {
            setShowBanner(false)
            setBannerType(null)
        }, 3000)

        setRemountParent(false)


    }, [remountParent])

    //reMounter
    const handleRemount = (condition) => {
        setBannerType(condition)
        setRemountParent(!remountParent);
    };


    return (
        <>
            <Navbar />
            <h1 className='Join_title'>LOADS</h1>
            <div className="Join_Create-wrap">
                <CreateLoadModal handleRemount={handleRemount} />
            </div>
            {showBanner &&
                <div className="Join_banner">
                    <div className="Join_banner-spacer"></div>
                    <div className="Join_banner-text">Load successfully {bannerType}</div>
                    <div className="Join_banner-exit"
                        onClick={() => { setShowBanner(false) }}
                    >
                        <div className="Join_banner-X">X</div>
                    </div>
                </div>
            }
            <div className="Join_outer-wrap">
                <div className="Join_Search-wrap">  <LoadSearch remountParent={remountParent} handleRemount={handleRemount} /></div>
                <div className="Join_Field-wrap">  <LoadField handleRemount={handleRemount} /></div>


            </div>
            <Footer />
        </>
    );

}

export default Loads;
