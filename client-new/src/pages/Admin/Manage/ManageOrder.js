import { useEffect, useState } from "react";
import AdminHeader from "../AdminHeader/AdminHeader"
import Navigators from "../Navigators/Navigators"
import './ManageOrder.scss'
import {Modal, Button} from 'react-bootstrap';
import { getAllOrderService } from "../../../service/AdminService"
import { deleteOrderService } from "../../../service/OrderService"
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

const ManageOrder = () => {
    const [dataOrder, setDataOrder] = useState([])
    const [totalOrder, setTotalOrder] = useState(0)
    const [showDelete, setShowDelete] = useState(false)
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [idDeleteProduct, setIdDeleteProduct] = useState("")
    const [detailOrder, setDetailOrder] = useState({})
    const [maxPage, setMaxPage] = useState(0)
    const [page, setPage] = useState(0)

    const handleShowDelete = (orderId) => {
        setIdDeleteProduct(orderId)
        setShowDelete(true)
    }
    
    const handleCloseDelete = () => {
        setShowDelete(false)
        setIdDeleteProduct("")
    };

    const handleShowDetailModal = (order) => {
        setShowDetailModal(true)
        setDetailOrder(order)
    }
    
    const handleCloseDetailModal = () => {
        setShowDetailModal(false)
        setDetailOrder({})
    };


    useEffect(() => {
        getAllOrder(page)
    }, [page])

    const getAllOrder = async (page) => {
        let res = await getAllOrderService(page)

        if(res && res.status === 'OK' && res.data) {
            setDataOrder(res.data)
            setTotalOrder(res.totalOrder)
            setMaxPage(res.maxPage)
        }else {
            toast.error("Server đang gặp sự cố! Vui lòng thử lại sau")
        }
    }

    

    const handleDeleteOrder = async () => {
        if(idDeleteProduct) {
            let res = await deleteOrderService(idDeleteProduct)

            if(res && res.status === 'OK') {
                toast.success("Xóa đơn hàng thành công!")
                handleCloseDelete()
                getAllOrder()
            }
        }else {
            toast.error("Không tồn tại id order!")
            handleCloseDelete()
        }
    }

    const handlePageClick = (event) => {
        if(event) {
            setPage(event.selected)
        }
    }

    return (
        <div className="container-manage-order">
            <AdminHeader />
            <Navigators />
            <div className="manage-order-content">
                <div className="container">
                <div className="heading">
                    <h3 className="manage-order-heading">Quản lý đơn hàng</h3>
                </div>
                <table className="table-order-users">
                    <thead>
                        <tr>
                            <th>Tên người dùng</th>
                            <th style={{width: '300px'}}>Tên sản phẩm</th>
                            <th>Hình ảnh</th>
                            <th>Đơn Giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                            <th>Trạng thái</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataOrder && dataOrder.length > 0 &&
                            dataOrder.map((item, index) => {
                                let status
                                if(item.orderItems?.status === 'S1') {
                                    status = "Đang chờ"
                                }else if(item.orderItems?.status === 'S2') {
                                    status = "Hoàn thành"
                                }else {
                                    status = "Đã hủy"
                                }
                                return (
                                    <tr key={item._id}>
                                        <td>{item.orderItems.user?.name}</td>
                                        <td>{item.orderItems.product?.name}</td>
                                        <td>
                                            <img className="image-order" src={item.orderItems.product?.image} alt="Hình ảnh sản phẩm"/>
                                        </td>
                                        <td>{item.orderItems.product?.price}</td>
                                        <td>{item.orderItems?.amount}</td>
                                        <td>{item.orderItems.product?.price * item.orderItems?.amount}</td>
                                        <td>{status}</td>
                                        <td>
                                            <button className="btn btn-primary view"
                                                onClick={() => handleShowDetailModal(item)}
                                            >Chi tiết</button>
                                            <button className="btn btn-warning update"
                                                // onClick={() => handleShowUpdate(item)}
                                            >Sửa</button>
                                            <button className="btn btn-danger delete"
                                                onClick={() => handleShowDelete(item._id)}
                                            >Xóa</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="panigate my-4">
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={maxPage ? maxPage : 5}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
                </div>
           </div>
           {/* modal delete  */}
           <Modal show={showDelete} onHide={handleCloseDelete} dialogClassName="modal-create-product">
                <Modal.Header closeButton>
                <Modal.Title>Xóa đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <h3>Bạn đã chắc chắn xóa đơn hàng này không?</h3>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" 
                onClick={handleCloseDelete}
                >
                    Close
                </Button>
                <Button variant="danger" 
                    onClick={handleDeleteOrder}
                >
                    Xóa
                </Button>
                </Modal.Footer>
           </Modal>

           {/* Modal detail */}
           <Modal 
           show={showDetailModal} onHide={handleCloseDetailModal} 
           dialogClassName="modal-create-product">
                <Modal.Header closeButton>
                <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="detail-order">
                            {detailOrder 
                                ?
                                <div className="row">
                                    <div className="col-6 item">
                                        <label>Email</label>
                                        <span>{detailOrder.orderItems?.user?.email}</span>
                                    </div>
                                    <div className="col-6 item">
                                        <label>Tên người dùng:</label>
                                        <span>{detailOrder.orderItems?.user?.name}</span>
                                    </div>
                                    <div className="col-6 item">
                                            <label>Tên Sản phẩm:</label>
                                            <span>{detailOrder.orderItems?.product?.name}</span>
                                    </div>
                                    <div className="col-6 item image">
                                        <img src={detailOrder.orderItems?.product?.image} alt="Hình ảnh sản phẩm" />
                                    </div>
                                    <div className="col-12 item">
                                        <label>Mô tả:</label>
                                        <span>{detailOrder.orderItems?.product?.description}</span>
                                    </div>
                                    <div className="col-6 item">
                                        <label>Giá cả:</label>
                                        <span>{detailOrder.orderItems?.product?.price}</span>
                                    </div>
                                    <div className="col-6 item">
                                        <label>Số lượng:</label>
                                        <span>{detailOrder.orderItems?.amount}</span>
                                    </div>
                                    <div className="col-6 item">
                                        <label>Thành tiền:</label>
                                        <span>{detailOrder.orderItems?.product?.price * detailOrder.orderItems?.amount}</span>
                                    </div>
                                    <div className="col-6 item">
                                        <label>Hình thức thanh toán:</label>
                                        <span>{detailOrder?.paymentMethod}</span>
                                    </div>
                                    <div className="col-6 item">
                                        <label>Ngày tạo:</label>
                                        <span>{detailOrder?.createdAt}</span>
                                    </div>
                                    <div className="col-6 item">
                                        <label>Ngày cập nhật:</label>
                                        <span>{detailOrder?.updatedAt}</span>
                                    </div>
                                </div>
                                :
                                <div>...loading</div>
                            }
                            
                        </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" 
                onClick={handleCloseDetailModal}
                >
                    Close
                </Button>
                </Modal.Footer>
           </Modal>


        </div>
    )
}

export default ManageOrder