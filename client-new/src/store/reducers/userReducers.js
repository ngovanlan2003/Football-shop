import actionTypes from "../actions/actionType";

const initState = {
    idUser: '',
    name: '',
    email: '',
    avatar: '',
    access_token: '',
    refresh_token: '',
    isAdmin: false
}
const userReducers = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_USER_SUCCESS: 
            const {name, email, avatar,refresh_token, access_token, _id, isAdmin} = action.data
            state.idUser = _id
            state.name = name
            state.email = email
            state.avatar = avatar
            state.access_token = access_token
            state.refresh_token = refresh_token
            state.isAdmin = isAdmin
            return {
                ...state
            }
        case actionTypes.GET_ALL_USER_ERROR: 
            return {
                ...state
            }
        case actionTypes.GET_ALL_USER_ERROR: 
            return {
                ...state
            }
        case actionTypes.RESET_USER: 
            state.idUser = ''
            state.name = ''
            state.email = ''
            state.avatar = ''
            state.access_token = ''
            state.refresh_token = ''
            state.isAdmin = false
            return {
                ...state
            } 
        default:
            return state;
    }
}

export default userReducers