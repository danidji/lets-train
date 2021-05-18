import React from 'react';
import { Formik, Field, Form } from 'formik';
import axios from "axios";

export default function FormPrograms(props) {


    const validate = (value) => {
        console.log(`validate -> value`, value)
        const errors = {};
        if (!value.program_name) {
            errors.program_name = "Champs requis"
        } else if (value.length > 20) {
            errors.program_name = "longueur max atteinte"
        }

        return errors
    }

    return (
        <div className="form_programs">

            <Formik
                initialValues={{
                    program_name: ''
                    , level: ''
                    , description: ''
                    , poster_image: ''
                }}
                onSubmit={(values) => {
                    // await new Promise((r) => setTimeout(r, 500));
                    // => On peut ici envoyer nos valeurs à notre API
                    let data = values;
                    axios.post('/enregistrer-programme', { data })/* .then((response) => {
                        console.log(response);
                        return response
                    }) */

                    alert(JSON.stringify(values, null, 2));
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field id="program_name" name="program_name" placeholder="Nom du programme" /* validate={validate} */ />
                        {errors.program_name && touched.program_name ? (<div>{errors}</div>) : null}
                        <Field id="level" name="level" component="select" /* validate={validate} */ >
                            <option value="1">Facile</option>
                            <option value="2">Intermédiaire</option>
                            <option value="3">Difficile</option>
                        </Field>
                        <Field id="description" name="description" placeholder="Description du programme" /* validate={validate} */ />
                        <Field id="poster_image" name="poster_image" placeholder="Saisir l'url du poster" /* validate={validate} */ />
                        <button type="submit" className="button_submit">Valider</button>
                    </Form>
                )}
            </Formik>

        </div>
    )
}