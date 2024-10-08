import mongoose from "mongoose";

const employeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Ensures that email is unique
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Simple email regex
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v); // Validates mobile number format
        },
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
    },
    gender: {
      type: String,
      enum: ["M", "F"], // Valid values for gender
      required: [true, "Gender is required"],
    },
    courses: {
      type: [String], // Array of strings for multiple courses
      default: [],
    },
    avatar: {
      type: String, // You may store the path to the uploaded image
      required: true,
    },
  },
  { timestamps: true }
); 

export const Employe = mongoose.model("Employe", employeSchema);

