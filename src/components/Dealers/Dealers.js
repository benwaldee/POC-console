import DealerField from "./DealerField";
import DealerSearch from "./DealerSearch";
import "../CSS/Join.css"
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useGeneralContext } from '../../context/GeneralContext';
import { useEffect } from "react";

function Dealers() {

    const { setClickedDealer } = useGeneralContext()

    useEffect(() => {

        setClickedDealer(null)

    }, [])

    //title setter
    useEffect(() => {
        document.title = "Dealers";
    }, [])


    return (
        <>
            <Navbar />
            <div className="Join_outer-wrap">
                {/* <div className="Join_Search-wrap">  <DealerSearch /></div>
                <div className="Join_Field-wrap">  <DealerField /></div> */}
            </div>
            <Footer />
        </>
    );

}

export default Dealers;
