import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGeneralContext } from '../context/GeneralContext';



function LoadSearch() {

    //STATE VARS
    //-------------------------------------------------------------------------------------------------
    const [loadArr, setLoadArr] = useState(null)
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("")
    const [matchedLoads, setMatchedLoads] = useState([])
    const [displaySearchResults, setDisplaySearchResults] = useState(false)
    const { setClickedLoad } = useGeneralContext()

    //USE EFFECTS
    //--------------------------------------------------------------------------------------------------------------
    useEffect(() => {

        const fetchLoads = async () => {
            try {

                const loads = await axios.get('https://kek6x29n3i.execute-api.us-east-1.amazonaws.com/all')
                setLoadArr(loads.data.loadArr)
                setLoading(true)

            } catch (error) {
                console.error("error w loads", error)
            }
        }

        fetchLoads()

    }, [])

    useEffect(() => {
        loading && displaySearchResults && searchLoads(search)
    }, [displaySearchResults])

    //FUNCTIONS
    //-----------------------------------------------------------------------------------------------------------

    //search function that will return everything with the % keyword
    // will match a search if the load number begins with the search input
    const searchLoads = (searchStr) => {

        if (searchStr === "%") {
            setMatchedLoads(loadArr)
            setDisplaySearchResults(true)
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
        setDisplaySearchResults(true)
        return
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Call the function you want to trigger on Enter key press
            // For example, perform a search here
            setDisplaySearchResults(true)
        }
    };


    return (
        <>
            <input
                type='text'
                value={search}
                onChange={(e) => {
                    setDisplaySearchResults(false)
                    setSearch(e.target.value)
                }}
                placeholder='Load Number'
                maxLength={50}
                onKeyDown={handleKeyPress}
            ></input>
            <button
                onClick={() => {
                    setDisplaySearchResults(true)
                }}
            >Search</button>
            <div className='LoadSearch_search-results-wrap'>
                {loading && search && displaySearchResults && matchedLoads.map((load) =>
                    <div
                        className='LoadSearch_one-load'
                        key={load.data.loadNum}
                        onClick={() => {
                            setClickedLoad(load)
                        }}
                    > {load.data.loadNum}</div>

                )}
            </div>



        </>


    );



}

export default LoadSearch;
