import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
// import { response } from 'express';

export default function ProgramsList(props) {
    const [state, setState] = useState({
        data: []
    })

    function getData(data) {
        return data.map((element, i) => {
            return (
                <div key={i} className="program_card" data-bgi={`url(${element.poster_image})`}>
                    <Link className="link" to={'/api/sous-programmes/liste'}>
                        <div className="element_image">
                            <div className="name">{element.name}</div>
                            {/* <img src={element.poster_image} alt="" /> */}

                        </div>
                        <div className="description">{element.description}</div>
                    </Link>
                </div>
            )
        })
    }
    useEffect(() => {
        axios.get('/api/programmes/liste').then((response) => {
            console.log(`axios.get -> response`, response.data)
            setState({ data: response.data });
        })
    }, [])


    let myData = []
    if (state.data.length > 0) {
        myData = getData(state.data);
        // console.log(`ProgramsList -> myData`, myData)

    }
    return (
        <div className="program_list">
            <h1>Liste des Programmes</h1>
            {state.data.length > 0 && myData}

        </div>

    )



}