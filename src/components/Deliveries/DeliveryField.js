import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGeneralContext } from '../../context/GeneralContext';
import "../CSS/Field.css"

function DeliveryField({ handleRemount }) {

    //STATE VARS
    //----------------------------------------------------------------------------------------
    const [display, setDisplay] = useState("TABLE")
    const { clickedDelivery, setClickedDelivery } = useGeneralContext()
    const { clickedLoad } = useGeneralContext()


    //data
    const [shipDate, setShipDate] = useState("")
    const [estDeliverDate, setEstDeliverDate] = useState("")
    const [driverSignature, setDriverSignature] = useState("")
    const [driverSignatureSignedAt, setDriverSignatureSignedAt] = useState("")
    const [driverContact, setDriverContact] = useState("")
    const [dealerSignature, setDealerSignature] = useState("")
    const [dealerSignatureSignedat, setDealerSignatureSignedat] = useState("")
    const [dealerComment, setDealerComment] = useState("")
    const [driverComment, setDriverComment] = useState("")
    const [sti, setSti] = useState("")
    const [dockTerm, setDockTerm] = useState("")
    const [tabletDownloadStatus, setTabletDownloadStatus] = useState()

    //USE EFFECTS
    //-------------------------------------------------------------------------------------------

    useEffect(() => {
        if (clickedDelivery && clickedLoad) {


            setShipDate(clickedDelivery.shipDate)
            setEstDeliverDate(clickedDelivery.estDeliverDate)
            setDriverSignature(clickedDelivery.driverSignature)
            setDriverSignatureSignedAt(clickedDelivery.driverSignatureSignedAt)
            setDriverContact(clickedDelivery.driverContact)
            setDealerSignature(clickedDelivery.dealerSignature)
            setDealerSignatureSignedat(clickedDelivery.dealerSignatureSignedat)
            setDealerComment(clickedDelivery.dealerComment)
            setDriverComment(clickedDelivery.driverComment)
            setSti(Boolean(clickedDelivery.sti))
            setDockTerm(Number(clickedDelivery.dockTerm))
            setTabletDownloadStatus(clickedLoad.flags.tabletDownloadStatus)
        }

    }, [clickedDelivery])

    //FUNCTIONS
    //-----------------------------------------------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault()

        //deep copy object
        const editLoad = JSON.parse(JSON.stringify(clickedLoad))

        const deliveryKey = `${clickedDelivery.dealer.customerNumber}-${clickedDelivery.dealer.mfg}`

        editLoad.data.deliveries[deliveryKey].shipDate = shipDate
        editLoad.data.deliveries[deliveryKey].estDeliverDate = estDeliverDate
        editLoad.data.deliveries[deliveryKey].driverSignature = driverSignature
        editLoad.data.deliveries[deliveryKey].driverSignatureSignedAt = driverSignatureSignedAt
        editLoad.data.deliveries[deliveryKey].driverContact = driverContact
        editLoad.data.deliveries[deliveryKey].dealerSignature = dealerSignature
        editLoad.data.deliveries[deliveryKey].dealerSignatureSignedat = dealerSignatureSignedat
        editLoad.data.deliveries[deliveryKey].dealerComment = dealerComment
        editLoad.data.deliveries[deliveryKey].driverComment = driverComment
        editLoad.data.deliveries[deliveryKey].sti = sti
        editLoad.data.deliveries[deliveryKey].dockTerm = dockTerm
        editLoad.flags.tabletDownloadStatus = tabletDownloadStatus


        delete editLoad._id

        //secure flag load
        const editLoadFlag = JSON.parse(JSON.stringify(editLoad))

        delete editLoad.flags

        // hit save load with axios
        // THEN hit flag load with axios
        try {

            await axios.post('https://4kdavonrj6.execute-api.us-east-1.amazonaws.com/v1/save_load', editLoad)
            await axios.post('https://4kdavonrj6.execute-api.us-east-1.amazonaws.com/v1/set_load_flags', editLoadFlag)
            await setClickedDelivery(null)
            await handleRemount()

        } catch (error) {
            console.error("error w loads", error)
            console.log("editLoad:        ", editLoad)
            console.log("editLoadFlag:    ", editLoadFlag)
        }

        return
    }

    const returnVinString = (vinArr) => {
        let res = ''
        for (let vin of vinArr) {
            res += `${String(vin)}, `
        }
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
            {display === "JSON" && clickedDelivery &&
                <pre className="Field_JSON-pre">
                    {JSON.stringify(clickedDelivery, null, 2)}
                </pre>
            }
            {display === "EDIT" && clickedDelivery &&
                <div className="Field_editForm-outer-wrap">

                    <form className='Field_editForm' onSubmit={handleSubmit}>
                        <div className='Field_editForm-data-subtitle'>Delivery</div>
                        <div className='Field_editForm-data-wrap'>
                            <label className='Field_edit-label' htmlFor="shipDate">shipDate</label>
                            <input
                                id="shipDate"
                                className='Field_edit-input'
                                type='text'
                                value={shipDate}
                                onChange={(e) => setShipDate(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="estDeliverDate">estDeliverDate</label>
                            <input
                                id="estDeliverDate"
                                className='Field_edit-input'
                                type='text'
                                value={estDeliverDate}
                                onChange={(e) => setEstDeliverDate(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="driverSignature">driverSignature</label>
                            <input
                                id="driverSignature"
                                className='Field_edit-input'
                                type='text'
                                value={driverSignature}
                                onChange={(e) => setDriverSignature(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="driverSignatureSignedAt">driverSignatureSignedAt</label>
                            <input
                                id="driverSignatureSignedAt"
                                className='Field_edit-input'
                                type='text'
                                value={driverSignatureSignedAt}
                                onChange={(e) => setDriverSignatureSignedAt(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="driverContact">driverContact</label>
                            <input
                                id="driverContact"
                                className='Field_edit-input'
                                type='text'
                                value={driverContact}
                                onChange={(e) => setDriverContact(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="dealerSignature">dealerSignature</label>
                            <input
                                id="dealerSignature"
                                className='Field_edit-input'
                                type='text'
                                value={dealerSignature}
                                onChange={(e) => setDealerSignature(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="dealerSignatureSignedat">dealerSignatureSignedat</label>
                            <input
                                id="dealerSignatureSignedat"
                                className='Field_edit-input'
                                type='text'
                                value={dealerSignatureSignedat}
                                onChange={(e) => setDealerSignatureSignedat(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="dealerComment">dealerComment</label>
                            <input
                                id="dealerComment"
                                className='Field_edit-input'
                                type='text'
                                value={dealerComment}
                                onChange={(e) => setDealerComment(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="driverComment">driverComment</label>
                            <input
                                id="driverComment"
                                className='Field_edit-input'
                                type='text'
                                value={driverComment}
                                onChange={(e) => setDriverComment(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="sti">sti</label>
                            <input
                                id="sti"
                                className='Field_edit-input'
                                type='checkbox'
                                checked={sti}
                                onChange={() => setSti(!sti)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="dockTerm">dockTerm</label>
                            <input
                                id="dockTerm"
                                className='Field_edit-check'
                                type='number'
                                value={dockTerm}
                                onChange={(e) => setDockTerm(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="tabletDownloadStatus">tabletDownloadStatus</label>
                            <select
                                id="tabletDownloadStatus"
                                className='Field_edit-select'
                                type='text'
                                value={tabletDownloadStatus}
                                onChange={(e) => setTabletDownloadStatus(e.target.value)}
                                defaultValue={Number(tabletDownloadStatus)}
                            >
                                <option value={0} >new</option>
                                <option value={1} >ready</option>
                                <option value={2} >downloaded</option>
                            </select>

                        </div>
                        <button
                            className='Field_edit_save'
                            type='submit'
                        > Save changes</button>
                    </form>
                </div>
            }
            {display === "TABLE" && clickedDelivery &&
                <><div className='Field_table-title'>Delivery Info</div>
                    <div className='Field_table-wrap'>
                        <div className='Field_table-label'>LOAD #</div>
                        <div className='Field_table-item'>{clickedDelivery.loadNum}</div>
                        <div className='Field_table-label'>DEALER</div>
                        <div className='Field_table-item'>{clickedDelivery.dealer.customerName}</div>
                        <div className='Field_table-label'>SHIPPING DATE</div>
                        <div className='Field_table-item'>{clickedDelivery.shipDate}</div>
                        <div className='Field_table-label'>DELIVERY DATE</div>
                        <div className='Field_table-item'>{clickedDelivery.estDeliverDate}</div>
                        <div className='Field_table-label'>VIN LIST</div>
                        <div className='Field_table-item'>{returnVinString(clickedDelivery.vins)}</div>
                        <div className='Field_table-label'>DOCK TERMINAL</div>
                        <div className='Field_table-item'>{clickedDelivery.dockTerm}</div>
                        <div className='Field_table-label'>DRIVER DELIVERY SIGNATURE</div>
                        <div className='Field_table-item'>{clickedDelivery.driverSignature}</div>
                        <div className='Field_table-label'>DRIVER NOTES</div>
                        <div className='Field_table-item'>{clickedDelivery.notes}</div>
                        <div className='Field_table-label'>DEALER DELIVERY SIGNATURE</div>
                        <div className='Field_table-item'>{clickedDelivery.dealerSignature}</div>
                    </div>
                </>
            }
        </div >
    );

}

export default DeliveryField;
