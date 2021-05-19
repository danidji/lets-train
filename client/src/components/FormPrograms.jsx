import React from 'react';
import { Formik, Field, Form } from 'formik';
import axios from "axios";
import validator from "validator";

export default function FormPrograms(props) {


    return (
        <div className="form_programs">

            <Formik
                validate={values => {
                    // console.log(`validate -> value`, values)
                    const errors = {};

                    if (!validator.isLength(values.program_name, { min: 1, max: 15 })) {
                        errors.program_name = "Saisir entre 1 et 15 caractères"
                    }
                    if (!validator.isLength(values.description, { min: 1, max: 25 })) {
                        errors.description = "Saisir entre 1 et 25 caractères"
                    }
                    if (!validator.isLength(values.poster_image, { min: 1, max: 100 })) {
                        errors.poster_image = "Saisir entre 1 et 100 caractères"
                    }
                    return errors
                }}
                initialValues={{
                    program_name: ''
                    , level: ''
                    , description: ''
                    , poster_image: ''
                }}
                onSubmit={async (values, actions) => {
                    // await new Promise((r) => setTimeout(r, 500));
                    // => On peut ici envoyer nos valeurs à notre API
                    let data = values;
                    axios.post('/enregistrer-programme', { data })/* .then((response) => {
                        console.log(`axios.post -> response`, response)

                    }) */
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                {(props) => (
                    <form>
                        <input type="text" id="program_name" name="program_name" placeholder="Nom du programme" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.program_name} />
                        {props.errors.program_name && <div id="feedback">{props.errors.program_name}</div>}
                        <select id="level" name="level" >
                            <option value="1">Facile</option>
                            <option value="2">Intermédiaire</option>
                            <option value="3">Difficile</option>
                        </select>
                        <input type="text" id="description" name="description" placeholder="Description du programme" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.description} />
                        {props.errors.description && <div id="feedback">{props.errors.description}</div>}
                        <input type="text" id="poster_image" name="poster_image" placeholder="Saisir l'url du poster" onChange={props.handleChange} onBlur={props.handleBlur} value={props.poster_image} />
                        {props.errors.poster_image && <div id="feedback">{props.errors.poster_image}</div>}
                        <button type="submit" className="button_submit">Valider</button>
                    </form>
                )}
            </Formik>

        </div >
    )
}