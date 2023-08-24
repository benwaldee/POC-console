import React, { useState } from "react";
import { Modal } from '../../../context/Modal'
import CreateLoadForm from "./CreateLoadForm";

function CreateLoadModal({ handleRemount }) {
    const [showCreateForm, setShowCreateForm] = useState(false)
    return (
        <>
            <button className="Join_Create-button" onClick={() => setShowCreateForm(true)}>
                Create a new load
            </button>
            {showCreateForm && (
                <Modal onClose={() => setShowCreateForm(false)}>
                    <CreateLoadForm setShowCreateForm={setShowCreateForm} handleRemount={handleRemount} />
                </Modal>
            )}
        </>

    );
}

export default CreateLoadModal;
