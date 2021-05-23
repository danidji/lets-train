// import { Button } from "react-bootstrap";
import { Formik } from "formik";
import React from "react";
import validator from "validator";

function FormProg(props) {

    return (
        <Formik
            validate={values => {

                const errors = {};
                if (!validator.isLength(values.name, { min: 1, max: 15 })) {
                    errors.name = '1 caractère ou 15 maxi';
                }
                return errors;
            }}
            initialValues={{
                name: "",
                email: "",
            }}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }, 1000);
            }}
        >
            {(props) => (
                <form method="post">
                    <input
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.name}
                        name="name"
                    />
                    <input
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.name}
                        name="email"
                    />
                    {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                    <button type="submit">Submit</button>
                </form>
            )}
        </Formik>
    );
}
export default FormProg;