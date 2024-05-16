import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Ticket } from "../model/ticket.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// @desc    Get all tickets

const getAllTickets = asyncHandler(async (req, res) => {
  const { email, priority, status, category, issue, resolution, expectedTime } =
    req.query;
  try {
    const tickets = await Ticket.find({}).sort({ $natural: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

//@desc   Create Ticket
const currentDate = new Date();
const minExpectedTime = new Date(currentDate);
minExpectedTime.setDate(currentDate.getDate() + 2); // Add 2 days

const createTicket = asyncHandler(async (req, res) => {
  try {
    const { email, priority, category, issue } = req.body;
    if (
      [email, priority, category, issue].some((field) => field?.trim() === "")
    ) {
      throw new ApiError(400, "All fields are required");
    }
    const ticket = await Ticket.create({
      email,
      priority,
      status: "created",
      category,
      issue,
      expectedTime: minExpectedTime,
    });

    const saveTicket = await ticket.save();
    res.status(200).json(saveTicket);
  } catch (error) {
    throw new ApiError(500, (error.message = "Something Went Wrong"));
  }
});

// @desc    Get ticket by id

const getTicketById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid ticket id");
  }
  try {
    const ticket = await Ticket.findById(id);
    res.status(200).json(ticket);
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

// @desc    Update ticket
const updateTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid ticket id");
  }
  try {
    const ticket = await Ticket.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(ticket);
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

// @desc    Close ticket



export { getAllTickets, createTicket, getTicketById, updateTicket };
