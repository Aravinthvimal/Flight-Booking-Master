import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/baseApi";
import SeatStatusCss from "./SeatStatus.module.css";

const SeatStatus = ({ updateSeat }) => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/admin/seat-data")
      .then((res) => {
        console.log("res", res);
        setSeats(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [updateSeat]);

  return (
    <div>
      <div className={SeatStatusCss.seat_range}>
        <div className={SeatStatusCss.seat_box_wrap}>
          {seats.length > 0 &&
            seats.map((seat) => (
              <div
                className={
                  seat.isBooked
                    ? SeatStatusCss.seat_box_booked
                    : SeatStatusCss.seat_box
                }
                key={seat._id}
              >
                {seat.seatName}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SeatStatus;
