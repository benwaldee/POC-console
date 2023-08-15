import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGeneralContext } from '../../context/GeneralContext';
import "../CSS/Field.css"
import "../CSS/UserField.css"

function UserField() {

    //STATE VARS
    //----------------------------------------------------------------------------------------
    const [display, setDisplay] = useState("TABLE")
    const { clickedUser } = useGeneralContext()


    //data
    const [userId, setUserId] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [userType, setUserType] = useState("")
    const [active, setActive] = useState("")
    const [autoInspectLastDelivery, setAutoInspectLastDelivery] = useState("")
    const [restrictedDispatch, setRestrictedDispatch] = useState("")
    const [highClaims, setHighClaims] = useState("")
    const [requiresAudit, setRequiresAudit] = useState("")
    const [inspectionAccess, setInspectionAccess] = useState("")
    const [supervisorPreloadCheck, setSupervisorPreloadCheck] = useState("")
    const [helpTerm, setHelpTerm] = useState("")
    const [supervisorCardCode, setSupervisorCardCode] = useState("")
    const [driverLicenseExpiration, setDriverLicenseExpiration] = useState("")
    const [medicalCertExpiration, setMedicalCertExpiration] = useState("")

    //USE EFFECTS
    //-------------------------------------------------------------------------------------------

    useEffect(() => {
        if (clickedUser) {
            //data

            setUserId(clickedUser.userId)
            setFirstName(String(clickedUser.firstName))
            setLastName(String(clickedUser.lastName))
            setEmail(String(clickedUser.email))
            setUserType(clickedUser.userType)
            setActive(clickedUser.active)
            setAutoInspectLastDelivery(clickedUser.autoInspectLastDelivery)
            setRestrictedDispatch(clickedUser.restrictedDispatch)
            setHighClaims(clickedUser.highClaims)
            setRequiresAudit(clickedUser.requiresAudit)
            setInspectionAccess(clickedUser.inspectionAccess)
            setSupervisorPreloadCheck(clickedUser.supervisorPreloadCheck)
            setHelpTerm(clickedUser.helpTerm)
            setSupervisorCardCode(clickedUser.supervisorCardCode)
            setDriverLicenseExpiration(clickedUser.driverLicenseExpiration)
            setMedicalCertExpiration(clickedUser.medicalCertExpiration)
        }

    }, [clickedUser])

    //FUNCTIONS
    //-----------------------------------------------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault()

        //deep copy object
        const editUser = JSON.parse(JSON.stringify(clickedUser))

        editUser.userId = Number(userId)
        editUser.firstName = firstName
        editUser.lastName = lastName
        editUser.email = email
        editUser.userType = Number(userType)
        editUser.active = Number(active)
        editUser.autoInspectLastDelivery = Boolean(autoInspectLastDelivery)
        editUser.restrictedDispatch = Boolean(restrictedDispatch)
        editUser.highClaims = Boolean(highClaims)
        editUser.requiresAudit = Boolean(requiresAudit)
        editUser.inspectionAccess = Boolean(inspectionAccess)
        editUser.supervisorPreloadCheck = Boolean(supervisorPreloadCheck)
        editUser.helpTerm = Number(helpTerm)
        editUser.supervisorCardCode = supervisorCardCode
        editUser.driverLicenseExpiration = driverLicenseExpiration
        editUser.medicalCertExpiration = medicalCertExpiration

        delete editUser._id

        // hit edit user  with axios
        try {

            await axios.post('EDIT USER ENDPOINT HERE', editUser)

        } catch (error) {
            console.error("error w edit user", error)
            console.log("editUser:         ", editUser)
        }




        return
    }

    const translateUserType = (num) => {
        if (num == 0) {
            return 'Dealer'
        } else if (num == 1) {
            return 'Driver'
        } else if (num == 2) {
            return 'Admin'
        } else {
            return 'Supervisor'
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
            {display === "JSON" && clickedUser &&
                <pre className="Field_JSON-pre">
                    {JSON.stringify(clickedUser, null, 2)}
                </pre>
            }
            {display === "EDIT" && clickedUser &&
                <div className="Field_editForm-outer-wrap">

                    <form className='Field_editForm' onSubmit={handleSubmit}>
                        <div className='Field_editForm-data-subtitle'>User</div>
                        <div className='Field_editForm-data-wrap'>
                            <label className='Field_edit-label' htmlFor="userId">userId</label>
                            <input
                                id="userId"
                                className='Field_edit-input'
                                type='number'
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="firstName">firstName</label>
                            <input
                                id="firstName"
                                className='Field_edit-input'
                                type='text'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="lastName">lastName</label>
                            <input
                                id="lastName"
                                className='Field_edit-input'
                                type='text'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="email">email</label>
                            <input
                                id="email"
                                className='Field_edit-input'
                                type='text'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="userType">userType</label>
                            <select
                                id="userType"
                                className='Field_edit-select'
                                type='number'
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                                defaultValue={Number(userType)}
                            >
                                <option value={0} >dealer</option>
                                <option value={1} >driver</option>
                                <option value={2} >admin</option>
                                <option value={3} >supervisor</option>

                            </select>
                            <label className='Field_edit-label' htmlFor="active">active</label>
                            <select
                                id="active"
                                className='Field_edit-select'
                                type='text'
                                value={active}
                                onChange={(e) => setActive(e.target.value)}
                                defaultValue={Number(active)}
                            >

                                <option value={0} >inactive</option>
                                <option value={1} >active</option>

                            </select>
                            <label className='Field_edit-label' htmlFor="autoInspectLastDelivery">autoInspectLastDelivery</label>
                            <input
                                id="autoInspectLastDelivery"
                                className='Field_edit-check'
                                type='checkbox'
                                value={autoInspectLastDelivery}
                                onChange={() => setAutoInspectLastDelivery(!autoInspectLastDelivery)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="restrictedDispatch">restrictedDispatch</label>
                            <input
                                id="restrictedDispatch"
                                className='Field_edit-check'
                                type='checkbox'
                                value={restrictedDispatch}
                                onChange={() => setRestrictedDispatch(!restrictedDispatch)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="highClaims">highClaims</label>
                            <input
                                id="highClaims"
                                className='Field_edit-check'
                                type='checkbox'
                                value={highClaims}
                                onChange={() => setHighClaims(!highClaims)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="requiresAudit">requiresAudit</label>
                            <input
                                id="requiresAudit"
                                className='Field_edit-check'
                                type='checkbox'
                                value={requiresAudit}
                                onChange={() => setRequiresAudit(!requiresAudit)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="inspectionAccess">inspectionAccess</label>
                            <input
                                id="inspectionAccess"
                                className='Field_edit-check'
                                type='checkbox'
                                checked={inspectionAccess}
                                onChange={() => setInspectionAccess(!inspectionAccess)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="supervisorPreloadCheck">supervisorPreloadCheck</label>
                            <input
                                id="supervisorPreloadCheck"
                                className='Field_edit-check'
                                type='checkbox'
                                value={supervisorPreloadCheck}
                                onChange={() => setSupervisorPreloadCheck(!supervisorPreloadCheck)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="helpTerm">helpTerm</label>
                            <input
                                id="helpTerm"
                                className='Field_edit-input'
                                type='number'
                                value={helpTerm}
                                onChange={(e) => setHelpTerm(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="supervisorCardCode">supervisorCardCode</label>
                            <input
                                id="supervisorCardCode"
                                className='Field_edit-input'
                                type='text'
                                value={supervisorCardCode}
                                onChange={(e) => setSupervisorCardCode(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="driverLicenseExpiration">driverLicenseExpiration</label>
                            <input
                                id="driverLicenseExpiration"
                                className='Field_edit-input'
                                type='text'
                                value={driverLicenseExpiration}
                                onChange={(e) => setDriverLicenseExpiration(e.target.value)}
                            ></input>
                            <label className='Field_edit-label' htmlFor="medicalCertExpiration">medicalCertExpiration</label>
                            <input
                                id="medicalCertExpiration"
                                className='Field_edit-input'
                                type='text'
                                value={medicalCertExpiration}
                                onChange={(e) => setMedicalCertExpiration(e.target.value)}
                            ></input>

                        </div>
                        <button
                            className='Field_edit_save'
                            type='submit'
                        > Save changes</button>
                    </form>
                </div>
            }
            {display === "TABLE" && clickedUser &&
                <><div className='Field_table-title'>User Info</div>
                    <div className='Field_table-wrap'>
                        <div className='UserField_table-label'>USER ID</div>
                        <div className='Field_table-item'>{clickedUser.userId}</div>
                        <div className='UserField_table-label'>FIRST NAME</div>
                        <div className='Field_table-item'>{clickedUser.firstName}</div>
                        <div className='UserField_table-label'>LAST NAME</div>
                        <div className='Field_table-item'>{clickedUser.lastName}</div>
                        <div className='UserField_table-label'>EMAIL</div>
                        <div className='Field_table-item'>{clickedUser.email}</div>
                        <div className='UserField_table-label'>USER TYPE</div>
                        <div className='Field_table-item'>{translateUserType(Number(clickedUser.userType))}</div>
                        <div className='UserField_table-label'>ACTIVE</div>
                        <div className='Field_table-item'>{String(!!clickedUser.active)}</div>
                        <div className='UserField_table-label'>AUTO INSPECT LAST DELIVERY</div>
                        <div className='Field_table-item'>{String(clickedUser.autoInspectLastDelivery)}</div>
                        <div className='UserField_table-label'>RESTRICTED DISPATCH</div>
                        <div className='Field_table-item'>{String(clickedUser.restrictedDispatch)}</div>
                        <div className='UserField_table-label'>HIGH CLAIMS</div>
                        <div className='Field_table-item'>{String(clickedUser.highClaims)}</div>
                        <div className='UserField_table-label'>REQUIRES AUDIT</div>
                        <div className='Field_table-item'>{String(clickedUser.requiresAudit)}</div>
                        <div className='UserField_table-label'>INSPECTION ACCESS</div>
                        <div className='Field_table-item'>{String(clickedUser.inspectionAccess)}</div>
                        <div className='UserField_table-label'>SUPERVISOR PRELOAD CHECK</div>
                        <div className='Field_table-item'>{String(clickedUser.supervisorPreloadCheck)}</div>
                        <div className='UserField_table-label'>HELP TERM</div>
                        <div className='Field_table-item'>{clickedUser.helpTerm}</div>
                        <div className='UserField_table-label'>SUPERVISOR CARD CODE</div>
                        <div className='Field_table-item'>{clickedUser.supervisorCardCode}</div>
                        <div className='UserField_table-label'>DRIVERS LICENSE EXPIRATION</div>
                        <div className='Field_table-item'>{clickedUser.driverLicenseExpiration}</div>
                        <div className='UserField_table-label'>MEDICAL CERT EXPIRATION</div>
                        <div className='Field_table-item'>{clickedUser.medicalCertExpiration}</div>

                    </div>
                </>
            }
        </div >
    );

}

export default UserField;
