import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
// import { response } from 'express';

export default function ProgramsList(props) {
    const [state, setState] = useState({
        data: []
    })

    function getData(data) {
        return data.map((element, i) => {
            return (
                <div className="program_list" key={i}>
                    <div className="name">{element.name}</div>
                    <div className="level">{element.level}</div>
                    <div className="description">{element.description}</div>
                    <img src={element.poster_image} alt="" />
                    {/* <div className="proster_img">{element.poster_image}</div> */}

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
        console.log(`ProgramsList -> myData`, myData)

    }
    return (
        <>
            <h1>YOoooo</h1>
            {state.data.length > 0 && myData}

        </>
    )



}