import { Field, Form, Formik } from "formik";
import axios from "axios";
import React from "react";
import validator from "validator";
import empty from 'is-empty';

function FormProg(props) {
    const validate = (value, type) => {
        // console.log(`validate -> value`, value)
        let error;

        if (type === "name" && value != undefined && !validator.isLength(value, { min: 1, max: 15 })) {
            error = "1 caractère ou 15 maxi";
        }
        if (type === "description" && value != undefined && !validator.isLength(value, { min: 1, max: 25 })) {
            error = "1 caractère ou 25 maxi";
        }
        if (type === "poster_image" && value != undefined && !validator.isLength(value, { min: 1, max: 100 })) {
            error = "1 caractère ou 100 maxi";
        }
        // console.log(`validate -> error`, error)

        return error;
    };

    return (
        <Formik
            initialValues={{
                name: "",
                level: "",
                description: "",
                poster_image: "",
            }}

            onSubmit={(values, actions) => {

                // console.log(`FormProg -> values`, values)
                axios.post('/api/programmes/ajouter', { data: values }).then((response) => {
                    console.log(`axios.post -> response`, response.data)

                })
                actions.setSubmitting(false);
                console.log(`FormProg -> actions`, actions)
                console.log(`FormProg -> values`, values)
            }}
        >
            {

                ({ errors, touched }) => (
                    <Form>
                        <Field
                            validate={(value) => validate(value, "name")}
                            name="name"
                            type="text"
                            className='name'
                            placeholder="Nom du programme"
                        />
                        {errors.name && touched.name ? <div>{errors.name}</div> : null}
                        <Field as="select" name="level" className="level" value="default">
                            <option value="default" disabled >Choisir la difficulté</option>
                            <option value="1">Facile</option>
                            <option value="2">Intermédiaire</option>
                            <option value="3">Difficile</option>
                        </Field>
                        <Field
                            validate={(value) => validate(value, "description")}
                            name="description"
                            type="text"
                            className='description'
                            placeholder="Description du programme"
                        />
                        {errors.description && touched.description ? <div>{errors.description}</div> : null}
                        <Field
                            validate={(value) => validate(value, "poster_image")}
                            name="poster_image"
                            type="text"
                            className='poster_image'
                            placeholder="Saisir l'url du poster"
                        />
                        {errors.poster_image && touched.poster_image ? <div>{errors.poster_image}</div> : null}

                        <button type="submit">Valider</button>
                    </Form>
                )
            }
        </Formik >
    );
}
export default FormProg;