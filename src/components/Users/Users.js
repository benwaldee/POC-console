import UserField from "./UserField";
import UserSearch from "./UserSearch";
import "../CSS/Join.css"
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useGeneralContext } from '../../context/GeneralContext';
import { useEffect } from "react";

function Users() {

    //title setter
    useEffect(() => {
        document.title = "Users";
    }, [])


    return (
        <>
            <Navbar />
            <div className="Join_outer-wrap">
                <div className="Join_Search-wrap">  <UserSearch /></div>
                <div className="Join_Field-wrap">  <UserField /></div>
            </div>
            <Footer />
        </>
    );

}

export default Users;
