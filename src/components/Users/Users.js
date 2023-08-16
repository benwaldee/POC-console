import UserField from "./UserField";
import UserSearch from "./UserSearch";
import "../CSS/Join.css"
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useGeneralContext } from '../../context/GeneralContext';
import { useEffect, useState } from "react";

function Users() {

    const [remountParent, setRemountParent] = useState(false);

    //title setter
    useEffect(() => {
        document.title = "Users";
    }, [])

    //reMounter
    const handleRemount = () => {
        setRemountParent(!remountParent);
    };


    return (
        <>
            <Navbar />
            <div className="Join_outer-wrap">
                <div className="Join_Search-wrap">  <UserSearch remountParent={remountParent} /></div>
                <div className="Join_Field-wrap">  <UserField handleRemount={handleRemount} /></div>
            </div>
            <Footer />
        </>
    );

}

export default Users;
