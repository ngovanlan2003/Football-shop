import actionTypes from "../actions/actionType";

const initState = {
    users: [''],
    maxPage: 0
}
const adminReducers = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            const {data, maxPage} = action.data
            state.users = data
            state.maxPage = maxPage
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