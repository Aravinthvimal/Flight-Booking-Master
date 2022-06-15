import Bookings from "../models/booking.model.js";
import Seat from "../models/flightSeat.model.js";
import ApiError from "../utils/errorClass.js";

export const seedSeatData = async (req, res, next) => {
  const { role } = req.user;

  if (!role || role !== "admin") {
    return next(new ApiError("Please Authenticate", 401));
  }

  let seats = await Seat.find();

  if (seats.length <= 0) {
    let seatsArr = [];

    let seatRange = ["A", "B", "C", "D", "E", "F"];

    let start = 1;
    for (let i = 1; i <= 30; i++) {
      for (let j = 0; j < seatRange.length; j++) {
        let obj = {
          seatNumber: start,
          seatName: `${seatRange[j]}${i}`,
        };

        start = start + 1;

        seatsArr.push(obj);
      }
    }

    try {
      let seats = await Seat.create(seatsArr);

      console.log("seeding complete");
      res.json({
        success: true,
      });
    } catch (error) {
      return next(error);
    }
  } else {
    return next(new ApiError("Database already seeded", 400));
  }
};

export const getBookingsByDate = async (req, res, next) => {
  const { date } = req.params;

  if (!date) {
    return next(new ApiError("Date is required", 404));
  }

  try {
    console.log("date", typeof date);

    const currentDay = date.split("-")[2];
    const tomorrowDay = parseInt(currentDay) + 1;

    console.log("tomorrowDay", tomorrowDay);

    const tomorrowDate = `${date.split("-")[0]}-${
      date.split("-")[1]
    }-${tomorrowDay}`;

    console.log("tomorrowDate", tomorrowDate);

    const bookings = await Bookings.find({
      bookingDate: { $gte: new Date(date), $lte: new Date(tomorrowDate) },
    })
      .populate("selectedSeats")
      .sort("-selectedSeats.seatName");

    res.send({
      data: bookings,
    });
  } catch (error) {}
};

export const getSeatData = async (req, res, next) => {
  try {
    const seats = await Seat.find({}).sort("seatNumber");

    if (seats.length <= 0) {
      return next(new ApiError("Seats not available", 400));
    }

    res.status(201).json({
      success: true,
      data: seats,
    });
  } catch (error) {
    return next(error);
  }
};
