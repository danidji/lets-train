// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
const axios = require('axios');
var empty = require('is-empty');
var validator = require('validator');
const errors = {};

const Basic = () => (
    <div>
        <h1>Ajouter un programe : </h1>
        <Formik
            initialValues={{ name: '', level: 0, description: '', poster_image: '' }}
            validate={values => {
                if (empty(values.name) || empty(values.level) || empty(values.description) || empty(values.poster_image)) {
                    errors.empty = 'empty champs';
                    return errors;
                } else {
                    errors.empty = ''
                }
                if (!validator.isLength(values.name, 3, 10)) {
                    errors.nameNotValide = 'votre nom doit être entre 3 et 10 charactères';
                } else {
                    errors.nameNotValide = '';
                }
                console.log('teste values : ', values);
                console.log('var validator ===>', validator.isLength(values.name, 3, 10));
                console.log('test du empty : ', empty(values.name));
                console.log('errors =============> ', errors);
                // return errors;
            }}
            onSubmit={(values, actions) => {
                setTimeout(async () => {
                    // alert(JSON.stringify(values, null, 2));
                    // console.log('value : ', values);
                    actions.setSubmitting(false);
                    await axios.post('/add-form', { dataPrograms: values })
                        .then(res => {
                            console.log('res : ', res);
                        })
                    actions.resetForm({
                        values: {
                            name: '',
                            level: 0,
                            description: '',
                            poster_image: ''
                        }
                    })
                }, 400);
            }}
        >
            {({ isSubmitting, values }) => (
                <Form>
                    <Field value={values.name ? values.name : ''} type="text" name="name" />
                    <ErrorMessage name="name" component="div" />
                    <Field value={values.level || ''} type="number" name="level" />
                    <ErrorMessage name="level" component="div" />
                    <Field value={values.description || ''} type="text" name="description" />
                    <ErrorMessage name="description" component="div" />
                    <Field value={values.poster_image || ''} type="text" name="poster_image" />
                    <ErrorMessage name="poster_image" component="div" />
                    <button type="submit" disabled={isSubmitting}>
                        Submit
             </button>
                </Form>
            )}
        </Formik>
    </div>
);

export default Basic;