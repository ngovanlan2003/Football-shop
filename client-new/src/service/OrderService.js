import axios from './CustomizeAxios'

const addNewOrderService = (newOrder) => {
    return axios.post(`/order/create-order`, newOrder)
}

const addNewCartService = (newCart) => {
    return axios.post(`/order/create-cart`, newCart)
}

const getAllCartService = (user) => {
    return axios.get(`/order/get-all-cart/${user}`)
}

const deleteOrderService = (idOrder) => {
    return axios.delete(`/order/delete-order/${idOrder}`)
}

const getDetailOrderService = (idOrder) => {
    return axios.get(`/order/get-detail-order/${idOrder}`)
}

const deleteCartService = (id) => {
    return axios.delete(`/order/delete-cart/${id}`)
}

const getAllOrderUserService = (id) => {
    return axios.get(`/order/get-all-order-user/${id}`)
}

const confirmOrderService = (id) => {
    return axios.put(`/order/confirm-order/`, {id: id})
    
}

export {
    addNewOrderService,
    addNewCartService,
    getAllCartService,
    deleteOrderService,
    getDetailOrderService,
    deleteCartService,
    getAllOrderUserService,
    confirmOrderService
}