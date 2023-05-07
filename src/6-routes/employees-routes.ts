import express, { Request, Response, NextFunction } from "express";
import employeesService from "../5-services/employees-service";
import { EmployeeModel } from "../2-models/employee-model";


const router = express.Router(); // Capital R

// GET http://localhost:4000/api/employees
router.get("/api/employees", async (request: Request, response: Response, next: NextFunction) => {
  try {
      const employees = await employeesService.getAllEmployees();
      response.json(employees);
  }
  catch (err: any) {
      next(err);
  }
});

// GET http://localhost:4000/api/employees/:_id
router.get("/api/employees/:_id", async (request: Request, response: Response, next: NextFunction) => {
  try {
      const _id = request.params._id;
      const employee = await employeesService.getOneEmployee(_id);
      response.json(employee);
  }
  catch (err: any) {
      next(err);
  }
});

// POST http://localhost:4000/api/employees
router.post("/api/employees", async (request: Request, response: Response, next: NextFunction) => {
  try {
      const employee = new EmployeeModel(request.body);
      const newEmployee = await employeesService.addEmployee(employee);
      response.json(newEmployee);
  }
  catch (err: any) {
      next(err);
  }
});

// PUT http://localhost:4000/api/employees
router.put("/api/employees", async (request: Request, response: Response, next: NextFunction) => {
  try {
      const employee = new EmployeeModel(request.body);
      const newEmployee = await employeesService.updateEmployee(employee);
      response.json(newEmployee);
  }
  catch (err: any) {
      next(err);
  }
});

// DELETE http://localhost:4000/api/employees/:_id
router.delete("/api/employees/:_id", async (request: Request, response: Response, next: NextFunction) => {
  try {
      const _id = request.params._id;
      await employeesService.deleteEmployee(_id);
      response.json(200);
  }
  catch (err: any) {
      next(err);
  }
});


export default router;