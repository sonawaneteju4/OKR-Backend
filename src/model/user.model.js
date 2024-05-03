import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index : true,
  
    },
    password: {
        type: String,
        required: [true, 'Password Is Required'],
    },
    refreshToken: {
        type: String
    }
  
    },
    { timestamps: true }  
)
userSchema.pre("save", 
  async function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
  }
)
userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}


userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          email: this.email,
          phone : this.phone,
          name : this.name
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  )
}

export const User = mongoose.model("User", userSchema)