import actionTypes from "../actions/actionType";

const initState = {
    carts: [],
    totalCart: 0
}
const orderReducers = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_CART_SUCCESS: 
            const {data, totalCart} = action.data
            state.carts = data
            state.totalCart = totalCart
            return {
                ...state
            }
        case actionTypes.GET_ALL_CART_ERROR: 
            return {
                ...state
        }
        default:
            return state;
    }
}

export default orderReducers