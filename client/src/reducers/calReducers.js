import {
    LOCAL_BMI_UPDATE
} from "../actions/types";

const initialState = {
    localBMI: 0
};

export default function (state = initialState, action) {
    switch(action.type){
        case LOCAL_BMI_UPDATE:
            return {
                ...state,
                localBMI: action.payload
            };
        default:
            return state;
    }
}