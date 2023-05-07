import mongoose from "mongoose";

// 1. create an interface:
export interface IEmployeeModel extends mongoose.Document {
  // no need for id here
   firstName: string;
   lastName: string;
   title: string;
   birthDate: string;
   country: string;
   city: string;
   address: string;
}

// 2. instead of constructor we have postSchema provided by mongoose:
export const EmployeeSchema = new mongoose.Schema<IEmployeeModel>({
  firstName: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "First name is required."],
    minlength: [2, "First name too short."],
    maxlength: [100, "First name too long."]
  },
  lastName: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Last name is required."],
    minlength: [2, "Last name too short."],
    maxlength: [100, "Last name too long."]
  },
  title: {
    type: String,
    trim: true,
    unique: false,
    required: [true, "Title is required."],
  },
  birthDate: { 
    type: String,
    // type: Date,
    // validate: function(input: any): boolean {
    //     // return true only if the input is a valid date:
    //     return typeof new Date(input) as any instanceof Date;
    // },
    // message: (input: any) => `${input} must be a valid date!`
  }, //data tem de ser superior a data atual
  country: {
    type: String,
    trim: true,
    unique: false,
    required: [true, "Country is required."],
  },
  city: {
    type: String,
    trim: true,
    unique: false,
    required: [true, "City is required."],
  },
  address: {
    type: String,
    trim: true,
    unique: false,
    required: [true, "Address is required."],
  }
}, {
  versionKey: false
})

// 3. exporting model
export const EmployeeModel = mongoose.model<IEmployeeModel>("EmployeeModel", EmployeeSchema, "employees"); // model name, validation and collection name