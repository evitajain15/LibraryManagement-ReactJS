import { SET_CURRENT_USER, GET_STUDENT } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
    isAuthenticated: false,
    user: {},
    studentData: []
}

export default function(state = (initialState), action ) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case GET_STUDENT:
                return {
                    ...state,
                    studentData: action.payload
                };
        default: 
            return state;
    }
}