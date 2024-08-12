import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DropDown from "./DropDown";

/*
    'Coverage': [Basic, Extended, Premium 0-2],
    'Education': [HS or below, College, Bachelor, Master, Doctor 0-4],
    'Employment Status': [Unemployed, Employed, Medical Leave, Retired, Disabled 0-4], #cheaper for unemployed
    'Location': [Rural, Suburban, Urban 0-2], #cheaper for urban area
    'Gender': [Female, Male 0,1 ], #cheaper for M
    'Marital Status': [Single, Married, Divorced 0-2],
    'Vehicle Class': [Two-Door Car, Four-Door Car, Sports Car, Luxury Car, SUV, Luxury SUV 0-5],
    'Vehicle Size': [Small, Medium, Large 0-2]
    'Age': [18+]
*/

const schema = z.object({
  coverage: z.enum(["Basic", "Extended", "Premium"], {
    errorMap: () => ({ message: "Coverage type is required." }),
  }),
  educationLevel: z.enum(
    ["High School or Below", "College", "Bachelor's", "Master's", "Doctor"],
    {
      errorMap: () => ({ message: "Education level is required." }),
    }
  ),
  employmentStatus: z.enum(
    ["Unemployed", "Employed", "Medical Leave", "Retired", "Disabled"],
    {
      errorMap: () => ({ message: "Employment status is required." }),
    }
  ),
  location: z.enum(["Rural", "Suburban", "Urban"], {
    errorMap: () => ({ message: "Locaiton is required." }),
  }),
  gender: z.enum(["Male", "Female"], {
    errorMap: () => ({ message: "Gender is required." }),
  }),
  maritalStatus: z.enum(["Single", "Married", "Divorced"], {
    errorMap: () => ({ message: "Marital status is required." }),
  }),
  age: z
    .number({ invalid_type_error: "Age is required." })
    .gt(18, { message: "Age must be greater than 18." }),
  vehicleClass: z.enum(
    [
      "Two-Door Car",
      "Four-Door Car",
      "Sports Car",
      "Luxury Car",
      "SUV",
      "Luxury SUV",
    ],
    {
      errorMap: () => ({ message: "Vehicle class is required." }),
    }
  ),
  vehicleSize: z.enum(["Small", "Medium", "Large"], {
    errorMap: () => ({ message: "Vehicle size is required." }),
  }),
});

const PredictionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column" gap={1}>
        <DropDown
          key={1}
          label="Coverage"
          options={["Basic", "Extended", "Premium"]}
          varName="coverage"
          register={register}
          errors={errors}
        />
        <DropDown
          key={2}
          label="Education Level"
          options={[
            "High School or Below",
            "College",
            "Bachelor's",
            "Master's",
            "Doctor",
          ]}
          varName="educationLevel"
          register={register}
          errors={errors}
        />
        <DropDown
          key={3}
          label="Employment Status"
          options={[
            "Unemployed",
            "Employed",
            "Medical Leave",
            "Retired",
            "Disabled",
          ]}
          varName="employmentStatus"
          register={register}
          errors={errors}
        />
        <DropDown
          key={4}
          label="Location"
          options={["Rural", "Suburban", "Urban"]}
          varName="location"
          register={register}
          errors={errors}
        />
        <DropDown
          key={5}
          label="Gender"
          options={["Male", "Female"]}
          varName="gender"
          register={register}
          errors={errors}
        />
        <DropDown
          key={6}
          label="Marital Status"
          options={["Single", "Married", "Divorced"]}
          varName="maritalStatus"
          register={register}
          errors={errors}
        />
        <TextField
          fullWidth
          error={!!errors.age}
          id="outlined-number"
          label="Age"
          min="18"
          type="number"
          {...register("age", { valueAsNumber: true })}
          helperText={errors.age && errors.age.message}
        />
        <DropDown
          key={7}
          label="Vehicle Class"
          options={[
            "Two-Door Car",
            "Four-Door Car",
            "Sports Car",
            "Luxury Car",
            "SUV",
            "Luxury SUV",
          ]}
          varName="vehicleClass"
          register={register}
          errors={errors}
        />
        <DropDown
          key={8}
          label="Vehicle Size"
          options={["Small", "Medium", "Large"]}
          varName="vehicleSize"
          register={register}
          errors={errors}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default PredictionForm;
