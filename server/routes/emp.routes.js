import { Router } from "express";
import { createEmployee, deleteEmployee, editEmployee, getEmployeeById, getEmployees } from "../controller/employee.controller.js";
import { upload } from "../midilware/multer.middleware.js";

const emprouter = Router();

emprouter.route("/employee").post(
  upload.fields([
    {
      name: "avatar", 
      maxCount: 1,
    },
    {
      name: "coverImage", 
      maxCount: 1,
    },
  ]),
  createEmployee
);
emprouter.route("/employees").get(getEmployees);
emprouter.route("/employees/:id").get(getEmployeeById);
emprouter.route("/employees/:id").delete(deleteEmployee);
emprouter.put(
  "/employees/:id",
  upload.fields([{ name: "avatar", maxCount: 1 }]), 
  editEmployee 
);


export default emprouter;
