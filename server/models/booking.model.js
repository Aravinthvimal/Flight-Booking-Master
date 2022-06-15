import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: [true, "User is required for booking"],
    ref: "User",
  },
  mobile: {
    type: Number,
    min: [10, "Please provide valid mobile number"],
    required: [true, "Mobile number is required"],
  },
  selectedSeats: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Seat",
      required: [true, "Seats are required"],
    },
  ],
  bookingDate: {
    type: Date,
    required: [true, "Booking date is required"],
  },
});

const bookingModel = mongoose.model("Booking", bookingSchema);

export default bookingModel;
