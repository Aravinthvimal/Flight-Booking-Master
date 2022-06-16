import React from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";

import BookingFormCss from "./Login.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../api/baseApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    name: "",
    mobile: "",
    role: "user",
  };

  const registerFormValidation = Yup.object({
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password should be minimum of 6 characters")
      .max(8, "Incorrect passwordfor admin"),
    name: Yup.string().required("Name is required"),
    mobile: Yup.number().required("Mobile number is required"),
    role: Yup.string(),
  });

  const handleRegisterSubmit = async (values) => {
    console.log("handle register submit values", values);
    console.log("Resistration Done!");
    alert(`You have been successfully registered ${values.name}`);
    navigate("/");
  };

  return (
    <div className={BookingFormCss.booking_form}>
      <h1 className={BookingFormCss.book_seats_heading}>Register Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={registerFormValidation}
        onSubmit={(values) => {
          handleRegisterSubmit(values);
        }}
      >
        {({ errors }) => (
          <Form>
            <div className={BookingFormCss.booking_input}>
              <label className={BookingFormCss.booking_label} htmlFor="email">
                Name :
              </label>
              <Field name="name" className={BookingFormCss.field_input} />
              {errors.name ? (
                <div className={BookingFormCss.book_error}>{errors.name}</div>
              ) : null}
            </div>

            <div className={BookingFormCss.booking_input}>
              <label className={BookingFormCss.booking_label} htmlFor="mobile">
                Mobile :
              </label>
              <Field name="mobile" className={BookingFormCss.field_input} />
              {errors.mobile ? (
                <div className={BookingFormCss.book_error}>{errors.mobile}</div>
              ) : null}
            </div>

            <div className={BookingFormCss.booking_input}>
              <label className={BookingFormCss.booking_label} htmlFor="email">
                Email :
              </label>
              <Field name="email" className={BookingFormCss.field_input} />
              {errors.email ? (
                <div className={BookingFormCss.book_error}>{errors.email}</div>
              ) : null}
            </div>

            <div className={BookingFormCss.booking_input}>
              <label
                className={BookingFormCss.booking_label}
                htmlFor="password"
              >
                Password :
              </label>
              <Field
                name="password"
                type="password"
                className={BookingFormCss.field_input}
              />
              {errors.password ? (
                <div className={BookingFormCss.book_error}>
                  {errors.password}
                </div>
              ) : null}
            </div>

            <div className={BookingFormCss.booking_input}>
              <label className={BookingFormCss.booking_label} htmlFor="role">
                Role :
              </label>
              <Field
                name="role"
                as="select"
                className={BookingFormCss.field_input}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Field>
              {errors.role ? (
                <div className={BookingFormCss.book_error}>{errors.role}</div>
              ) : null}
            </div>

            <button className={BookingFormCss.submit}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Register;
