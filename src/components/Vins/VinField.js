import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGeneralContext } from '../../context/GeneralContext';
import "../CSS/Field.css"

function VinField({ handleRemount }) {

    //STATE VARS
    //----------------------------------------------------------------------------------------
    const [display, setDisplay] = useState("TABLE")
    const { clickedVin, setClickedVin } = useGeneralContext()
    const { clickedLoad } = useGeneralContext()


    //data
    const [vinNumber, setVinNumber] = useState("")
    const [body, setBody] = useState("")
    const [weight, setWeight] = useState("")
    const [color, setColor] = useState("")
    const [colorDesc, setColorDesc] = useState("")
    const [type, setType] = useState("")


    //USE EFFECTS
    //-------------------------------------------------------------------------------------------

    useEffect(() => {
        if (clickedVin && clickedLoad) {


            setVinNumber(clickedVin.vin)
            setBody(clickedVin.vinInfo.body)
            setWeight(clickedVin.vinInfo.weight)
            setColor(clickedVin.vinInfo.color)
            setColorDesc(clickedVin.vinInfo.colorDesc)
            setType(clickedVin.vinInfo.type)
        }

    }, [clickedVin])

    //FUNCTIONS
    //-----------------------------------------------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault()

        //deep copy object
        const editLoad = JSON.parse(JSON.stringify(clickedLoad))
        const prevVinNum = clickedVin.vin

        //if they changed the vin number, there is a lot of work to do in the load, lock it for now
        if (Number(prevVinNum) !== Number(vinNumber)) {

            //if they didn't change the vin number, the work is simple
        } else {
            editLoad.data.vinDeliveries[String(vinNumber)].vinInfo.body = body
            editLoad.data.vinDeliveries[String(vinNumber)].vinInfo.weight = weight
            editLoad.data.vinDeliveries[String(vinNumber)].vinInfo.color = color
            editLoad.data.vinDeliveries[String(vinNumber)].vinInfo.colorDesc = colorDesc
            editLoad.data.vinDeliveries[String(vinNumber)].vinInfo.type = type
        }


        //remove tags
        for (let vKey in editLoad.data.vinDeliveries) {
            delete editLoad.data.vinDeliveries[vKey].loadNum
        }

        delete editLoad._id
        delete editLoad.flags

        // hit save load with axios
        try {
            await axios.post('https://4kdavonrj6.execute-api.us-east-1.amazonaws.com/v1/save_load', editLoad)
            await setClickedVin(null)
            await handleRemount()

        } catch (error) {
            console.error("error w loads", error)
            console.log("editLoad:        ", editLoad)
        }

        // console.log(editLoad)
        return
    }

    const prepVinJSON = (vin) => {

        const resVin = {}
        resVin.vinInfo = vin.vinInfo
        resVin.damages = vin.damages
        resVin.images = vin.images

        return JSON.stringify(resVin, null, 2)
    }

    return (
        <div className='Field_outer-wrap'>
            <div className="Field_button-wrap">
                <button
                    className="Field_display-button"
                    onClick={() => setDisplay("TABLE")}
                >Table</button>
                <button
                    className="Field_display-button"
                    onClick={() => setDisplay("JSON")}
                >JSON</button>
                <button
                    className="Field_display-button"
                    onClick={() => setDisplay("EDIT")}
                >Edit</button>
            </div>
            {display === "JSON" && clickedVin &&
                <pre className="Field_JSON-pre">
                    {prepVinJSON(clickedVin)}
                </pre>
            }
            {display === "EDIT" && clickedVin &&
                <div className="Field_editForm-outer-wrap">

                    <form className='Field_editForm' onSubmit={handleSubmit}>
                        <div className='Field_editForm-data-subtitle'>Vin</div>
                        <div className='Field_editForm-data-wrap'>
                            <label className='Field_edit-label' htmlFor="vinNumber">vinNumber</label>
                            <input
                                disabled
                                id="vinNumber"
                                className='Field_edit-input'
                                type='text'
                                value={vinNumber}
                                onChange={(e) => setVinNumber(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="type">type</label>
                            <input
                                id="type"
                                className='Field_edit-input'
                                type='text'
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="color">color</label>
                            <input
                                id="color"
                                className='Field_edit-input'
                                type='text'
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="colorDesc">colorDesc</label>
                            <input
                                id="colorDesc"
                                className='Field_edit-input'
                                type='text'
                                value={colorDesc}
                                onChange={(e) => setColorDesc(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="weight">weight</label>
                            <input
                                id="weight"
                                className='Field_edit-input'
                                type='text'
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="body">body</label>
                            <input
                                id="body"
                                className='Field_edit-input'
                                type='text'
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            ></input>


                        </div>
                        <button
                            className='Field_edit_save'
                            type='submit'
                        > Save changes</button>
                    </form>
                </div>
            }
            {display === "TABLE" && clickedVin &&
                <><div className='Field_table-title'>Vin Info</div>
                    <div className='Field_table-wrap-wide'>
                        <div className='Field_table-label'>LOAD #</div>
                        <div className='Field_table-item'>{clickedVin.loadNum}</div>
                        <div className='Field_table-label'>VIN #</div>
                        <div className='Field_table-item'>{clickedVin.vin}</div>
                        <div className='Field_table-label'>TYPE</div>
                        <div className='Field_table-item'>{clickedVin.vinInfo.type}</div>
                        <div className='Field_table-label'>COLOR</div>
                        <div className='Field_table-item'>{clickedVin.vinInfo.color}</div>
                        <div className='Field_table-label'>COLOR DESCRIPTION</div>
                        <div className='Field_table-item'>{clickedVin.vinInfo.colorDesc}</div>
                        <div className='Field_table-label'>WEIGHT</div>
                        <div className='Field_table-item'>{clickedVin.vinInfo.weight}</div>
                        <div className='Field_table-label'>BODY</div>
                        <div className='Field_table-item'>{clickedVin.vinInfo.body}</div>
                    </div>
                </>
            }
        </div >
    );

}

export default VinField;
