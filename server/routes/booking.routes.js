import express from "express";
import {
  createBooking,
  getBookings,
  updateBooking,
} from "../controllers/booking.controller.js";
import { authVerify } from "../utils/auth.middleware.js";

const router = express.Router();

router.post("/booking", authVerify, createBooking);
router.get("/booking", authVerify, getBookings);
router.patch("/booking", authVerify, updateBooking);

export default router;
