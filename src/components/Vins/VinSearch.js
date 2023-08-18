import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGeneralContext } from '../../context/GeneralContext';
import "../CSS/Search.css"
import "../CSS/HectaSearch.css"
import deleteImg from "../images/trash-can-solid.svg"
import deleteImgRed from "../images/trash-can-red.svg"

function VinSearch({ remountParent, handleRemount }) {

    //STATE VARS
    //------------------------------------------------------------------------------------------------------------
    const [search, setSearch] = useState("")
    const [matchedVins, setMatchedVins] = useState([])
    const [displaySearchResults, setDisplaySearchResults] = useState(false)
    const [clickedDivIndex, setClickedDivIndex] = useState(null)
    const [hoveredDeleteIdx, setHoveredDeleteIdx] = useState(null)

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

                const loads = await axios.get('https://4kdavonrj6.execute-api.us-east-1.amazonaws.com/v1/all')
                setLoadArr(loads.data.loadArr)

            } catch (error) {
                console.error("error w loads", error)
            }
        }

        fetchLoads()

    }, [remountParent])

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

    //reset state on parent remount
    useEffect(() => {

        setSearch("")
        setMatchedVins(null)
        setDisplaySearchResults(false)
        setClickedDivIndex(null)
        setClickedVin(null)
        setClickedLoad(null)

    }, [remountParent])

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

    const handleDelete = async (vin, load) => {

        //delete vin from load - everywhere i guess
        //vin is found as a number in an array in preloads/deliveries and as the key to a map in vinDeliveries

        const vinNum = Number(vin.vin)

        //delete from preloads
        for (let preKey in load.data.preloads) {
            let newVins = []
            for (let vin of load.data.preloads[preKey].vins) {
                if (Number(vin) !== vinNum) { newVins.push(vin) }
            }
            load.data.preloads[preKey].vins = newVins
        }
        //delete from deliveries
        for (let delKey in load.data.deliveries) {
            let newVins = []
            for (let vin of load.data.deliveries[delKey].vins) {
                if (Number(vin) !== vinNum) { newVins.push(vin) }
            }
            load.data.deliveries[delKey].vins = newVins
        }

        //delete actual vin from vinDeliveries
        for (let vinKey in load.data.vinDeliveries) {
            if (Number(vinKey) === vinNum) {
                delete load.data.vinDeliveries[vinKey]
                break;
            }
        }

        try {
            await axios.post('https://4kdavonrj6.execute-api.us-east-1.amazonaws.com/v1/save_load', load)
            await setClickedLoad(null)
            await setClickedVin(null)
            await handleRemount(true)

        } catch (error) {
            console.error("error w vin delete", error)
        }
    }


    return (
        <>
            <h1 className='Search_title'>VINS</h1>
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
                        <div className='HectaSearch_table-header'>
                            <div className='HectaSearch_table-header-val'>Vin Number</div>
                            <div className='HectaSearch_table-header-val'>Load Number</div>
                            <div className='HectaSearch_table-header-val'>Type</div>
                            <div className='HectaSearch_table-header-val'>Color</div>
                            <div className='HectaSearch_table-header-val'>Body</div>
                            <div className='HectaSearch_table-header-val-last'><div className='HectaSearch_table-header-delete'>Delete</div></div>
                        </div>
                        {matchedVins?.map((vin, index) =>
                            <div
                                className={`HectaSearch_table-entry HectaSearch_table-entry-last-${matchedVins.length - 1 === index} Search_table-entry-clicked-${index === clickedDivIndex}`}
                                key={vin.vinInfo.vin_number}
                                onClick={() => {
                                    setClickedVin(vin)
                                    setClickedLoad(loadMap[vin.loadNum])
                                    setClickedDivIndex(index)
                                }}
                                onMouseLeave={() => { setHoveredDeleteIdx(null) }}
                            >
                                <div className='HectaSearch_table-entry-val '>{vin.vinInfo.vin_number}</div>
                                <div className='HectaSearch_table-entry-val '>{vin.loadNum}</div>
                                <div className='HectaSearch_table-entry-val'>{vin.vinInfo.type}</div>
                                <div className='HectaSearch_table-entry-val'>{vin.vinInfo.color}</div>
                                <div className='HectaSearch_table-entry-val'>{vin.vinInfo.body}</div>
                                {/* this is a toggle for the red vs solid svg for trash can */}
                                {hoveredDeleteIdx !== index &&
                                    <div
                                        className='HectaSearch_table-entry-val-last'
                                        onMouseLeave={() => { setHoveredDeleteIdx(null) }}
                                    >
                                        <img className='HectaSearch_table-entry-delete'
                                            onMouseEnter={() => { setHoveredDeleteIdx(index) }}
                                            onMouseLeave={() => { setHoveredDeleteIdx(null) }}
                                            src={deleteImg}>
                                        </img>
                                    </div>
                                }
                                {hoveredDeleteIdx === index &&
                                    <div
                                        className='HectaSearch_table-entry-val-last'
                                        onMouseLeave={() => { setHoveredDeleteIdx(null) }}
                                    >
                                        <img className='HectaSearch_table-entry-delete'
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleDelete(vin, loadMap[vin.loadNum])
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
                !matchedVins?.length &&
                <div className='Search_search-results-wrap'>
                    <div className='Search_search-results-empty'>No vins match the current search criteria</div>
                </div>
            }
        </>
    );
}

export default VinSearch;
