import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGeneralContext } from '../../context/GeneralContext';
import "../CSS/Search.css"
import "../CSS/PentaSearch.css"


function VinSearch() {

    //STATE VARS
    //------------------------------------------------------------------------------------------------------------
    const [search, setSearch] = useState("")
    const [matchedVins, setMatchedVins] = useState([])
    const [displaySearchResults, setDisplaySearchResults] = useState(false)
    const [clickedDivIndex, setClickedDivIndex] = useState(null)

    //map for quick access to deliveries via load number
    const [vinMap, setVinMap] = useState(null)

    //map for access to load when delivery is clicked
    const [loadMap, setLoadMap] = useState(null)

    const { setClickedVin } = useGeneralContext()
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

    //this use effect creates all of the maps when it sense a change in loadArr
    useEffect(() => {
        if (loadArr) {
            const tempVinMap = {}
            for (let load of loadArr) {
                //access all of the vins by grabbing the vinDeliveries which contain the vins (in vinInfo)
                tempVinMap[Number(load.data.loadNum)] = Object.values(load.data.vinDeliveries)
            }

            //attach load numbers to vins for later use
            for (let loadNum in tempVinMap) {
                for (let vin of tempVinMap[loadNum]) {
                    vin["loadNum"] = loadNum
                }
            }
            setVinMap(tempVinMap)


            const tempLoadMap = {}
            for (let load of loadArr) {
                tempLoadMap[load.data.loadNum] = load
            }

            setLoadMap(tempLoadMap)
        }

    }, [loadArr])

    useEffect(() => {
        displaySearchResults && searchLoads(search)
    }, [displaySearchResults])

    //FUNCTIONS
    //-----------------------------------------------------------------------------------------------------------

    //search function that will return everything with the % keyword
    // will match a search if the load number begins with the search input
    const searchLoads = (searchStr) => {
        if (vinMap) {
            const tempVinMap = JSON.parse(JSON.stringify(vinMap))
            let tempMatchedVins = []

            if (searchStr === "%") {
                for (let loadNum in vinMap) {
                    tempMatchedVins = [...tempMatchedVins, ...tempVinMap[loadNum]]
                }
                setMatchedVins(tempMatchedVins)
                return
            }

            for (let loadNum in tempVinMap) {
                if (String(loadNum).startsWith(searchStr)) {
                    tempMatchedVins = [...tempMatchedVins, ...tempVinMap[loadNum]]
                }
            }

            setMatchedVins(tempMatchedVins)
            return
        } else { return }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setDisplaySearchResults(true)
        }
    };


    return (
        <>
            <h1 className='Search_title'>VINS</h1>
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
                        <div className='PentaSearch_table-header'>
                            <div className='PentaSearch_table-header-val'>Vin Number</div>
                            <div className='PentaSearch_table-header-val'>Load Number</div>
                            <div className='PentaSearch_table-header-val'>Type</div>
                            <div className='PentaSearch_table-header-val'>Color</div>
                            <div className='PentaSearch_table-header-val'>Body</div>
                        </div>
                        {matchedVins?.map((vin, index) =>
                            <div
                                className={`PentaSearch_table-entry Search_table-entry-last-${matchedVins.length - 1 === index} Search_table-entry-clicked-${index === clickedDivIndex}`}
                                key={vin.vin_number}
                                onClick={() => {
                                    setClickedVin(vin)
                                    setClickedLoad(loadMap[vin.loadNum])
                                    setClickedDivIndex(index)
                                }}
                            >
                                <div className='PentaSearch_table-entry-val '>{vin.vinInfo.vin_number}</div>
                                <div className='PentaSearch_table-entry-val '>{vin.loadNum}</div>
                                <div className='PentaSearch_table-entry-val'>{vin.vinInfo.type}</div>
                                <div className='PentaSearch_table-entry-val'>{vin.vinInfo.color}</div>
                                <div className='PentaSearch_table-entry-val'>{vin.vinInfo.body}</div>
                            </div>

                        )}

                    </div>
                </div>
            }
            {
                !matchedVins?.length &&
                <div className='Search_search-results-wrap'>
                    <div className='Search_search-results-empty'>No vins match the current search criteria</div>
                </div>
            }




        </>


    );



}

export default VinSearch;
