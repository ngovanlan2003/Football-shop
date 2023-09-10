import axios from './CustomizeAxios'

const axiosJwt = axios.create()

const getAllUserService = (page) => {
    return axios.get(`/user/get-all-user?page=${page}`)
}

const addNewUserService = (user) => {
    return axios.post('/user/create-user' , user)
}

const updateUserService = (userId, user) => {
    return axios.put(`/user/update-user/${userId}`, user)
}

const deleteUserService = (id) => {
    return axios.delete(`/user/delete-user/${id}`)
}

const registerUserService = (newUser) => {
    return axios.post(`/user/register-user/`, newUser)
}

const verifyEmailService = (data) => {
    return axios.post(`/user/verify-email/`, data)
}

const loginUserService = (loginUser) => {
    return axios.post(`/user/sign-in/`, loginUser)
}

const getDetailUser = (userId, access_token) => {
    return axiosJwt.get(`/user/get-detail-user/${userId}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
}

const refreshToken = () => {
    return axios.post(`/user/refresh-token`, {
        withCredentials: true
    })
}

const logoutUser = () => {
    return axios.post(`/user/logout`)
}

const updatePasswordService = (data) => {
    return axios.post(`/user/update-password`, data)
}

export {
    getAllUserService,
    addNewUserService,
    deleteUserService,
    registerUserService,
    loginUserService,
    getDetailUser,
    refreshToken,
    updateUserService,
    axiosJwt,
    logoutUser,
    verifyEmailService,
    updatePasswordService
}