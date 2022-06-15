import express from "express";
import {
  getBookingsByDate,
  seedSeatData,
  getSeatData,
} from "../controllers/seats.controller.js";
import { authVerify } from "../utils/auth.middleware.js";

const router = express.Router();

router.post("/seed-seats", authVerify, seedSeatData);

router.get("/seat-data", getSeatData);

router.get("/get-bookings/:date", getBookingsByDate);

export default router;
