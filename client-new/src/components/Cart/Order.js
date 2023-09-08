import { toast } from 'react-toastify';
import './Cart.scss'
import {Modal, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react'
import { 
    getAllOrderUserService, 
    confirmOrderService,
    deleteOrderService } 
from '../../service/OrderService'
import * as actions from '../../store/actions'
import { connect } from "react-redux"

const Order = (props) => {
    const [showConfirm, setShowConfirm] = useState(false)
    const [idConfirmProduct, setIdConfirmProduct] = useState('')
    const [showDelete, setShowDelete] = useState(false)
    const [idDeleteOrder, setIdDeleteOrder] = useState('')

   

    const handleShowConfirm = (productId) => {
        setIdConfirmProduct(productId)
        setShowConfirm(true)
    }
    
    const handleCloseConfirm = () => {
        setShowConfirm(false)
    };

    const handleShowDelete = (productId) => {
        setIdDeleteOrder(productId)
        setShowDelete(true)
    }
    
    const handleCloseDelete = () => {
        setShowDelete(false)
    };

    const handleConfirmOrder = async () => {
        if(idConfirmProduct) {
            let res = await confirmOrderService(idConfirmProduct)
            
            if(res && res.status === 'OK') {
                toast.success("Cảm ơn bạn đã đặt hàng của chúng tôi!")
                props.getAllOrderUser()
                setShowConfirm(false)
            }
        }
    }

    const handleDeleteOrder = async () => {
        if(idDeleteOrder) {
            let res = await deleteOrderService(idDeleteOrder)

            if(res && res.status === 'OK') {
                toast.success("Bạn đã hủy đơn thành công!")
                props.getAllOrderUser()
                setShowDelete(false)
            }
        }
    }

    return (
        <div>
            {
                props.dataOrder && props.dataOrder?.length > 0 ?
                <div className='order-container white'>
                    <span className='heading'>Đơn hàng đã đặt</span>
                    <table className="table-order-users">
                        <thead>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <th>Hình ảnh</th>
                                <th>Đơn Giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                                <th>Nhận hàng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.dataOrder.map((item, index) => {
                                return (
                                    <tr key={item._id}>
                                        <td>{item.orderItems.product?.name}</td>
                                        <td>
                                            <img className="image-order" src={item.orderItems.product?.image} alt="Hình ảnh sản phẩm"/>
                                        </td>
                                        <td>{item.orderItems.product?.price}</td>
                                        <td>{item.orderItems?.amount}</td>
                                        <td>{item.orderItems.product?.price * item.orderItems?.amount}</td>
                                        <td>
                                            <button className="btn btn-warning view"
                                                onClick={() => handleShowConfirm(item._id)}
                                            >Xác nhận</button>
                                            <button className="btn btn-danger delete"
                                                onClick={() => handleShowDelete(item._id)}
                                            >Hủy đơn</button>
                                        </td>
                                    </tr>
                                )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                :
                <div>
                    Không có đơn hàng nào
                </div>
            }
            {/* modal confirm order*/}
            <Modal show={showConfirm} onHide={handleCloseConfirm} dialogClassName="modal-create-product">
                <Modal.Header closeButton>
                <Modal.Title>Xác nhận đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <h3>Bạn đã nhận được đơn hàng rồi phải không?</h3>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseConfirm}>
                    Close
                </Button>
                <Button variant="warning" 
                onClick={handleConfirmOrder}
                >
                    Xác nhận
                </Button>
                </Modal.Footer>
            </Modal>

            {/* modal delete order */}
            <Modal show={showDelete} onHide={handleCloseDelete} dialogClassName="modal-create-product">
                <Modal.Header closeButton>
                <Modal.Title>Xác đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <h3>Bạn có chắc chắn muốn hủy đơn hàng này không?</h3>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    Close
                </Button>
                <Button variant="danger" 
                onClick={handleDeleteOrder}
                >
                    Hủy đơn
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

function mapStateToProps (state) {
    return  {
        idUser: state.users.idUser,
    }
}

function mapDispatchToProps (dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)