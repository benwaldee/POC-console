import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGeneralContext } from '../../context/GeneralContext';
import "../CSS/Search.css"


function LoadSearch() {

    //STATE VARS
    //------------------------------------------------------------------------------------------------------------
    const [search, setSearch] = useState("")
    const [matchedLoads, setMatchedLoads] = useState([])
    const [displaySearchResults, setDisplaySearchResults] = useState(false)

    const { setClickedLoad } = useGeneralContext()
    const { loadArr, setLoadArr } = useGeneralContext()

    //USE EFFECTS
    //------------------------------------------------------------------------------------------------------------
    useEffect(() => {

        const fetchLoads = async () => {
            try {

                const loads = await axios.get('https://kek6x29n3i.execute-api.us-east-1.amazonaws.com/all')
                setLoadArr(loads.data.loadArr)

            } catch (error) {
                console.error("error w loads", error)
            }
        }

        fetchLoads()

    }, [])

    useEffect(() => {
        displaySearchResults && searchLoads(search)
    }, [displaySearchResults])

    //FUNCTIONS
    //-----------------------------------------------------------------------------------------------------------

    //search function that will return everything with the % keyword
    // will match a search if the load number begins with the search input
    const searchLoads = (searchStr) => {

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
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setDisplaySearchResults(true)
        }
    };


    return (
        <>
            <h1 className='Search_title'>LOADS</h1>
            <div className='Search_search-box'>
                <label className="Search_search-label" for="load#">Load # :</label>
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
                        <div className='Search_table-header'>
                            <div className='Search_table-header-val'>Load</div>
                            <div className='Search_table-header-val'>Load Type</div>
                            <div className='Search_table-header-val'>Truck</div>
                            <div className='Search_table-header-val'>Driver</div>
                        </div>
                        {matchedLoads?.map((load, index) =>
                            <div
                                className={`Search_table-entry Search_table-entry-last-${matchedLoads.length - 1 === index}`}
                                key={load.data.loadNum}
                                onClick={() => {
                                    setClickedLoad(load)
                                }}
                            >
                                <div className='Search_table-entry-val '>{load.data.loadNum}</div>
                                <div className='Search_table-entry-val'>{load.data.loadType}</div>
                                <div className='Search_table-entry-val'>{load.data.truckNum}</div>
                                <div className='Search_table-entry-val'>{load.data.userId}</div>
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
