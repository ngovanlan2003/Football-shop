import actionTypes from './actionType'
import { getDetailUser } from '../../service/UserService'

export const fetchDetailUser =  (id, token) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDetailUser(id, token)
            if(res && res.statusText === 'OK') {
                let data = {...res.data.data, access_token: token}
                dispatch(getDetailUserSuccess(data))
            }else {
                dispatch(getDetailUserError())
            }
        } catch (error) {
            dispatch(getDetailUserError())
            console.log('Error get all users: '. error);
        }
    }
}

export const getDetailUserSuccess = (userData) => ({
    type: actionTypes.GET_ALL_USER_SUCCESS,
    data: userData
})

export const getDetailUserError = () => ({
    type: actionTypes.GET_ALL_USER_ERROR
})

export const resetUser = () => ({
    type: actionTypes.RESET_USER
})