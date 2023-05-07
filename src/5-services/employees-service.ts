import { ResourceNotFoundError, ValidationError } from "../2-models/client-errors";
import { EmployeeModel, IEmployeeModel } from "../2-models/employee-model";

async function getAllEmployees(): Promise<IEmployeeModel[]>{
  const employees = await EmployeeModel.find().exec();
  return employees;
}

async function getOneEmployee(_id: string): Promise<IEmployeeModel>{
  const employee = await EmployeeModel.findById(_id).exec();
  if (!employee) throw new ResourceNotFoundError(_id);
  return employee;
}

async function addEmployee(employee: IEmployeeModel): Promise<IEmployeeModel>{
  const error = employee.validateSync();
  if (error) throw new ValidationError(error.message);
  return employee.save();
}

async function updateEmployee(employee: IEmployeeModel): Promise<IEmployeeModel>{
  const error = employee.validateSync();
  if (error) throw new ValidationError(error.message);
  const updatedEmployee = await EmployeeModel.findByIdAndUpdate(employee._id, employee, { returnOriginal: false }).exec();
  return updatedEmployee;
}

async function deleteEmployee(_id: string): Promise<void>{
  const employeeToDelete = await EmployeeModel.findByIdAndDelete(_id).exec();
  if (!employeeToDelete) throw new ResourceNotFoundError(_id);
}

export default {
  getAllEmployees,
  getOneEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
}