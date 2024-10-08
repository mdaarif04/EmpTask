import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  })
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    email,
    password,
    username,
  })

  return res
    .status(201)
    .json(new ApiResponse(200, user, "User registered successfully"));
});
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }); // Find user by username

    // Check if user exists
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    // Check if password matches
    if (user.password !== password) {
      return res.status(400).json({ msg: "Invalid password." });
    }

    // Return response if login is successful
    return res.status(200).json({
      status: 200,
      data: {
        user: {
          _id: user._id, // Ensure the ID is included
          username: user.username,
          email: user.email, // Include other details if needed
        },
      },
      message: "User logged in successfully",
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
const userData = asyncHandler(async (req, res) => {
  try {
    // Fetch all users or a specific user if needed
    const users = await User.find(); // Use `User.find({})` if you want to fetch all users

    if (!users.length) {
      return res.status(404).json({ message: "No users found." });
    }

    // Send the retrieved user data as a response
    return res
      .status(200)
      .json({ message: "User data retrieved successfully", users });
  } catch (err) {
    console.error("Error retrieving user data:", err);
    return res.status(500).json({ message: "Error retrieving user data" });
  }
});
const userDataById = asyncHandler(async (req, res) => {
  const { id } = req.params; // Extract user ID from the request parameters

  try {
    const user = await User.findById(id); // Fetch the user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(user); // Return the user data
  } catch (err) {
    console.error("Error retrieving user data:", err);
    return res.status(500).json({ message: "Error retrieving user data" });
  }
});



export { registerUser, loginUser, userData, userDataById };
