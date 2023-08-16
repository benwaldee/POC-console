import DeliveryField from "./DeliveryField";
import DeliverySearch from "./DeliverySearch";
import "../CSS/Join.css"
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useGeneralContext } from '../../context/GeneralContext';
import { useEffect, useState } from "react";

function Deliveries() {

    const [remountParent, setRemountParent] = useState(false);
    const { setClickedDelivery } = useGeneralContext()

    useEffect(() => {

        setClickedDelivery(null)

    }, [])

    //title setter
    useEffect(() => {
        document.title = "Deliveries";
    }, [])

    //reMounter
    const handleRemount = () => {
        setRemountParent(!remountParent);
    };

    return (
        <>
            <Navbar />
            <div className="Join_outer-wrap">
                <div className="Join_Search-wrap">  <DeliverySearch remountParent={remountParent} /></div>
                <div className="Join_Field-wrap">  <DeliveryField handleRemount={handleRemount} /></div>
            </div>
            <Footer />
        </>
    );

}

export default Deliveries;
