import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../model/user.model.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefereshTokens = async(userId) =>{
  try {
      const user = await User.findById(userId)
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()

      user.refreshToken = refreshToken
      await user.save({ validateBeforeSave: false })

      return {accessToken, refreshToken}


  } catch (error) {
      throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }
}


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  if ([name, email, password, phone].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required")
  }
    let user = await User.findOne({ email });
    if(user){  
      throw new ApiError(400, "Sorry a User with this email already Exist")
    }
    user = await User.create({
      name : req.body.name,
      email : req.body.email,
      password : req.body.password,
      phone : req.body.phone
    })
   
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

  if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user")
  }

  return res.status(201).json(
      new ApiResponse(200, createdUser, "User registered Successfully")
  )

});

export { registerUser ,generateAccessAndRefereshTokens};