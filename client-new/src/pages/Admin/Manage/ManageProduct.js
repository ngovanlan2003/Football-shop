import AdminHeader from "../AdminHeader/AdminHeader"
import Navigators from "../Navigators/Navigators"
import { connect } from "react-redux"
import * as actions from '../../../store/actions'
import { useEffect, useState } from "react"
import './ManageProduct.scss'
import {Modal, Button} from 'react-bootstrap';
import { toast } from "react-toastify"
import ReactPaginate from 'react-paginate';
import { addNewProductService, deleteProductService, updateProductService} from "../../../service/ProductService"
import FileBase64 from 'react-file-base64';

const ManageProduct = (props) => {
    const [show, setShow] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [countInStock, setcountInStock] = useState(0)
    const [image, setImage] = useState('')
    const [type, setType] = useState('P1')
    const [typeHeading, setTypeHeading] = useState("")
    const [idDeleteProduct, setIdDeleteProduct] = useState(0)
    const [productUpdate, setProductUpdate] = useState({})
    const [page, setPage] = useState(0)

    const handleShowCreate = () => setShow(true)
    const handleClose = () => setShow(false);

    const handleShowDelete = (productId) => {
        setIdDeleteProduct(productId)
        setShowDelete(true)
    }
    
    const handleCloseDelete = () => {
        setShowDelete(false)
    };

    const handleShowUpdate = (product) => {
        setName(product.name)
        setDescription(product.description)
        setPrice(product.price)
        setcountInStock(product.countInStock)
        setProductUpdate(product)
        setShowUpdate(true)
    }
    
    const handleCloseUpdate = () => {
        setShowUpdate(false)
    };

    useEffect(() => {
        props.getAllProducts(typeHeading, page)
        console.log("100");
    }, [typeHeading, page])


    const handleAddNewProduct = async () => {
        if(!name || !description || !image || !type || !countInStock || !price) {
            toast.error("Bạn chưa điền đầy đủ thông tin!")
            return
        }

        let product = {
            name,
            image,
            type,
            price,
            countInStock,
            description,
        }

        let res = await addNewProductService(product)
        if(res && res.status === 'OK') {
            toast.success("Bạn đã thêm mới thành công!")
            handleClose()
            setName('')
            setDescription('')
            setPrice(0)
            setcountInStock(0)
            setImage('')
            props.getAllProducts(typeHeading)
        }else {
            toast.error("Thêm sản phẩm thất bại!")
        }
    }

    const handleTypeProduct = (e) => {
        let typeProduct = e.target.value.split('-')[1].trim()
        setType(typeProduct)
    }
    
    const handleOnchangeSelect = (e) => {
        let typeProduct = e.target.value.split('-')[1]?.trim()
        if(typeProduct) {
            setTypeHeading(typeProduct)
        }else {
            setTypeHeading("")
        }
    }

    const handleDeleteProduct = async () => {
        if(!idDeleteProduct) {
            toast.error("Xóa sản phẩm thất bại")
        }else {
            let res = await deleteProductService(idDeleteProduct)
            if(res && res.status === 'OK') {
                toast.success("Bạn đã xóa sản phẩm thành công")
                handleCloseDelete()
                props.getAllProducts()
            }else {
                toast.error("Xóa sản phẩm thất bại")
            }
        }
        
    }
    
    const handleOnchangeUpdate = () => {

    }

    const handleUpdateProduct = async () => {
        if(!name || !description || !image || !type || !countInStock || !price) {
            toast.error("Thông tin cập nhật vẫn còn thiếu!")
            return
        }

        let product = {
            _id: productUpdate._id,
            name,
            image,
            type,
            price,
            countInStock,
            description,
        }

        let res = await updateProductService(product)
        if(res && res.status === 'OK') {
            toast.success("Bạn đã cập nhật thành công!")
            handleCloseUpdate();
            setName('')
            setDescription('')
            setPrice(0)
            setcountInStock(0)
            setImage('')
            props.getAllProducts()
        }else {
            toast.error("Cập nhật thất bại")
            handleCloseUpdate()
        }
    }

    const handlePageClick = (event) => {
        if(event) {
            setPage(event.selected)
        }
    }
    
    return (
        <div>
            <AdminHeader />
            <Navigators />
           <div className="manage-product-content">
                <div className="heading">
                    <h3 className="manage-product-heading">Quản lý sản phẩm</h3>
                    <div className="right">
                        <select className="select-heading" onChange={(e) => handleOnchangeSelect(e)}>
                            <option>Tất cả</option>
                            <option>Áo quần - P1</option>
                            <option>Giày - P2</option>
                            <option>Bóng - P3</option>
                        </select>
                        <Button variant="primary" onClick={handleShowCreate}>
                            + Thêm mới
                        </Button>
                    </div>
                </div>
                <table className="table-product-users">
                    <thead>
                        <tr>
                            <th style={{width: '300px'}}>Tên sản phẩm</th>
                            <th>Ngày cập nhật</th>
                            <th>Hình ảnh</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.dataProducts && props.dataProducts.length > 0 ?
                            props.dataProducts.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.updatedAt}</td>
                                        <td>
                                            <img className="image-product" src={item.image} alt="Hình ảnh sản phẩm"/>
                                        </td>
                                        <td>{item.price}</td>
                                        <td>{item.countInStock}</td>
                                        <td>
                                            <button className="btn btn-warning update"
                                                onClick={() => handleShowUpdate(item)}
                                            >Sửa</button>
                                            <button className="btn btn-danger delete"
                                                onClick={() => handleShowDelete(item._id)}
                                            >Xóa</button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <div className="loading">...loading</div>
                        }
                    </tbody>
                </table>
           </div>
            <div className="panigate">
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={props.maxPage !== 0 ? props.maxPage : 5}
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
            {/* Modal create product */}
            <Modal show={show} onHide={handleClose} dialogClassName="modal-create-product">
                <Modal.Header closeButton>
                <Modal.Title>Thêm mới sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Tên sản phẩm</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Tên sản phẩm" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Hình ảnh</label>
                            <FileBase64
                                multiple={ false }
                                onDone={({ base64 }) => setImage(base64)} 
                            />
                            {image && 
                                <img src={image} className="image-create" alt="ảnh sản phẩm"/>
                            }
                        </div>
                        
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Giá</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Gía" 
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Số lượng</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Số lượng" 
                                value={countInStock}
                                onChange={(e) => setcountInStock(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 col-12" style={{ display: "flex", flexDirection: "column"}}>
                            <label htmlFor="exampleFormControlInput1" className="form-label">Mô tả</label>
                            <textarea name="Text1" cols="40" rows="5"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Loại sản phẩm</label>
                            <select onChange={(e) => handleTypeProduct(e)}>
                                <option>Áo quần - P1</option>
                                <option>Giày - P2</option>
                                <option>Bóng - P3</option>
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" 
                onClick={handleAddNewProduct}
                >
                    Thêm mới
                </Button>
                </Modal.Footer>
            </Modal>

            {/* modal update product */}
            <Modal show={showUpdate} onHide={handleCloseUpdate} dialogClassName="modal-create-product">
                <Modal.Header closeButton>
                <Modal.Title>Sửa sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Tên sản phẩm</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Tên sản phẩm" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Hình ảnh</label>
                            <input type="file" className="form-control" id="exampleFormControlInput1" placeholder="Hình ảnh" 
                                onChange={(e) => {setImage(e.target.files[0].name);}}
                            />
                        </div>
                        
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Giá</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Gía" 
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Số lượng</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Số lượng" 
                                value={countInStock}
                                onChange={(e) => setcountInStock(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 col-12" style={{ display: "flex", flexDirection: "column"}}>
                            <label htmlFor="exampleFormControlInput1" className="form-label">Mô tả</label>
                            <textarea name="Text1" cols="40" rows="5"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Loại sản phẩm</label>
                            <select onChange={(e) => handleTypeProduct(e)}>
                                <option>Áo quần - P1</option>
                                <option>Giày - P2</option>
                                <option>Bóng - P3</option>
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpdate}>
                    Close
                </Button>
                <Button variant="warning" 
                    onClick={handleUpdateProduct}
                >
                    Cập nhật
                </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal delete product */}
            <Modal show={showDelete} onHide={handleCloseDelete} dialogClassName="modal-create-product">
                <Modal.Header closeButton>
                <Modal.Title>Xóa sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <h3>Bạn đã chắc chắn xóa sản phẩm này</h3>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    Close
                </Button>
                <Button variant="danger" 
                onClick={handleDeleteProduct}
                >
                    Xóa
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

function mapStateToProps (state) {
    return  {
        dataProducts: state.product.products,
        maxPage: state.product.maxPage,
        pageCurrent: state.product.pageCurrent,
        totalProduct: state.product.totalProduct
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getAllProducts: (type, page) => dispatch(actions.getAllProduct(type, page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageProduct)