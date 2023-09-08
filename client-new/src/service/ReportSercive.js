import axios from './CustomizeAxios'

const getAllReportService =  () => {
    return axios.get("/report/get-all-report")
}

export {
    getAllReportService
}