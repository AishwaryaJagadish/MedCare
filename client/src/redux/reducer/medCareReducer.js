import * as actionTypes from '../actions/type';

const initialState = {
    user: null,
    isFetching: false, 
    error : false, 
    accesstoken: null
}

export const medCareReducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.LOGIN_START:
            case actionTypes.LOGIN_START:
            return {
                ...state,
                user: null,
                isFetching: true,
                error: false
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                accesstoken: action.payload.token,
                isFetching: false,
                error: false
            }
        case actionTypes.LOGIN_FAILURE:
            return {
                ...state,
                user: null,
                isFetching: false,
                error: true
            }
        case actionTypes.LOGOUT_USER:
            return initialState
        default:
            return state;
    }
}