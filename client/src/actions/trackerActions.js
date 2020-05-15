import axios from "axios";
import {
    SUBMIT_BMI_DATA
} from "./types";

// Submit BMI Data 
export const submitBMIData = (bmiData) => dispatch => {
    axios
      .post("/api/bmi/logbmi", bmiData)
      .then(res => {
          // console.log(res);
          // reload graph
          dispatch({
            type: SUBMIT_BMI_DATA
          })
      }) 
      .catch(err => {
        console.log(err);
      });
};
