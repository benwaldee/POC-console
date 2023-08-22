import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGeneralContext } from '../../context/GeneralContext';
import "../CSS/Field.css"

function CreateLoadForm({ handleRemount }) {

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

    //USE EFFECTS
    //-------------------------------------------------------------------------------------------





    //FUNCTIONS
    //-----------------------------------------------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault()

        //deep copy object
        const editLoad = {}

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



        // hit save load with axios
        // THEN hit flag load with axios
        try {

            await axios.post('https://4kdavonrj6.execute-api.us-east-1.amazonaws.com/v1/save_load', editLoad)
            await handleRemount('created')

        } catch (error) {
            console.error("error w loads", error)
        }

        return
    }




    return (
        <div className="Field_editForm-outer-wrap">

            <form className='Field_editForm' onSubmit={handleSubmit}>

                <div className='Field_editForm-data-subtitle'>Create new load</div>
                <div className='Field_editForm-data-wrap'>
                    <label className='Field_edit-label' htmlFor="loadNum">loadNum</label>
                    <input
                        disabled
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

                </div>
                <button
                    className='Field_edit_save'
                    type='submit'
                > Save changes</button>
            </form>
        </div >
    );

}

export default CreateLoadForm;
