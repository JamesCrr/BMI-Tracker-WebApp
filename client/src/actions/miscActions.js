import axios from "axios";
import {
    EDIT_LOG_DATE,
    SUBMIT_BMI_DATA
} from "./types";

// Toggle between editing or logging 
export const toggleEditOrLog = (newEditDateBool) => dispatch => {
    dispatch({
        type: EDIT_LOG_DATE,
        payload: newEditDateBool
    });
};

// Delete all of User's Logs
export const deleleUserLogs = (userData) => dispatch => {
    axios
    .post("/api/bmi/clearbmis", userData)
    .then(res => {
        console.log("BMI Data Cleared!");
        // reload graph
        dispatch({
          type: SUBMIT_BMI_DATA
        })
    }) 
    .catch(err => {
      console.log(err);
    });
}