import React from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";
import BookingFormCss from "./BookingForm.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../api/baseApi";

const BookingForm = ({ setUpdateSeat, updateSeat }) => {
  const navigate = useNavigate();
  const initialValues = {
    mobile: "",
    date: "",
    seats: ["A1"],
  };

  const bookingFormValidation = Yup.object({
    mobile: Yup.number()
      .min(10, "Exter valid number")

      .required("Mobile Number is required"),
    date: Yup.date().required("Date Required"),
    seats: Yup.array()
      .required("Seats are required")
      .min(1, "Minimum one seat is required")
      .max(6, "Max six seat is required"),
  });

  const handleBookingFormSubmit = async (values) => {
    console.log("Values in handle booking", values);

    const data = {
      mobile: values.mobile,
      selectedSeats: values.seats,
      bookingDate: values.date,
    };

    alert(`Tickets Booked Successfully! Enjoy your journey`);
    navigate("/list-bookings");
  };

  return (
    <div className={BookingFormCss.booking_form}>
      <h1 className={BookingFormCss.book_seats_heading}>Book Seats</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={bookingFormValidation}
        onSubmit={(values) => {
          handleBookingFormSubmit(values);
        }}
      >
        {({ errors }) => (
          <Form>
            <div className={BookingFormCss.booking_input}>
              <label className={BookingFormCss.booking_label} htmlFor="mobile">
                Mobile :
              </label>
              <Field
                name="mobile"
                className={BookingFormCss.field_input}
                placeholder="Enter your mobile number"
              />
              {errors.mobile ? (
                <div className={BookingFormCss.book_error}>{errors.mobile}</div>
              ) : null}
            </div>

            <div className={BookingFormCss.booking_input}>
              <label className={BookingFormCss.booking_label} htmlFor="date">
                Date :
              </label>
              <Field
                name="date"
                type="date"
                className={BookingFormCss.field_input}
                placeholder="Enter date of Travel"
              />
              {errors.date ? (
                <div className={BookingFormCss.book_error}>{errors.date}</div>
              ) : null}
            </div>

            <div className={BookingFormCss.booking_input}>
              <label className={BookingFormCss.booking_label} htmlFor="seats">
                Seats :
              </label>
              <FieldArray name="seats">
                {(fieldArrProps) => {
                  console.log("In field array");

                  const { push, remove, form } = fieldArrProps;
                  const { values } = form;
                  const { seats } = values;

                  return (
                    <div>
                      {seats.map((seat, index) => (
                        <div key={index}>
                          <Field
                            className={BookingFormCss.field_input}
                            name={`seats[${index}]`}
                          />
                          {index > 0 && (
                            <button
                              type="button"
                              className={BookingFormCss.book_button}
                              onClick={() => remove(index)}
                            >
                              -
                            </button>
                          )}

                          <button
                            type="button"
                            className={BookingFormCss.book_button}
                            onClick={() => push("")}
                          >
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
              {errors.seats ? (
                <div className={BookingFormCss.book_error}>{errors.seats}</div>
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

export default BookingForm;
