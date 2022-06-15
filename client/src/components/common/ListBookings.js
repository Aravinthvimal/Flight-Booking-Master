import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/baseApi";
import TableCss from "./ListBooking.module.css";

const ListBookings = () => {
  const [date, setDate] = useState(null);

  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    console.log("date", date);
    console.log("bookingList", bookingList);
  }, [date, bookingList]);

  const handleSearchCLick = async () => {
    if (!date) {
      return alert("Select date first");
    }

    let res = await axiosInstance.get(`/admin/get-bookings/${date}`);
    setBookingList(res.data.data);

    console.log("res", res);

    try {
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCheckBox = (book) => {
    console.log("Book", book);
  };

  return (
    <div>
      <div className="date_input">
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <button className="search" onClick={handleSearchCLick}>
          Search
        </button>
      </div>

      <table className={TableCss.table}>
        <tr>
          <th className={TableCss.th}>Booking ID</th>
          <th className={TableCss.th}>Seats</th>
          <th className={TableCss.th}>Mobile</th>
          <th className={TableCss.th}>Arrived</th>
        </tr>
        <tr>
          <td> 06162022001 </td>
          <td> A1 - First </td>
          <td> 848945051 </td>
          <td> 12:55 </td>
        </tr>
        {bookingList.map((book) => {
          const seats = book.selectedSeats.map((seat) => {
            return `${seat.seatName} - `;
          });

          return (
            <tr>
              <td className={TableCss.td}>{book._id}</td>
              <td className={TableCss.td}>{[...seats]}</td>
              <td className={TableCss.td}>{book.mobile}</td>
              <td className={TableCss.td}>
                <input type="checkbox" onChange={() => handleCheckBox(book)} />
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default ListBookings;
