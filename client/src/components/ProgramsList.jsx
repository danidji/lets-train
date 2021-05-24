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
     *              -> mettre un evénement onMouseEnter et mettre l'état du state à true
     *              -> utiliser le dataset pour faire un evenement hover::after en css : doc : https://developer.mozilla.org/fr/docs/Web/CSS/::after
     */

    const onHover = (e) => {
        e.stopPropagation();
        !state.isHover
            ? setState({ ...state, isHover: true })
            : setState({ ...state, isHover: false })
    }



    function getData(data) {



        return data.map((element, i) => {
            console.log(`returndata.map -> element`, element)


            return (
                <div key={i} className="program_card" onClick={props.onClick} onMouseEnter={(e) => onHover(e)} onMouseLeave={(e) => onHover(e)}>
                    <div className="element_image">
                        <div className={`name ${i % 2 === 0 ? 'right' : 'left'}`} >{element.name}</div>
                        {state.isHover &&
                            <ButtonEdit />}
                        <img src={element.poster_image} alt="" />

                    </div>
                    <div className="description">{element.description}</div>
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