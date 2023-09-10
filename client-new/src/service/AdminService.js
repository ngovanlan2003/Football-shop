import axios from './CustomizeAxios'

const getAllOrderService = (page) => {
    return axios.get(`/order/get-all-order?page=${page}`)
}

export {
    getAllOrderService
}