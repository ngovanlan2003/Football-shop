import axios from './CustomizeAxios'

const getAllOrderService = () => {
    return axios.get(`/order/get-all-order`)
}

export {
    getAllOrderService
}