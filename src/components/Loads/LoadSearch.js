import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGeneralContext } from '../../context/GeneralContext';
import "../CSS/PentaSearch.css"
import deleteImg from "../images/trash-can-solid.svg"
import deleteImgRed from "../images/trash-can-red.svg"


function LoadSearch({ remountParent, handleRemount }) {

    //STATE VARS
    //------------------------------------------------------------------------------------------------------------
    const [search, setSearch] = useState("")
    const [matchedLoads, setMatchedLoads] = useState(null)
    const [displaySearchResults, setDisplaySearchResults] = useState(false)
    const [clickedDivIndex, setClickedDivIndex] = useState(null)
    const [hoveredDeleteIdx, setHoveredDeleteIdx] = useState(null)

    const { setClickedLoad } = useGeneralContext()
    const { loadArr, setLoadArr } = useGeneralContext()

    //USE EFFECTS
    //------------------------------------------------------------------------------------------------------------
    useEffect(() => {


        const fetchLoads = async () => {
            try {

                const loads = await axios.get('https://4kdavonrj6.execute-api.us-east-1.amazonaws.com/v1/all')
                setLoadArr(loads.data.loadArr)

            } catch (error) {
                console.error("error w loads", error)
            }
        }

        fetchLoads()

    }, [remountParent]) //fetch loads both on initial mount and when parent remounts (after edit field is submitted)

    useEffect(() => {
        displaySearchResults && searchLoads(search)
    }, [displaySearchResults])

    //reset state on parent remount
    useEffect(() => {

        setSearch("")
        setMatchedLoads(null)
        setDisplaySearchResults(false)
        setClickedDivIndex(null)


    }, [remountParent])

    //FUNCTIONS
    //-----------------------------------------------------------------------------------------------------------

    //search function that will return everything with the % keyword
    // will match a search if the load number begins with the search input
    const searchLoads = (searchStr) => {

        if (loadArr) {
            if (searchStr === "%") {
                setMatchedLoads(loadArr)
                return
            }

            let tempMatchedLoads = []

            for (let load of loadArr) {
                const num = String(load.data.loadNum)
                if (num.startsWith(searchStr)) {
                    tempMatchedLoads.push(load)
                }
            }

            setMatchedLoads(tempMatchedLoads)
            return
        } else { return }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setDisplaySearchResults(true)
        }
    };

    //loads and users (as of right now) are the only items that have their own collections, thus triggering
    //an actual delete route - others will simply save a new load
    const handleDelete = async (load) => {

        try {
            await axios.post('https://4kdavonrj6.execute-api.us-east-1.amazonaws.com/v1/delete_load', { loadNum: load.data.loadNum, version: "" })
            await setClickedLoad(null)
            await handleRemount(true)

        } catch (error) {
            console.error("error w load delete", error)
        }
    }


    return (
        <>
            <h1 className='Search_title'>LOADS</h1>
            <div className='Search_search-box'>
                <label className="Search_search-label" htmlFor="load#">Load # :</label>
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
            {displaySearchResults && loadArr &&
                <div className='Search_search-results-wrap-table'>
                    <div className='Search_flex'>
                        <div className='PentaSearch_table-header'>
                            <div className='PentaSearch_table-header-val'>Load</div>
                            <div className='PentaSearch_table-header-val'>Load Type</div>
                            <div className='PentaSearch_table-header-val'>Truck</div>
                            <div className='PentaSearch_table-header-val'>Driver</div>
                            <div className='PentaSearch_table-header-val-last'><div className='PentaSearch_table-header-delete'>Delete</div></div>
                        </div>
                        {matchedLoads?.map((load, index) =>
                            <div
                                className={`PentaSearch_table-entry PentaSearch_table-entry-last-${matchedLoads.length - 1 === index} PentaSearch_table-entry-clicked-${index === clickedDivIndex}`}
                                key={load.data.loadNum}
                                onClick={() => {
                                    setClickedLoad(load)
                                    setClickedDivIndex(index)
                                }}
                                onMouseLeave={() => { setHoveredDeleteIdx(null) }}
                            >
                                <div className='PentaSearch_table-entry-val '>{load.data.loadNum}</div>
                                <div className='PentaSearch_table-entry-val'>{load.data.loadType}</div>
                                <div className='PentaSearch_table-entry-val'>{load.data.truckNum}</div>
                                <div className='PentaSearch_table-entry-val'>{load.data.userId}</div>
                                {/* this is a toggle for the red vs solid svg for trash can */}
                                {hoveredDeleteIdx !== index &&
                                    <div
                                        className='PentaSearch_table-entry-val-last'
                                        onMouseLeave={() => { setHoveredDeleteIdx(null) }}
                                    >
                                        <img className='PentaSearch_table-entry-delete'
                                            onMouseEnter={() => { setHoveredDeleteIdx(index) }}
                                            onMouseLeave={() => { setHoveredDeleteIdx(null) }}
                                            src={deleteImg}>
                                        </img>
                                    </div>
                                }
                                {hoveredDeleteIdx === index &&
                                    <div
                                        className='PentaSearch_table-entry-val-last'
                                        onMouseLeave={() => { setHoveredDeleteIdx(null) }}
                                    >
                                        <img className='PentaSearch_table-entry-delete'
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleDelete(load)
                                                return
                                            }}
                                            onMouseEnter={() => { setHoveredDeleteIdx(index) }}
                                            onMouseLeave={() => { setHoveredDeleteIdx(null) }}
                                            src={deleteImgRed}>
                                        </img>
                                    </div>
                                }
                            </div>

                        )}

                    </div>
                </div>
            }
            {
                !matchedLoads?.length &&
                <div className='Search_search-results-wrap'>
                    <div className='Search_search-results-empty'>No loads match the current search criteria</div>
                </div>
            }




        </>


    );



}

export default LoadSearch;
