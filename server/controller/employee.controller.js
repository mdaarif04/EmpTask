import { ApiError } from "../utils/ApiError.js";
import { Employe } from "../models/employe.model.user.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createEmployee = asyncHandler(async (req, res) => {
  const { name, email, mobile, designation, gender, courses } = req.body;

  if (
    [name, email, mobile, designation, gender, courses].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await Employe.findOne({ email }, { mobile });
  if (existingUser) {
    throw new ApiError(400, "Email or mobile already exists.");
  }

  const avatarLocalPath = req.files?.avatar ? req.files.avatar[0]?.path : null;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required.");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Error uploading avatar file.");
  }

  const newUser = await Employe.create({
    name,
    email,
    mobile,
    designation,
    gender,
    courses,
    avatar: avatar.url,
  });

  return res
    .status(201)
    .json({ message: "Employee created successfully", user: newUser });
});

const getEmployees = asyncHandler(async (req, res) => {
  try {
    const employees = await Employe.find();
    return res.status(200).json({
      message: "Employees retrieved successfully",
      employees,
    });
  } catch (err) {
    console.error("Error retrieving employees:", err);
    throw new ApiError(500, "Error retrieving employees");
  }
});

const getEmployeeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employe.findById(id);
    if (!employee) {
      throw new ApiError(404, "Employee not found");
    }

    return res.status(200).json({
      message: "Employee retrieved successfully",
      employee,
    });
  } catch (err) {
    console.error("Error retrieving employee:", err);
    throw new ApiError(500, "Error retrieving employee data");
  }
});

const deleteEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employe.findByIdAndDelete(id);
    if (!employee) {
      throw new ApiError(404, "Employee not found");
    }

    return res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting employee:", err);
    throw new ApiError(500, "Error deleting employee data");
  }
});

const editEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, designation, gender, courses } = req.body;

  if (
    [name, email, mobile, designation, gender, courses].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const existingUser = await Employe.findOne({
      _id: { $ne: id },
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      throw new ApiError(400, "Email or mobile already exists.");
    }

    let avatarUrl;
    if (req.files?.avatar) {
      const avatarLocalPath = req.files.avatar[0]?.path;
      avatarUrl = await uploadOnCloudinary(avatarLocalPath);
      if (!avatarUrl) {
        throw new ApiError(400, "Error uploading avatar file.");
      }
    }

    const updatedData = {
      name,
      email,
      mobile,
      designation,
      gender,
      courses,
    };

    if (avatarUrl) {
      updatedData.avatar = avatarUrl.url;
    }

    const updatedEmployee = await Employe.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      throw new ApiError(404, "Employee not found");
    }

    return res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (err) {
    console.error("Error updating employee:", err);
    throw new ApiError(500, "Error updating employee data");
  }
});

export {
  createEmployee,
  getEmployees,
  getEmployeeById,
  deleteEmployee,
  editEmployee,
};
