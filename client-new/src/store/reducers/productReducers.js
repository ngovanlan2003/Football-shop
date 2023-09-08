import actionTypes from "../actions/actionType";

const initState = {
    products: [],
    clothesClub: [],
    clothesNation: [],
    shoes: [],
    backpacks: [],
    maxPage: 0,
    pageCurrent: 0,
    totalProduct: 0,
    maxPage: 0
}
const productReducers = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_PRODUCT_SUCCESS:
            state.products = action.data
            state.maxPage = action.maxPage
            state.pageCurrent = action.pageCurrent
            state.totalProduct = action.totalProduct

            return {
                ...state
            }
        case actionTypes.FETCH_ALL_PRODUCT_FAILED:
            state.products = []
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_PRODUCT_TYPE_SUCCESS:
            let type = action.typeProducts
            if(type === 'P1') {
                state.clothesClub = action.data
                state.maxPage = (action.maxPage > state.maxPage ? action.maxPage : state.maxPage)
            }else if(type === 'P2') {
                state.clothesNation = action.data
                state.maxPage = (action.maxPage > state.maxPage ? action.maxPage : state.maxPage)
            }else if(type === 'P3') {
                state.shoes = action.data
                state.maxPage = (action.maxPage > state.maxPage ? action.maxPage : state.maxPage)
            }else if(type === 'P4') {
                state.backpacks = action.data
                state.maxPage = (action.maxPage > state.maxPage ? action.maxPage : state.maxPage)
            }
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_PRODUCT_TYPE_FAILED:
            if(type === 'P1') {
                state.clothesClub = []
            }else if(type === 'P2') {
                state.clothesNation = []
            }else if(type === 'P3') {
                state.shoes = []
            }else if(type === 'P4') {
                state.backpacks = []
            }
            return {
                ...state
            }
        default:
            return state;
    }
}

export default productReducers