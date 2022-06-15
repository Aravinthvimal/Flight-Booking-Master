import mongoose from "mongoose";

const seatSchema = mongoose.Schema({
  seatNumber: {
    type: Number,
  },
  seatName: {
    type: String,
    required: [true, "Seat Name is required"],
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

const seatModel = mongoose.model("Seat", seatSchema);

export default seatModel;
