import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DropDown from "./DropDown";
import PredictionDisplay from "./PredictionDisplay";
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
import { schema } from "../validation/prediction-validation";
import { getPrediction } from "../services/prediction-service";

const PredictionForm = () => {
  const [quote, setQuote] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const premiumQuote = await getPrediction(data);
      setQuote(premiumQuote);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={2.5}
      sx={{ minWidth: "40%", maxWidth: "40%" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          sx={{ minWidth: "10%", maxWidth: "100%" }}
        >
          <DropDown
            key={1}
            label="Coverage"
            options={coverageOptions}
            varName="coverage"
            register={register}
            errors={errors}
          />
          <DropDown
            key={2}
            label="Education Level"
            options={educationOptions}
            varName="educationLevel"
            register={register}
            errors={errors}
          />
          <DropDown
            key={3}
            label="Employment Status"
            options={employmentOptions}
            varName="employmentStatus"
            register={register}
            errors={errors}
          />
          <DropDown
            key={4}
            label="Location"
            options={locationOptions}
            varName="location"
            register={register}
            errors={errors}
          />
          <DropDown
            key={5}
            label="Gender"
            options={genderOptions}
            varName="gender"
            register={register}
            errors={errors}
          />
          <DropDown
            key={6}
            label="Marital Status"
            options={maritalOptions}
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
            options={vehicleClassOptions}
            varName="vehicleClass"
            register={register}
            errors={errors}
          />
          <DropDown
            key={8}
            label="Vehicle Size"
            options={vehicleSizeOptions}
            varName="vehicleSize"
            register={register}
            errors={errors}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </form>
      {quote && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <PredictionDisplay quote={quote} />{" "}
        </Box>
      )}
    </Box>
  );
};

export default PredictionForm;
