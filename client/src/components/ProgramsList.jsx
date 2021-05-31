import React, { useState, useEffect } from 'react';
import axios from "axios";

import ButtonEdit from './ButtonEdit';


export default function ProgramsList(props) {
    const [state, setState] = useState({
        data: [],
        isHover: false
    })

    /**
     * TODO 
     *  -> Au hover sur l'élément : 
     *          - Afficher un bouton supprimer et modifier 
     *              -> Créer 2 composants et envoyer l'id dans les props
     *              -> mettre un evénement onMouseEnter et mettre l'état du state à true = Ok
     *              
     */


    const onHover = (i, e) => {
        console.log(`onHover -> i`, i)
        console.log(`onHover -> e`, e)

        setState({ ...state, isHover: true })
    }
    const outHover = (i, e) => {
        setState({ ...state, isHover: false })
    }

    function getData(data) {

        return data.map((element, i) => {
            // console.log(`returndata.map -> element`, element)


            return (
                <div key={i} className="program_card" onClick={props.onClick} onMouseEnter={(e) => onHover(i, e)} onMouseLeave={(i, e) => outHover(i, e)}>
                    <div className="element_image">
                        <div className={`name ${i % 2 === 0 ? 'right' : 'left'}`} >{element.name}</div>
                        {state.isHover &&
                            (
                                <>
                                    <div className="fake_elt">
                                    </div>
                                    <ButtonEdit index={i} />
                                </>
                            )
                        }
                        {/* <div className="fake_elt">
                            <ButtonEdit index={i} />
                        </div> */}
                        <img src={element.poster_image} alt="" />

                    </div>
                    <div className="description">{element.description}</div>
                </div>
            )
        })
    }
    useEffect(() => {
        axios.get('/api/programmes/liste').then((response) => {
            // console.log(`axios.get -> response`, response.data)
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