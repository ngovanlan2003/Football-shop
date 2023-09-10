import axios from './CustomizeAxios'

const getAllProductService = (page) => {
    return axios.get(`/product/get-all-product?page=${page}`)
}

const addNewProductService = (product) => {
    return axios.post(`/product/create-product`, product)
}

const deleteProductService = (productId) => {
    return axios.delete(`/product/delete-product/${productId}`)
}
const updateProductService = (product) => {
    return axios.put(`/product/update-product/${product._id}`, product)
} 

const getAllProductServiceType = (type, page) => {
    return axios.get(`/product/get-all-product-type?type=${type}&page=${page}`)
}

const getAllProductServiceTypeHomePage = (type, page) => {
    return axios.get(`/product/get-all-product-type?type=${type}&limit=12&page=${page}`)
}

const getDetailProduct = (id) => {
    return axios.get(`/product/get-detail-product/${id}`)
}

const getAllProductsMore = (type) => {
    return axios.get(`/product/get-all-product-more?type=${type}`)
}

const getAllProductSearch = (keySearch) => {
    return axios.get(`/product/get-all-product-search?search=${keySearch}`)
}

export {
    getAllProductService,
    addNewProductService,
    deleteProductService,
    updateProductService,
    getAllProductServiceType,
    getDetailProduct,
    getAllProductsMore,
    getAllProductSearch,
    getAllProductServiceTypeHomePage
}