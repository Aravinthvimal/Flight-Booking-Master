import Booking from "../models/booking.model.js";
import Seat from "../models/flightSeat.model.js";
import ApiError from "../utils/errorClass.js";

export const createBooking = async (req, res, next) => {
  try {
    const userSeats = req.body.selectedSeats;

    console.log("userSeats", userSeats);

    // check is the seats are booked
    const bookingTrueSeats = await Seat.find({
      seatName: { $in: userSeats },
      isBooked: true,
    });

    console.log("bookingTrueSeats", bookingTrueSeats);

    if (bookingTrueSeats.length > 0) {
      const repeatBooked = bookingTrueSeats.map((seat) => seat.seatName);
      return next(
        new ApiError(`Seates Already booked ${[...repeatBooked]}`, 409)
      );
    }

    // check weather the all seat names exist and it is not  booked

    const bookingSeats = await Seat.find({
      seatName: { $in: userSeats },
      isBooked: false,
    });

    if (bookingSeats.length !== userSeats.length) {
      // this means that there are some seat names hat do not exist in db

      // fetch seat names of seats in db
      const seatNamesArr = bookingSeats.map((seatData) => {
        return seatData.seatName;
      });

      const errorSeat = userSeats.filter((x) => !seatNamesArr.includes(x));

      return next(new ApiError(`Invalid Seats ${[...errorSeat]}`, 404));
    }

    const seatIdArr = bookingSeats.map((seatData) => {
      return seatData._id;
    });

    let data = {
      mobile: req.body.mobile,
      selectedSeats: seatIdArr,
      bookingDate: req.body.bookingDate,
      user: req.user._id,
    };

    const bookingData = await Booking.create(data);

    let updatedSeats = await Seat.updateMany(
      { _id: { $in: seatIdArr } },
      { $set: { isBooked: true } },
      { multi: true, runValidators: true }
    );

    console.log("updatedSeats", updatedSeats);

    res.status(201).json({
      success: true,
      data: bookingData,
    });
  } catch (error) {
    console.log("error message", error.message);
    return next(error);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.findOne({ user: req.user._id });

    if (bookings.length <= 0) {
      return next(new ApiError("No bookings found", 404));
    }

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateBooking = async (req, res, next) => {
  try {
    const { mobile, selectedSeats, bookingDate, bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return next(new ApiError("No bookings found", 404));
    }

    // remove the seats which the user have alreafy booked
    const usersExistingSeats = await Booking.findOne({
      user: req.user._id,
    }).populate("selectedSeats");

    console.log("usersExistingSeats", usersExistingSeats);

    const alreadyBookedSeats = usersExistingSeats.selectedSeats.map(
      (seat) => seat.seatName
    );

    console.log("alreadyBookedSeats", alreadyBookedSeats);

    let newSeatsAdded = selectedSeats.filter(
      (x) => !alreadyBookedSeats.includes(x)
    );

    console.log("newSeatsAdded", newSeatsAdded);

    // check is the seats are booked
    const bookingTrueSeats = await Seat.find({
      seatName: { $in: newSeatsAdded },
      isBooked: true,
    });

    console.log("bookingTrueSeats", bookingTrueSeats);

    if (bookingTrueSeats.length > 0) {
      const repeatBooked = bookingTrueSeats.map((seat) => seat.seatName);
      return next(
        new ApiError(`Seates Already booked ${[...repeatBooked]}`, 409)
      );
    }

    // check weather the all seat names exist and it is not  booked
    const bookingSeats = await Seat.find({
      seatName: { $in: newSeatsAdded },
      isBooked: false,
    });

    // this means that there are some seat names hat do not exist in db
    if (bookingSeats.length !== newSeatsAdded.length) {
      // fetch seat names of seats in db
      const seatNamesArr = bookingSeats.map((seatData) => {
        return seatData.seatName;
      });

      const errorSeat = newSeatsAdded.filter((x) => !seatNamesArr.includes(x));

      return next(new ApiError(`Invalid Seats ${[...errorSeat]}`, 404));
    }

    // get the _id from the seats from all the seats names provided
    const bookingSeatsNewRes = await Seat.find({
      seatName: { $in: selectedSeats },
    });

    // store ids in arr
    const totalSeatsIdArr = bookingSeatsNewRes.map((data) => data._id);

    // update operation
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { mobile, selectedSeats: totalSeatsIdArr, bookingDate },
      {
        runValidators: true,
        new: true,
      }
    );

    // update the seats DB
    await Seat.updateMany(
      { _id: { $in: totalSeatsIdArr } },
      { $set: { isBooked: true } },
      { multi: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedBooking,
    });
  } catch (error) {
    next(error);
  }
};
