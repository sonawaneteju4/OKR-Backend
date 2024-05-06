import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../model/user.model.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  if ([name, email, password, phone].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required")
  }
  
});

export { registerUser };