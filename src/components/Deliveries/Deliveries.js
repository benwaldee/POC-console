import DeliveryField from "./DeliveryField";
import DeliverySearch from "./DeliverySearch";
import "../CSS/Join.css"
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useGeneralContext } from '../../context/GeneralContext';
import { useEffect } from "react";

function Deliveries() {

    const { setClickedDelivery } = useGeneralContext()

    useEffect(() => {

        setClickedDelivery(null)

    }, [])

    return (
        <>
            <Navbar />
            <div className="Join_outer-wrap">
                <div className="Join_Search-wrap">  <DeliverySearch /></div>
                <div className="Join_Field-wrap">  <DeliveryField /></div>
            </div>
            <Footer />
        </>
    );

}

export default Deliveries;
