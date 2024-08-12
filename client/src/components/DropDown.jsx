import React from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
} from "@mui/material";

const DropDown = (props) => {
  const { label, options, varName, register, errors } = props;

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth error={!!errors[varName]}>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            {...register(varName)}
            label={label}
            defaultValue={""}
          >
            {options.map((option) => (
              <MenuItem value={option}>{option}</MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {errors[varName] && errors[varName].message}
          </FormHelperText>
        </FormControl>
      </Box>
    </>
  );
};

export default DropDown;
