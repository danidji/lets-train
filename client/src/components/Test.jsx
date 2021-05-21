import { Field, Form, Formik } from "formik";

import React from "react";
import validator from "validator";

function FormProgField(props) {
    const validate = (value, type) => {
        let error;
        if (type === "name" && value != undefined && !validator.isLength(value, { min: 1, max: 15 })) {
            error = "1 caractère ou 15 maxi";
        }
        if (type === "email" && value != undefined && !validator.isEmail(value)) {
            error = "Il faut un mail valide";
        }
        return error;
    };

    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
            }}
            onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
        >
            {({ errors, touched }) => (
                <Form>
                    <Field
                        validate={(value) => validate(value, "name")}
                        name="name"
                        type="text"
                    />
                    {errors.name && touched.name ? <div>{errors.name}</div> : null}
                    <Field
                        validate={(value) => validate(value, "email")}
                        name="email"
                        type="email"
                    />
                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
}
export default FormProgField;