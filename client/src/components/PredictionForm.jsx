import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DropDown from "./DropDown";
import axios from "axios";

const coverageOptions = ["Basic", "Extended", "Premium"];
const educationOptions = [
  "High School or Below",
  "College",
  "Bachelor's",
  "Master's",
  "Doctor",
];
const employmentOptions = [
  "Unemployed",
  "Employed",
  "Medical Leave",
  "Retired",
  "Disabled",
];
const locationOptions = ["Rural", "Suburban", "Urban"];
const genderOptions = ["Female", "Male"];
const maritalOptions = ["Single", "Married", "Divorced"];
const vehicleClassOptions = [
  "Two-Door Car",
  "Four-Door Car",
  "Sports Car",
  "Luxury Car",
  "SUV",
  "Luxury SUV",
];
const vehicleSizeOptions = ["Small", "Medium", "Large"];

const schema = z.object({
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
    errorMap: () => ({ message: "Locaiton is required." }),
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

const PredictionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const input = {
      "Coverage Index": coverageOptions.indexOf(data.coverage),
      "Education Index": educationOptions.indexOf(data.educationLevel),
      "Employment Status Index": employmentOptions.indexOf(
        data.employmentStatus
      ),
      "Location Index": locationOptions.indexOf(data.location),
      //Gender: genderOptions.indexOf(data.gender),
      "Marital Status Index": maritalOptions.indexOf(data.maritalStatus),
      "Vehicle Class Index": vehicleClassOptions.indexOf(data.vehicleClass),
      "Vehicle Size Index": vehicleSizeOptions.indexOf(data.vehicleSize),
    };
    input["Gender"] = genderOptions.indexOf(data.gender);
    //does not include age
    try {
      const res = await axios.post("http://localhost:5000/predict", input);
      const { prediction } = res.data;
      console.log(prediction);
      console.log(data);
    } catch (err) {
      console.log(data);
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        sx={{ minWidth: "10%", maxWidth: "40%" }}
      >
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
