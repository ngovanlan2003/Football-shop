import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './Cart.scss'
import * as actions from '../../store/actions'
import { connect } from "react-redux"
import { useState, useEffect } from 'react'
import _ from "lodash";  
import { addNewOrderService, deleteCartService, getAllOrderUserService } from '../../service/OrderService'
import { toast } from 'react-toastify'
import Order from './Order'

const Cart = (props) => {

    const {carts} = props.carts
    const [dataOrder, setDataOrder] = useState([])
    const [dataCart, setDataCart] = useState([])

    useEffect(() => {
        getAllOrderUser()
    }, [])

    const getAllOrderUser = async () => {
        if(props?.idUser) {
            let res = await getAllOrderUserService(props?.idUser)

            if(res && res.status === 'OK' && res.data) {
                setDataOrder(res.data)
                getAllOrderUser()
            }
        }
    }

    useEffect(() => {
        let cartsCopy = []
        if(carts) {
            for(let i = 0; i < carts.length; i++) {
                let obj = {...carts[i], selectCheckBox: false}
                cartsCopy.push(obj)
            }

            if(cartsCopy) {
                setDataCart(cartsCopy)
            }
        }
    }, [carts])

    const handleDeleteCart = async (id) => {
        if(id) {
            let res = await deleteCartService(id)
            if(res && res.status === 'OK') {
                toast.success("Bạn đã xóa thành công!")
                await props.getAllCart(props.idUser)
            }else {
                toast.error("Lỗi từ server!")
            }
        }else {
            toast.error("Không thể xóa bro!")
        } 
    }

    const handleClickNewOrder = async (item) => {
        let order = {
            orderItems: {
                amount: item.amount,
                status: 'S1',
                product: item.product._id,
                user: item.user
            },
            paymentMethod: "Thanh toán khi nhận hàng"
        }

        let newOrder = await addNewOrderService(order)       
             
        if(newOrder && newOrder.status === 'OK') {
            toast.success("Mua hàng thành công")
            getAllOrderUser()
        }else {
            toast.error("Mua hàng thất bại")
        }
    }

    return (
        <div className='container-cart'>
            <Header />
            <div className='wrapper-cart'>
                <div className='header '>
                    <h3 className='container'>Giỏ hàng</h3>
                </div>
                <div className='container'>
                    
                </div>
                <div className='content-cart'>
                    <div className='container '>
                        <div className='order-container'>
                            <span className='heading'>Giỏ hàng</span>
                            <table className="table-order-users">
                                <thead>
                                    <tr>
                                        <th>Tên sản phẩm</th>
                                        <th>Hình ảnh</th>
                                        <th>Đơn Giá</th>
                                        <th>Số lượng</th>
                                        <th>Thành tiền</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataCart.map((item, index) => {
                                        // let amount = item?.amount
                                        return (
                                            <tr key={item._id}>
                                                <td>{item.product?.name}</td>
                                                <td>
                                                    <img className="image-order" src={item.product?.image} alt="Hình ảnh sản phẩm"/>
                                                </td>
                                                <td>{item.product?.price}</td>
                                                <td>  
                                                    {/* <input type="text"
                                                        value={amount}
                                                        onChange={(e) => amount = e.target.value}
                                                    /> */}
                                                    {item?.amount}
                                                    </td>
                                                <td>
                                                    {item.product?.price * item?.amount}
                                                </td>
                                                <td>
                                                    <button className="btn btn-primary mx-2 view"
                                                        onClick={() => handleClickNewOrder(item)}
                                                    >Đặt hàng</button>
                                                    <button className="btn btn-warning view"
                                                        // onClick={() => handleShowConfirm(item._id)}
                                                    >Cập nhật</button>
                                                    <button className="btn btn-danger delete"
                                                        onClick={() => handleDeleteCart(item._id)}
                                                    >Xóa</button>
                                                </td>
                                            </tr>
                                        )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        {/* đơn hàng đã đặt */}
                        <Order  dataOrder={dataOrder}
                                getAllOrderUser={getAllOrderUser}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

function mapStateToProps (state) {
    return  {
        carts: state.order,
        idUser: state.users.idUser,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getAllCart: (id) => dispatch(actions.getAllCartFromAction(id))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)