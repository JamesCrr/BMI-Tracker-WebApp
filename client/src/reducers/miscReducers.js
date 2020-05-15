import {
    EDIT_LOG_DATE
} from "../actions/types";


const initialState = {
    editing: false
};

export default function (state = initialState, action) {
    switch(action.type){
        case EDIT_LOG_DATE:
            return {
                ...state,
                editing: action.payload
            };
        default:
            return state;
    }
}