import LoadField from "./LoadField";
import LoadSearch from "./LoadSearch";
import "./CSS/Loads.css"


function Loads() {


    return (
        <>
            <div className="Loads_outer-wrap">
                <div className="Loads_LoadSearch-wrap">  <LoadSearch /></div>
                <div className="Loads_LoadField-wrap">  <LoadField /></div>
            </div>
        </>
    );

}

export default Loads;
