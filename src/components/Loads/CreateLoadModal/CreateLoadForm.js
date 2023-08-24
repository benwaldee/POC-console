import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGeneralContext } from '../../../context/GeneralContext';
import "../../CSS/Field.css"
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { dummyLoad } from '../dummyLoad';

function CreateLoadForm({ handleRemount, setShowCreateForm }) {


    //STATE VARS
    //----------------------------------------------------------------------------------------

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

    const [tabDisplay, setTabDisplay] = useState("loadInfo")
    const [nestedInfo, setNestedInfo] = useState({
        preloads: {},
        deliveries: {},
        vinDeliveries: {}
    })

    //USE EFFECTS
    //-------------------------------------------------------------------------------------------





    //FUNCTIONS
    //-----------------------------------------------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault()

        const createLoad = { data: {} }

        createLoad.data.loadNum = loadNum
        createLoad.data.truckNum = truckNum
        createLoad.data.trailerNum = trailerNum
        createLoad.data.userId = userId
        createLoad.data.loadType = loadType
        createLoad.data.loadTypeDesc = loadTypeDesc
        createLoad.data.nextLoadNum = nextLoadNum
        createLoad.data.prevLoadNum = prevLoadNum
        createLoad.data.shipDate = shipDate
        createLoad.data.estDeliverdate = estDeliverdate
        createLoad.data.shuttleLoad = shuttleLoad
        createLoad.data.shuttleMoveId = shuttleMoveId
        createLoad.data.firstDrop = firstDrop
        createLoad.data.lastDrop = lastDrop
        createLoad.data.nextDispatch = nextDispatch

        createLoad.data.preloads = nestedInfo.preloads
        createLoad.data.deliveries = nestedInfo.deliveries
        createLoad.data.vinDeliveries = nestedInfo.deliveries


        try {

            await axios.post('https://4kdavonrj6.execute-api.us-east-1.amazonaws.com/v1/upload_load', createLoad)
            await axios.post('https://4kdavonrj6.execute-api.us-east-1.amazonaws.com/v1/save_load', createLoad)
            await handleRemount('created')
            setShowCreateForm(false)

        } catch (error) {
            console.error("error w loads", error)
        }

        return
    }

    const handleDummy = () => {
        setLoadNum(101010)
        setTruckNum(12345)
        setTrailerNum(999)
        setUserId(55555)
        setLoadType("T3 -")
        setLoadTypeDesc("Lorem ipsum")
        setNextLoadNum(1212)
        setPrevLoadNum(5656)
        setShipDate("2023-07-10T16:45:35.808Z")
        setEstDeliverdate("2023-08-14T15:57:31.984Z")
        setShuttleLoad(false)
        setShuttleMoveId(null)
        setFirstDrop("Red")
        setLastDrop("Blue")
        setNextDispatch("Green")

        setNestedInfo(dummyLoad)
    }



    return (
        <div className="Field_editForm-outer-wrap">

            <div className='Field_create-subtitle'>Create new load</div>
            <div className='Field_create-tabs'>
                <div className={`Field_display-button Field_create-tab-option Field_display-button-blue Field_create-tab-option-selected-${tabDisplay === "loadInfo"}`}
                    onClick={() => {
                        setTabDisplay("loadInfo")
                    }}
                >Load Info</div>
                <div className={`Field_display-button-blue Field_create-tab-option Field_display-button Field_create-tab-option-selected-${tabDisplay === "nestedInfo"}`}
                    onClick={() => {
                        setTabDisplay("nestedInfo")
                    }}
                >Nested Info</div>

            </div>
            {tabDisplay === 'loadInfo' && <div className='Field_editForm-data-wrap'>
                <label className='Field_edit-label' htmlFor="loadNum">loadNum</label>
                <input
                    id="loadNum"
                    className='Field_edit-input'
                    type='number'
                    value={loadNum}
                    onChange={(e) => setLoadNum(e.target.value)}
                ></input>
                <label className='Field_edit-label' htmlFor="truckNum">truckNum</label>
                <input
                    id="truckNum"
                    className='Field_edit-input'
                    type='number'
                    value={truckNum}
                    onChange={(e) => setTruckNum(e.target.value)}
                ></input>
                <label className='Field_edit-label' htmlFor="trailerNum">trailerNum</label>
                <input
                    id="trailerNum"
                    className='Field_edit-input'
                    type='number'
                    value={trailerNum}
                    onChange={(e) => setTrailerNum(e.target.value)}
                ></input>
                <label className='Field_edit-label' htmlFor="userId">userId</label>
                <input
                    id="userId"
                    className='Field_edit-input'
                    type='number'
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                ></input>
                <label className='Field_edit-label' htmlFor="loadType">loadType</label>
                <input
                    id="loadType"
                    className='Field_edit-input'
                    type='text'
                    value={loadType}
                    onChange={(e) => setLoadType(e.target.value)}
                ></input>
                <label className='Field_edit-label' htmlFor="loadTypeDesc">loadTypeDesc</label>
                <input
                    id="loadTypeDesc"
                    className='Field_edit-input'
                    type='text'
                    value={loadTypeDesc}
                    onChange={(e) => setLoadTypeDesc(e.target.value)}
                ></input>
                <label className='Field_edit-label' htmlFor="nextLoadNum">nextLoadNum</label>
                <input
                    id="nextLoadNum"
                    className='Field_edit-input'
                    type='number'
                    value={nextLoadNum}
                    onChange={(e) => setNextLoadNum(e.target.value)}
                ></input>
                <label className='Field_edit-label' htmlFor="prevLoadNum">prevLoadNum</label>
                <input
                    id="prevLoadNum"
                    className='Field_edit-input'
                    type='number'
                    value={prevLoadNum}
                    onChange={(e) => setPrevLoadNum(e.target.value)}
                ></input>
                <label className='Field_edit-label' htmlFor="shipDate">shipDate</label>
                <input
                    id="shipDate"
                    className='Field_edit-input'
                    type='text'
                    value={shipDate}
                    onChange={(e) => setShipDate(e.target.value)}
                ></input>
                <label className='Field_edit-label' htmlFor="estDeliverdate">estDeliverdate</label>
                <input
                    id="estDeliverdate"
                    className='Field_edit-input'
                    type='text'
                    value={estDeliverdate}
                    onChange={(e) => setEstDeliverdate(e.target.value)}
                ></input>
                <label className='Field_edit-label' htmlFor="shuttleLoad">shuttleLoad</label>
                <input
                    id="shuttleLoad"
                    className='Field_edit-check'
                    type='checkbox'
                    checked={shuttleLoad}
                    onChange={() => setShuttleLoad(!shuttleLoad)}
                ></input>
                <label className='Field_edit-label' htmlFor="shuttleMoveId">shuttleMoveId</label>
                <input
                    id="shuttleMoveId"
                    className='Field_edit-input'
                    type='text'
                    value={shuttleMoveId}
                    onChange={(e) => setShuttleMoveId(e.target.value)}
                ></input>
                <label className='Field_edit-label' htmlFor="firstDrop">firstDrop</label>
                <input
                    id="firstDrop"
                    className='Field_edit-input'
                    type='text'
                    value={firstDrop}
                    onChange={(e) => setFirstDrop(e.target.value)}
                ></input>
                <label className='Field_edit-label' htmlFor="lastDrop">lastDrop</label>
                <input
                    id="lastDrop"
                    className='Field_edit-input'
                    type='text'
                    value={lastDrop}
                    onChange={(e) => setLastDrop(e.target.value)}
                ></input>
                <label className='Field_edit-label' htmlFor="nextDispatch">nextDispatch</label>
                <input
                    id="nextDispatch"
                    className='Field_edit-input'
                    type='text'
                    value={nextDispatch}
                    onChange={(e) => setNextDispatch(e.target.value)}
                ></input>

            </div>}
            {tabDisplay === "nestedInfo" &&
                <div className='Field_create-json-wrap'>
                    <JSONInput
                        id='a_unique_id'
                        locale={locale}
                        height='600px'
                        placeholder={nestedInfo}
                        onChange={(e) => {
                            setNestedInfo(e.jsObject)
                        }}
                    />
                </div>
            }
            <div className='Field_create-button-wrap'>
                <button
                    className='Field_create-button'
                    onClick={handleSubmit}
                > Create new load</button>
                <button
                    className='Field_dummy-button'
                    onClick={handleDummy}
                > Dummy</button>
            </div>
        </div >
    );

}

export default CreateLoadForm;
