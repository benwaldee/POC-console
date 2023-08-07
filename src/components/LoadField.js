import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGeneralContext } from '../context/GeneralContext';
import "./CSS/LoadField.css"

function LoadField() {

    //STATE VARS
    //----------------------------------------------------------------------------------------
    const [displayJSON, setDisplayJSON] = useState(true)
    const { clickedLoad } = useGeneralContext()

    //form vars
    //flags
    const [tabletDownloadStatus, setTabletDownloadStatus] = useState("")
    const [preloadsReady, setPreloadsReady] = useState("")
    const [deliveriesReady, setDeliveriesReady] = useState("")
    const [preloadNotesReady, setPreloadNotesReady] = useState("")
    const [deliveryNotesReady, setDeliveryNotesReady] = useState("")
    const [uploadTime, setUploadTime] = useState("")
    const [uploadVersion, setUploadVersion] = useState("")
    const [updateTime, setUpdateTime] = useState("")
    const [tabletDownloadTime, setTabletDownloadTime] = useState("")
    //data
    const [loadNum, setLoadNum] = useState("")
    const [truckNum, setTruckNum] = useState("")
    const [trailerNum, setTrailerNum] = useState("")
    const [userId, setUserId] = useState("")
    const [loadType, setLoadType] = useState("")
    const [loadTypeDesc, setLoadTypeDesc] = useState("")
    const [nextLoadNum, setNextLoadNum] = useState("")
    const [prevLoadNum, setPrevLoadNum] = useState("")
    const [shipDate, setShipDate] = useState("")
    const [estDeliverdate, setEstDeliverdate] = useState("")
    const [shuttleLoad, setShuttleLoad] = useState("")
    const [shuttleMoveId, setShuttleMoveId] = useState("")
    const [firstDrop, setFirstDrop] = useState("")
    const [lastDrop, setLastDrop] = useState("")
    const [nextDispatch, setNextDispatch] = useState("")

    //USE EFFECTS
    //-------------------------------------------------------------------------------------------

    useEffect(() => {
        if (clickedLoad) {
            //flags
            setTabletDownloadStatus(clickedLoad.flags.tabletDownloadStatus)
            setPreloadsReady(clickedLoad.flags.preloadsReady)
            setDeliveriesReady(clickedLoad.flags.deliveriesReady)
            setPreloadNotesReady(clickedLoad.flags.preloadNotesReady)
            setDeliveryNotesReady(clickedLoad.flags.deliveryNotesReady)
            setUploadTime(clickedLoad.flags.uploadTime)
            setUploadVersion(clickedLoad.flags.uploadVersion)
            setUpdateTime(clickedLoad.flags.updateTime)
            setTabletDownloadTime(clickedLoad.flags.tabletDownloadTime)
            //data
            setLoadNum(clickedLoad.data.loadNum)
            setTruckNum(clickedLoad.data.truckNum)
            setTrailerNum(clickedLoad.data.trailerNum)
            setUserId(clickedLoad.data.userId)
            setLoadType(clickedLoad.data.loadType)
            setLoadTypeDesc(clickedLoad.data.loadTypeDesc)
            setNextLoadNum(clickedLoad.data.nextLoadNum)
            setPrevLoadNum(clickedLoad.data.prevLoadNum)
            setShipDate(clickedLoad.data.shipDate)
            setEstDeliverdate(clickedLoad.data.estDeliverdate)
            setShuttleLoad(clickedLoad.data.shuttleLoad)
            setShuttleMoveId(clickedLoad.data.shuttleMoveId)
            setFirstDrop(clickedLoad.data.firstDrop)
            setLastDrop(clickedLoad.data.lastDrop)
            setNextDispatch(clickedLoad.data.nextDispatch)
        }

    }, [clickedLoad])

    //FUNCTIONS
    //-----------------------------------------------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault()

        //deep copy object
        const editLoad = JSON.parse(JSON.stringify(clickedLoad))

        editLoad.flags.tabletDownloadStatus = Number(tabletDownloadStatus)
        editLoad.flags.preloadsReady = preloadsReady
        editLoad.flags.deliveriesReady = deliveriesReady
        editLoad.flags.preloadNotesReady = preloadNotesReady
        editLoad.flags.deliveryNotesReady = deliveryNotesReady
        editLoad.flags.uploadTime = uploadTime
        editLoad.flags.uploadVersion = uploadVersion
        editLoad.flags.updateTime = updateTime
        editLoad.flags.tabletDownloadTime = tabletDownloadTime
        editLoad.data.loadNum = loadNum
        editLoad.data.truckNum = truckNum
        editLoad.data.trailerNum = trailerNum
        editLoad.data.userId = userId
        editLoad.data.loadType = loadType
        editLoad.data.loadTypeDesc = loadTypeDesc
        editLoad.data.nextLoadNum = nextLoadNum
        editLoad.data.prevLoadNum = prevLoadNum
        editLoad.data.shipDate = shipDate
        editLoad.data.estDeliverdate = estDeliverdate
        editLoad.data.shuttleLoad = shuttleLoad
        editLoad.data.shuttleMoveId = shuttleMoveId
        editLoad.data.firstDrop = firstDrop
        editLoad.data.lastDrop = lastDrop
        editLoad.data.nextDispatch = nextDispatch

        delete editLoad._id

        //secure flag load
        const editLoadFlag = JSON.parse(JSON.stringify(editLoad))

        delete editLoad.flags

        //hit save load with axios
        //THEN hit flag load with axios
        // try {

        //     await axios.post('https://kek6x29n3i.execute-api.us-east-1.amazonaws.com/save_load', editLoad)
        //     await axios.post('https://kek6x29n3i.execute-api.us-east-1.amazonaws.com/set_load_flags', editLoadFlag)

        // } catch (error) {
        //     console.error("error w loads", error)
        // }

        // console.log(editLoad)
        console.log(editLoadFlag)



        return
    }



    return (
        <>

            <button
                className="LoadField-JSON-button"
                onClick={() => setDisplayJSON(true)}
            >JSON</button>
            <button
                className="LoadField-edit-button"
                onClick={() => setDisplayJSON(false)}
            >Edit</button>
            {displayJSON && clickedLoad &&
                <pre className="LoadField-JSON-pre">
                    {JSON.stringify(clickedLoad, null, 2)}
                </pre>
            }
            {!displayJSON && clickedLoad &&
                <div className="LoadField-editForm-outer-wrap">

                    <form className='LoadField-editForm' onSubmit={handleSubmit}>
                        <div className='LoadField-editForm-title'>Edit load</div>
                        <div className='LoadField-editForm-flags-subtitle'>Flags</div>
                        <div className='LoadField-editForm-flags-wrap'>
                            <label htmlFor="tabletDownloadStatus">tabletDownloadStatus</label>
                            <select
                                id="tabletDownloadStatus"
                                className='LoadField-edit-input'
                                type='text'
                                value={tabletDownloadStatus}
                                onChange={(e) => setTabletDownloadStatus(e.target.value)}
                            >
                                {tabletDownloadStatus === 0 && <option value={0} selected>new</option>}
                                {tabletDownloadStatus !== 0 && <option value={0} >new</option>}
                                {tabletDownloadStatus === 1 && <option value={1} selected>ready</option>}
                                {tabletDownloadStatus !== 1 && <option value={1} >ready</option>}
                                {tabletDownloadStatus === 2 && <option value={2} selected>downloaded</option>}
                                {tabletDownloadStatus !== 2 && <option value={2} >downloaded</option>}
                            </select>
                            <label htmlFor="preloadsReady">preloadsReady</label>
                            <input
                                id="preloadsReady"
                                className='LoadField-edit-input'
                                type='checkbox'
                                checked={preloadsReady}
                                onChange={() => setPreloadsReady(!preloadsReady)}
                            ></input>
                            <label htmlFor="deliveriesReady">deliveriesReady</label>
                            <input
                                id="deliveriesReady"
                                className='LoadField-edit-input'
                                type='checkbox'
                                checked={deliveriesReady}
                                onChange={() => setDeliveriesReady(!deliveriesReady)}
                            ></input>
                            <label htmlFor="preloadNotesReady">preloadNotesReady</label>
                            <input
                                id="preloadNotesReady"
                                className='LoadField-edit-input'
                                type='checkbox'
                                checked={preloadNotesReady}
                                onChange={() => setPreloadNotesReady(!preloadNotesReady)}
                            ></input>
                            <label htmlFor="deliveryNotesReady">deliveryNotesReady</label>
                            <input
                                id="deliveryNotesReady"
                                className='LoadField-edit-input'
                                type='checkbox'
                                checked={deliveryNotesReady}
                                onChange={() => setDeliveryNotesReady(!deliveryNotesReady)}
                            ></input>
                            <label htmlFor="uploadTime">uploadTime</label>
                            <input
                                id="uploadTime"
                                className='LoadField-edit-input'
                                type='text'
                                value={uploadTime}
                                onChange={(e) => setUploadTime(e.target.value)}
                            ></input>
                            <label htmlFor="uploadVersion">uploadVersion</label>
                            <input
                                id="uploadVersion"
                                className='LoadField-edit-input'
                                type='text'
                                value={uploadVersion}
                                onChange={(e) => setUploadVersion(e.target.value)}
                            ></input>
                            <label htmlFor="updateTime">updateTime</label>
                            <input
                                id="updateTime"
                                className='LoadField-edit-input'
                                type='text'
                                value={updateTime}
                                onChange={(e) => setUpdateTime(e.target.value)}
                            ></input>
                            <label htmlFor="tabletDownloadTime">tabletDownloadTime</label>
                            <input
                                id="tabletDownloadTime"
                                className='LoadField-edit-input'
                                type='text'
                                value={tabletDownloadTime}
                                onChange={(e) => setTabletDownloadTime(e.target.value)}
                            ></input>
                        </div>
                        <div className='LoadField-editForm-data'>Data</div>
                        <div className='LoadField-editForm-data-wrap'>
                            <label htmlFor="loadNum">loadNum</label>
                            <input
                                id="loadNum"
                                className='LoadField-edit-input'
                                type='number'
                                value={loadNum}
                                onChange={(e) => setLoadNum(e.target.value)}
                            ></input>
                            <label htmlFor="truckNum">truckNum</label>
                            <input
                                id="truckNum"
                                className='LoadField-edit-input'
                                type='number'
                                value={truckNum}
                                onChange={(e) => setTruckNum(e.target.value)}
                            ></input>
                            <label htmlFor="trailerNum">trailerNum</label>
                            <input
                                id="trailerNum"
                                className='LoadField-edit-input'
                                type='number'
                                value={trailerNum}
                                onChange={(e) => setTrailerNum(e.target.value)}
                            ></input>
                            <label htmlFor="userId">userId</label>
                            <input
                                id="userId"
                                className='LoadField-edit-input'
                                type='number'
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            ></input>
                            <label htmlFor="loadType">loadType</label>
                            <input
                                id="loadType"
                                className='LoadField-edit-input'
                                type='text'
                                value={loadType}
                                onChange={(e) => setLoadType(e.target.value)}
                            ></input>
                            <label htmlFor="loadTypeDesc">loadTypeDesc</label>
                            <input
                                id="loadTypeDesc"
                                className='LoadField-edit-input'
                                type='text'
                                value={loadTypeDesc}
                                onChange={(e) => setLoadTypeDesc(e.target.value)}
                            ></input>
                            <label htmlFor="nextLoadNum">nextLoadNum</label>
                            <input
                                id="nextLoadNum"
                                className='LoadField-edit-input'
                                type='number'
                                value={nextLoadNum}
                                onChange={(e) => setNextLoadNum(e.target.value)}
                            ></input>
                            <label htmlFor="prevLoadNum">prevLoadNum</label>
                            <input
                                id="prevLoadNum"
                                className='LoadField-edit-input'
                                type='number'
                                value={prevLoadNum}
                                onChange={(e) => setPrevLoadNum(e.target.value)}
                            ></input>
                            <label htmlFor="shipDate">shipDate</label>
                            <input
                                id="shipDate"
                                className='LoadField-edit-input'
                                type='text'
                                value={shipDate}
                                onChange={(e) => setShipDate(e.target.value)}
                            ></input>
                            <label htmlFor="estDeliverdate">estDeliverdate</label>
                            <input
                                id="estDeliverdate"
                                className='LoadField-edit-input'
                                type='text'
                                value={estDeliverdate}
                                onChange={(e) => setEstDeliverdate(e.target.value)}
                            ></input>
                            <label htmlFor="shuttleLoad">shuttleLoad</label>
                            <input
                                id="shuttleLoad"
                                className='LoadField-edit-input'
                                type='checkbox'
                                checked={shuttleLoad}
                                onChange={() => setShuttleLoad(!shuttleLoad)}
                            ></input>
                            <label htmlFor="shuttleMoveId">shuttleMoveId</label>
                            <input
                                id="shuttleMoveId"
                                className='LoadField-edit-input'
                                type='text'
                                value={shuttleMoveId}
                                onChange={(e) => setShuttleMoveId(e.target.value)}
                            ></input>
                            <label htmlFor="firstDrop">firstDrop</label>
                            <input
                                id="firstDrop"
                                className='LoadField-edit-input'
                                type='text'
                                value={firstDrop}
                                onChange={(e) => setFirstDrop(e.target.value)}
                            ></input>
                            <label htmlFor="lastDrop">lastDrop</label>
                            <input
                                id="lastDrop"
                                className='LoadField-edit-input'
                                type='text'
                                value={lastDrop}
                                onChange={(e) => setLastDrop(e.target.value)}
                            ></input>
                            <label htmlFor="nextDispatch">nextDispatch</label>
                            <input
                                id="nextDispatch"
                                className='LoadField-edit-input'
                                type='text'
                                value={nextDispatch}
                                onChange={(e) => setNextDispatch(e.target.value)}
                            ></input>
                            <button
                                type='submit'
                            > Save changes</button>
                        </div>
                    </form>
                </div>
            }

        </>
    );

}

export default LoadField;
