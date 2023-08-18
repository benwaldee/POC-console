import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGeneralContext } from '../../context/GeneralContext';
import "../CSS/Search.css"
import "../CSS/HectaSearch.css"
import deleteImg from "../images/trash-can-solid.svg"
import deleteImgRed from "../images/trash-can-red.svg"


function DeliverySearch({ remountParent, handleRemount }) {

    //STATE VARS
    //------------------------------------------------------------------------------------------------------------
    const [search, setSearch] = useState("")
    const [matchedDeliveries, setMatchedDeliveries] = useState([])
    const [displaySearchResults, setDisplaySearchResults] = useState(false)
    const [clickedDivIndex, setClickedDivIndex] = useState(null)
    const [hoveredDeleteIdx, setHoveredDeleteIdx] = useState(null)


    //map for quick access to deliveries via load number
    const [deliveryMap, setDeliveryMap] = useState(null)

    //map for access to load when delivery is clicked
    const [loadMap, setLoadMap] = useState(null)

    const { setClickedDelivery } = useGeneralContext()
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
            const tempDeliveryMap = {}
            for (let load of loadArr) {
                tempDeliveryMap[load.data.loadNum] = Object.values(load.data.deliveries)
            }

            //attach load numbers to deliveries for later use
            for (let loadNum in tempDeliveryMap) {
                for (let delivery of tempDeliveryMap[loadNum]) {
                    delivery["loadNum"] = loadNum
                }
            }
            setDeliveryMap(tempDeliveryMap)


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
        setMatchedDeliveries(null)
        setDisplaySearchResults(false)
        setClickedDivIndex(null)
        setClickedDelivery(null)
        setClickedLoad(null)

    }, [remountParent])

    //FUNCTIONS
    //-----------------------------------------------------------------------------------------------------------

    //search function that will return everything with the % keyword
    // will match a search if the load number begins with the search input
    const searchLoads = (searchStr) => {
        if (deliveryMap) {
            const tempDeliveryMap = JSON.parse(JSON.stringify(deliveryMap))
            let tempMatchedDeliveries = []

            if (searchStr === "%") {
                for (let loadNum in tempDeliveryMap) {
                    tempMatchedDeliveries = [...tempMatchedDeliveries, ...tempDeliveryMap[loadNum]]
                }
                setMatchedDeliveries(tempMatchedDeliveries)
                return
            }

            for (let loadNum in tempDeliveryMap) {
                if (String(loadNum).startsWith(searchStr)) {
                    tempMatchedDeliveries = [...tempMatchedDeliveries, ...tempDeliveryMap[loadNum]]
                }
            }

            setMatchedDeliveries(tempMatchedDeliveries)
            return
        } else { return }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setDisplaySearchResults(true)
        }
    };

    const handleDelete = async (delivery, load) => {
        // console.log(delivery)
        // console.log(load)
        // return
        //delete delivery from load - may add fxn to delete all associated vins as well
        const deliveryKey = `${delivery.dealer.customerNumber}-${delivery.dealer.mfg}`
        delete load.data.deliveries[deliveryKey]

        try {
            await axios.post('https://4kdavonrj6.execute-api.us-east-1.amazonaws.com/v1/save_load', load)
            await setClickedLoad(null)
            await setClickedDelivery(null)
            await handleRemount(true)

        } catch (error) {
            console.error("error w delivery delete", error)
        }
    }


    return (
        <>
            <h1 className='Search_title'>DELIVERIES</h1>
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
                            <div className='HectaSearch_table-header-val'>Load Number</div>
                            <div className='HectaSearch_table-header-val'>Customer Number</div>
                            <div className='HectaSearch_table-header-val'>Dealer</div>
                            <div className='HectaSearch_table-header-val'>Ship Date</div>
                            <div className='HectaSearch_table-header-val'>Delivery Date</div>
                            <div className='HectaSearch_table-header-val-last'><div className='HectaSearch_table-header-delete'>Delete</div></div>
                        </div>
                        {matchedDeliveries?.map((delivery, index) =>
                            <div
                                className={`HectaSearch_table-entry HectaSearch_table-entry-last-${matchedDeliveries.length - 1 === index} Search_table-entry-clicked-${index === clickedDivIndex}`}
                                key={`${delivery.dealer.customerNumber}-${delivery.dealer.mfg}-${delivery.loadNum}`}
                                onClick={() => {
                                    setClickedDelivery(delivery)
                                    setClickedLoad(loadMap[delivery.loadNum])
                                    setClickedDivIndex(index)
                                }}
                                onMouseLeave={() => { setHoveredDeleteIdx(null) }}
                            >
                                <div className='HectaSearch_table-entry-val '>{delivery.loadNum}</div>
                                <div className='HectaSearch_table-entry-val'>{delivery.dealer.customerNumber}</div>
                                <div className='HectaSearch_table-entry-val'>{delivery.dealer.customerName}</div>
                                <div className='HectaSearch_table-entry-val'>{delivery.shipDate}</div>
                                <div className='HectaSearch_table-entry-val'>{delivery.estDeliverDate}</div>
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
                                                handleDelete(delivery, loadMap[delivery.loadNum])
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
                !matchedDeliveries?.length &&
                <div className='Search_search-results-wrap'>
                    <div className='Search_search-results-empty'>No deliveries match the current search criteria</div>
                </div>
            }




        </>


    );



}

export default DeliverySearch;
