import {
    LOCAL_BMI_UPDATE
} from "./types";

// Calculated BMI locally
export const calculatedBMILocal = (newBMI) => dispatch => {
    dispatch({
        type: LOCAL_BMI_UPDATE,
        payload: newBMI.bmi
    })
}