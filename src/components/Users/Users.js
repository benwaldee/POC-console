import UserField from "./UserField";
import UserSearch from "./UserSearch";
import "../CSS/Users.css"
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useGeneralContext } from '../../context/GeneralContext';
import { useEffect } from "react";

function Users() {


    return (
        <>
            <Navbar />
            <div className="Users_outer-wrap">
                {/* <div className="Users_UserSearch-wrap">  <UserSearch /></div>
                <div className="Users_UserField-wrap">  <UserField /></div> */}
            </div>
            <Footer />
        </>
    );

}

export default Users;
