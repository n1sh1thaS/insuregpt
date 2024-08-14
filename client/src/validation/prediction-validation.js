import { z } from "zod";
import {
  coverageOptions,
  educationOptions,
  locationOptions,
  genderOptions,
  maritalOptions,
  vehicleClassOptions,
  vehicleSizeOptions,
  employmentOptions,
} from "../config/prediction-config";

export const schema = z.object({
  coverage: z.enum(coverageOptions, {
    errorMap: () => ({ message: "Coverage type is required." }),
  }),
  educationLevel: z.enum(educationOptions, {
    errorMap: () => ({ message: "Education level is required." }),
  }),
  employmentStatus: z.enum(employmentOptions, {
    errorMap: () => ({ message: "Employment status is required." }),
  }),
  location: z.enum(locationOptions, {
    errorMap: () => ({ message: "Location is required." }),
  }),
  gender: z.enum(genderOptions, {
    errorMap: () => ({ message: "Gender is required." }),
  }),
  maritalStatus: z.enum(maritalOptions, {
    errorMap: () => ({ message: "Marital status is required." }),
  }),
  age: z
    .number({ invalid_type_error: "Age is required." })
    .gt(18, { message: "Age must be greater than 18." }),
  vehicleClass: z.enum(vehicleClassOptions, {
    errorMap: () => ({ message: "Vehicle class is required." }),
  }),
  vehicleSize: z.enum(vehicleSizeOptions, {
    errorMap: () => ({ message: "Vehicle size is required." }),
  }),
});
