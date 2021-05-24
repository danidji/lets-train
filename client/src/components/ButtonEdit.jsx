import React from 'react';
import { FaRegEdit } from "react-icons/fa";

export default function ButtonEdit(props) {
    return (
        <div className="button_edit" onClick={props.handleEdit} >
            {/* <button className='delete' onClick={props.handleDelete}> */}
            <FaRegEdit />
            {/* </button> */}
        </div>
    )
};


