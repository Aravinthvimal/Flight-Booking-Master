import React from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";

import BookingFormCss from "./Login.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/baseApi";

const LoginForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const loginFormValidation = Yup.object({
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password should be minimum of 6 characters"),
  });

  const handleLoginSubmit = async (values) => {
    console.log("handle submit values", values);

    try {
      const loginRes = await axiosInstance.post("/auth/login", values);
      toast.success("Login Successfull");
      console.log("loginRes", loginRes);
      if (loginRes.data.data.role === "user") {
        navigate("/booking");
      }

      if (loginRes.data.data.role === "admin") {
        navigate("/list=bookings");
      }

      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("role", loginRes.data.data.role);
    } catch (error) {
      console.log("login", error);
      toast.error(error.response.data.error);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className={BookingFormCss.booking_form}>
      <h1 className={BookingFormCss.book_seats_heading}>Login Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={loginFormValidation}
        onSubmit={(values) => {
          handleLoginSubmit(values);
        }}
      >
        {({ errors }) => (
          <Form>
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

            <button type="submit" className={BookingFormCss.submit}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <button
        className={BookingFormCss.registerBtn}
        onClick={handleRegisterClick}
      >
        Register
      </button>

      <ToastContainer />
    </div>
  );
};

export default LoginForm;
