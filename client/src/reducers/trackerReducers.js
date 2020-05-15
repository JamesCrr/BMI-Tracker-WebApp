import {
    SUBMIT_BMI_DATA
} from "../actions/types";


const initialState = {
    submitCount: 0
};

export default function (state = initialState, action) {
    switch(action.type){
        case SUBMIT_BMI_DATA:
            return {
                ...state,
                submitCount: state.submitCount + 1
            };
        default:
            return state;
    }
}