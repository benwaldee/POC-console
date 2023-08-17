import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGeneralContext } from '../../context/GeneralContext';
import "../CSS/Search.css"
import "../CSS/HectaSearch.css"
import deleteImg from "../images/trash-can-solid.svg"
import deleteImgRed from "../images/trash-can-red.svg"




function UserSearch({ remountParent, handleRemount }) {

    //STATE VARS
    //------------------------------------------------------------------------------------------------------------
    const [search, setSearch] = useState("")
    const [matchedUsers, setMatchedUsers] = useState([])
    const [displaySearchResults, setDisplaySearchResults] = useState(false)
    const [clickedDivIndex, setClickedDivIndex] = useState(null)
    const [hoveredDeleteIdx, setHoveredDeleteIdx] = useState(null)


    const { setClickedUser } = useGeneralContext()
    const { userArr, setUserArr } = useGeneralContext()

    //USE EFFECTS
    //------------------------------------------------------------------------------------------------------------
    useEffect(() => {

        const fetchUsers = async () => {
            try {

                const users = await axios.get('https://4kdavonrj6.execute-api.us-east-1.amazonaws.com/v1/users')
                setUserArr(users.data.userArr)

            } catch (error) {
                console.error("error w users", error)
            }
        }

        fetchUsers()

    }, [remountParent])

    useEffect(() => {
        displaySearchResults && searchUsers(search)
    }, [displaySearchResults])

    //reset state on parent remount
    useEffect(() => {

        setSearch("")
        setMatchedUsers(null)
        setDisplaySearchResults(false)
        setClickedDivIndex(null)

    }, [remountParent])


    //FUNCTIONS
    //-----------------------------------------------------------------------------------------------------------

    //search function that will return everything with the % keyword
    // will match a search if the load number begins with the search input
    const searchUsers = (searchStr) => {
        if (userArr) {
            if (searchStr === "%") {
                setMatchedUsers(userArr)
                return
            }

            let tempMatchedUsers = []

            for (let user of userArr) {
                const num = String(user.userId)
                if (num.startsWith(searchStr)) {
                    tempMatchedUsers.push(user)
                }
            }

            setMatchedUsers(tempMatchedUsers)
            return
        } else { return }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setDisplaySearchResults(true)
        }
    };

    const translateUserType = (num) => {
        if (num == 0) {
            return 'Dealer'
        } else if (num == 1) {
            return 'Driver'
        } else if (num == 2) {
            return 'Admin'
        } else {
            return 'Supervisor'
        }
    }

    const handleDelete = async (user) => {
        try {
            await axios.post('https://4kdavonrj6.execute-api.us-east-1.amazonaws.com/v1/delete_user', user)
            await setClickedUser(null)
            await handleRemount(true)

        } catch (error) {
            console.error("error w user delete", error)
        }
    }


    return (
        <>
            <h1 className='Search_title'>USERS</h1>
            <div className='Search_search-box'>
                <label className="Search_search-label" htmlFor="load#">User ID # :</label>
                <input
                    id='load#'
                    className='Search_search-field'
                    type='text'
                    value={search}
                    onChange={(e) => {
                        setDisplaySearchResults(false)
                        setSearch(e.target.value)
                    }}
                    placeholder=''
                    maxLength={50}
                    onKeyDown={handleKeyPress}
                ></input>
                <button
                    className='Search_search-button'
                    onClick={() => {
                        setDisplaySearchResults(true)
                    }}
                >SEARCH</button>
            </div>
            {displaySearchResults && userArr &&
                <div className='Search_search-results-wrap-table'>
                    <div className='Search_flex'>
                        <div className='HectaSearch_table-header'>
                            <div className='HectaSearch_table-header-val'>User Id</div>
                            <div className='HectaSearch_table-header-val'>First Name</div>
                            <div className='HectaSearch_table-header-val'>Last Name</div>
                            <div className='HectaSearch_table-header-val'>User Type</div>
                            <div className='HectaSearch_table-header-val'>Active</div>
                            <div className='HectaSearch_table-header-val-last'><div className='HectaSearch_table-header-delete'>Delete</div></div>
                        </div>
                        {matchedUsers?.map((user, index) =>
                            <div
                                className={`HectaSearch_table-entry HectaSearch_table-entry-last-${matchedUsers?.length - 1 === index} Search_table-entry-clicked-${index === clickedDivIndex}`}
                                key={user.userId}
                                onClick={() => {
                                    setClickedUser(user)
                                    setClickedDivIndex(index)
                                }}
                            >
                                <div className='HectaSearch_table-entry-val '>{user.userId}</div>
                                <div className='HectaSearch_table-entry-val'>{user.firstName}</div>
                                <div className='HectaSearch_table-entry-val'>{user.lastName}</div>
                                <div className='HectaSearch_table-entry-val'>{translateUserType(user.userType)}</div>
                                <div className='HectaSearch_table-entry-val'>{user.active === 1 ? "Active" : "Inactive"}</div>
                                {/* this is a toggle for the red vs solid svg for trash can */}
                                {hoveredDeleteIdx !== index && <div className='HectaSearch_table-entry-val-last'>
                                    <img className='HectaSearch_table-entry-delete'
                                        onMouseEnter={() => { setHoveredDeleteIdx(index) }}
                                        onMouseLeave={() => { setHoveredDeleteIdx(null) }}
                                        src={deleteImg}></img
                                    ></div>}
                                {hoveredDeleteIdx === index && <div className='HectaSearch_table-entry-val-last'>
                                    <img className='HectaSearch_table-entry-delete'
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleDelete(user)
                                            return
                                        }}
                                        onMouseEnter={() => { setHoveredDeleteIdx(index) }}
                                        onMouseLeave={() => { setHoveredDeleteIdx(null) }}
                                        src={deleteImgRed}></img>
                                </div>}

                            </div>

                        )}

                    </div>
                </div>
            }
            {
                !matchedUsers?.length &&
                <div className='Search_search-results-wrap'>
                    <div className='Search_search-results-empty'>No users match the current search criteria</div>
                </div>
            }




        </>


    );



}

export default UserSearch;
