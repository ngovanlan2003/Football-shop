import actionTypes from "../actions/actionType";

const initState = {
    users: ['']
}
const adminReducers = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = []
            return {
                ...state
            }
        
        default:
            return state;
    }
}

export default adminReducers