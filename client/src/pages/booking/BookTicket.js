import React, { useState } from "react";
import Header from "../../components/common/Header";
import BookTicketForm from "../../components/page/BookingForm";
import SeatStatusMap from "../../components/page/SeatStatus";
import BookTicketCss from "./BookTicket.module.css";

const BookTicket = () => {
  const [updateSeat, setUpdateSeat] = useState(false);

  return (
    <div>
      <Header />

      <div className={BookTicketCss.book_wrap}>
        <BookTicketForm updateSeat={updateSeat} setUpdateSeat={setUpdateSeat} />
        <SeatStatusMap updateSeat={updateSeat} />
      </div>
    </div>
  );
};

export default BookTicket;
