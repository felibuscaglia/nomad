import { ReduxState } from "../../shared/interfaces";
import { SET_ALL_CITIES } from "../actions";

const initialState: ReduxState = {
    cities: []
}

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    switch (action.type) {
        case SET_ALL_CITIES:
            return {
                ...state,
                cities: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;