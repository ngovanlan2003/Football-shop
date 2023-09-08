import { useState } from 'react'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import './DetailProduct.scss'
import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getDetailProduct } from '../../../service/ProductService'
import { toast } from 'react-toastify'
import jwt_decode from "jwt-decode";
import { addNewOrderService, addNewCartService } from "../../../service/OrderService"
import { connect } from "react-redux"
import * as actions from '../../../store/actions'
import LikeButton from '../../../components/LikeButton/LikeButton'
import Comment from '../../../components/Comment/Comment'
import { initFackBookSdk } from '../../../ultis'

const DetailProduct = (props) => {
    const [quanlityProduct , setQuanlityProduct] = useState(1)
    const [product, setProduct] = useState({})
    const [payment, setPaymemt] = useState("")
    const { id } = useParams();
    const location = useLocation()

    useEffect(() => {
        initFackBookSdk()
    }, [])

    useEffect(() => {
        fetchDetailProduct()
    }, [])

   const fetchDetailProduct = async () => {
        if(id) {
            let res = await getDetailProduct(id)
            if(res && res.status === 'OK' && res.data) {
                setProduct(res.data)
            }
        }
   }
   
    const handleClickDownQuanliy = () => {
        if(quanlityProduct !== 1) {
            setQuanlityProduct(quanlityProduct - 1)
        }
    }

    const handleClickUpQuanliy = () => {
        setQuanlityProduct(quanlityProduct + 1)
    }
 
    const handleOnChangePayment = (e) => {
        if(e.target.value !== "Hình thức thanh toán") {
            setPaymemt(e.target.value)
        }else {
            setPaymemt("")
        }
    }

    const handleClickInsertCart = async () => {
        let access_token = localStorage.getItem("access_token")
        if(!access_token) {
            toast.error("Bạn chưa đăng nhập")
        }else {
            if(!quanlityProduct || !props.user.idUser || !id) {
                toast.error("Không thể thêm vào giỏ hàng")
                return
            }else {

                if(quanlityProduct > product.countInStock) {
                    toast.error("Số lượng hàng còn lại k đủ!")
                    return
                }

                let cart = {
                    amount: quanlityProduct,
                    product: id,
                    user: props.user.idUser
                }
                
                let newCart = await addNewCartService(cart)       
                 
                if(newCart && newCart.status === 'OK') {
                    toast.success("Thêm vào giỏ hàng thành công")
                }else {
                    toast.error("Thêm vào giỏ hàng thất bại")
                }
            }
        }
    }

    const handleClickBuyProduct = async () => {
        let access_token = localStorage.getItem("access_token")
        if(!access_token) {
            toast.error("Bạn chưa đăng nhập")
        }else {
            if(!quanlityProduct || !payment || !props.user.idUser || !id) {
                toast.error("Bạn chưa chọn hình thức thanh toán")
                return
            }

            if(quanlityProduct > product.countInStock) {
                toast.error("Số lượng hàng còn lại k đủ!")
                return
            }

            let order = {
                orderItems: {
                    amount: quanlityProduct,
                    status: 'S1',
                    product: id,
                    user: props.user.idUser
                },
                paymentMethod: payment
            }

            let newOrder = await addNewOrderService(order)       
             
            if(newOrder && newOrder.status === 'OK') {
                toast.success("Mua hàng thành công")
            }else {
                toast.error("Mua hàng thất bại")
            }
        }
    }

    return (
        <div className='detail-product-container'>
            <Header />
            <div className='container'>
            <div className='detail-product-content'>
                    <h3>Chi tiết sản phẩm</h3>
                    <div className='row'>
                        {product ? 
                            <>
                                <div className='col-5 content-left'>
                                    <img src={product.image} alt='Sản phẩm'/>
                                </div>
                                <div className='col-7'>
                                    <div className='content-right'>
                                        <span className='name-product'>{product.name}</span>
                                        <span className='price-product'>{product.price}</span>
                                        <div className='quanlity-product'>
                                            <label>Số lượng</label>
                                            <span className='down' onClick={() => handleClickDownQuanliy()}>-</span>
                                            <span className='show'>{quanlityProduct}</span>
                                            <span className='increase' onClick={() => handleClickUpQuanliy()}>+</span>
                                        </div>
                                        <div className='shipping'>
                                            <label>Vận chuyển:</label>
                                            <div className='list-item'>
                                                <div className='item'>
                                                    <span className='title'> Vận chuyển tới:</span>
                                                    <span>Hà lam</span>
                                                </div>
                                                <div className='item'>
                                                    <span className='title'>Phí vận chuyển:</span>
                                                    <span>0đ</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='payment' onChange={(e) => handleOnChangePayment(e)}>
                                            <label>Hình thức thanh toán</label>
                                            <div className='list'>
                                                <select>
                                                    <option>Hình thức thanh toán</option>
                                                    <option>Thanh toán khi nhận hàng</option>
                                                    <option>Paypal</option>
                                                </select>
                                            </div>
                                        </div>
                                        <LikeButton dataHref="https://developers.facebook.com/docs/plugins/" />
                                        <div className='btn-product'>
                                            <button className='btn btn-danger btn-cart-product'
                                                onClick={() => handleClickInsertCart()}
                                            >Thêm vào giỏ hàng</button>
                                            <button className='btn btn-danger btn-buy-product'
                                                onClick={() => handleClickBuyProduct()}
                                            >Mua hàng</button>
                                            <span className='stock'>Có sẵn: {product.countInStock}</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                            : 
                            <span className='loading'>...Loading</span>
                        }
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='description'>
                    <h3>
                        Mô tả sản phẩm
                    </h3>
                    {product &&
                        <div>{product.description}</div>
                    }
                </div>
            </div>
            <Comment dataHref="https://developers.facebook.com/docs/plugins/comments#configurator" width="1296" />
            <Footer />
        </div>
    )
}

function mapStateToProps (state) {
    return  {
        user: state.users
    }
}

function mapDispatchToProps (dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct)