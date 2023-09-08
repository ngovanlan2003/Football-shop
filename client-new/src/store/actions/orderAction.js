import actionTypes from './actionType'
import { getAllCartService } from '../../service/OrderService'
import { toast } from 'react-toastify'

export const getAllCartFromAction = (idUser) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCartService(idUser)
            if(res && res.status === 'OK') {
                dispatch(fetchAllCartSuccess(res))
            }else {
                dispatch(fetchAllCartFailed())
            }
        } catch (error) {
            dispatch(fetchAllCartFailed())
            console.log('Error get all users: '. error);
        }
    }
}

export const fetchAllCartSuccess = (cartData) => ({
    type: actionTypes.GET_ALL_CART_SUCCESS,
    data: cartData
})

export const fetchAllCartFailed = () => ({
    type: actionTypes.GET_ALL_CART_ERROR
})