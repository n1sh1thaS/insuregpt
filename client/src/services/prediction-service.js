import axios from "axios";
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

export const getPrediction = async (data) => {
  const input = {
    "Coverage Index": coverageOptions.indexOf(data.coverage),
    "Education Index": educationOptions.indexOf(data.educationLevel),
    "Employment Status Index": employmentOptions.indexOf(data.employmentStatus),
    "Location Index": locationOptions.indexOf(data.location),
    "Marital Status Index": maritalOptions.indexOf(data.maritalStatus),
    "Vehicle Class Index": vehicleClassOptions.indexOf(data.vehicleClass),
    "Vehicle Size Index": vehicleSizeOptions.indexOf(data.vehicleSize),
  };
  input["Gender"] = genderOptions.indexOf(data.gender);
  try {
    const res = await axios.post("http://localhost:5000/predict", input);
    const { prediction } = res.data;
    return prediction[0];
  } catch (err) {
    throw new Error(err.message);
  }
};
