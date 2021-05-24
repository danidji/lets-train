import React from 'react';
import { FaRegEdit } from "react-icons/fa";

export default function ButtonEdit(props) {
    return (
        <div className={`button_edit ${props.index % 2 === 0 ? 'right' : 'left'}`} onClick={props.handleEdit} >
            <FaRegEdit />
        </div>
    )
};


