import actionTypes from './actionType'
import {getAllProductService, getAllProductServiceType, getAllProductServiceTypeHomePage } from '../../service/ProductService'
import { toast } from 'react-toastify'

export const getAllProduct = (type, page) => {
    return async (dispatch, getState) => {
        try {
            let res
            if(type) {
                res = await getAllProductServiceType(type, page)
            }else {
                res = await getAllProductService(page)
            }
            if(res && res.status === 'OK') {
                dispatch(fetchAllProductSuccess(res))
            }else {
                dispatch(fetchAllProductFailed())
            }
        } catch (error) {
            dispatch(fetchAllProductFailed())
            console.log('Error get all users: '. error);
        }
    }
}

export const fetchAllProductSuccess = (productsData) => ({
    type: actionTypes.FETCH_ALL_PRODUCT_SUCCESS,
    data: productsData.data,
    maxPage: productsData.maxPage,
    pageCurrent: productsData.pageCurrent,
    totalProduct: productsData.totalProduct,
})

export const fetchAllProductFailed = () => ({
    type: actionTypes.FETCH_ALL_PRODUCT_SUCCESS
})

export const getProductsType = (type, page) => {
    return async (dispatch, getState) => {
        try{
            let res = await getAllProductServiceTypeHomePage(type, page)
            if(res && res.status === 'OK') {
                dispatch(fetchProductsTypeSuccess(res.data, type, res.maxPage))
            }else {
                dispatch(fetchProductsTypeFailed())
            }

        }catch(e) {
            dispatch(fetchProductsTypeFailed())
        }
    }
}

export const fetchProductsTypeSuccess = (productsData, typeProduct, maxPage) => ({
    type: actionTypes.FETCH_ALL_PRODUCT_TYPE_SUCCESS,
    data: productsData,
    typeProducts: typeProduct,
    maxPage: maxPage
})

export const fetchProductsTypeFailed = () => ({
    type: actionTypes.FETCH_ALL_PRODUCT_TYPE_FAILED
})

