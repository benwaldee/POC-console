import LoadField from "./LoadField";
import LoadSearch from "./LoadSearch";
import "./CSS/Loads.css"
import Navbar from './Navbar';
import Footer from './Footer';

function Loads() {


    return (
        <>
            <Navbar />
            <div className="Loads_outer-wrap">
                <div className="Loads_LoadSearch-wrap">  <LoadSearch /></div>
                <div className="Loads_LoadField-wrap">  <LoadField /></div>
            </div>
            <Footer />
        </>
    );

}

export default Loads;
