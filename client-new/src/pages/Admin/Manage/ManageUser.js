import AdminHeader from "../AdminHeader/AdminHeader"
import Navigators from "../Navigators/Navigators"
import { connect } from "react-redux"
import * as actions from '../../../store/actions'
import { useEffect, useState } from "react"
import './ManageUser.scss'
import {Modal, Button} from 'react-bootstrap';
import {addNewUserService, deleteUserService} from '../../../service/UserService'
import { toast } from "react-toastify"
import ReactPaginate from 'react-paginate';

const ManageUser = (props) => {
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [userDelete, setUserDelete] = useState({})
    const [userUpdate, setUserUpdate] = useState({})
    const [page, setPage] = useState(0)

    useEffect( () => {
        props.getAllUsers(page)
    }, [page])


    const handleClose = () => setShow(false);
   
    const handleDeleteClose = () => setShowDelete(false);
    const handleShowCreate = () => setShow(true)
    const handleShow = (user) => {
        setShowDelete(true)
        if(user) {
            setUserDelete(user)
        }
    };

    const handleUpdateClose = () => setShowUpdate(false);
    const handleShowUpdate = (user) => {
        setShowUpdate(true)
        let password = user.password
        
        setUserUpdate(user)
    }

    
    const handleAddNewUser = async () => {
        if(!email || !name || !password || !phone) {
            toast.error("Vui lòng nhập đầy đủ thông tin!");
            return
        }

        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)


        if(!isCheckEmail) {
            toast.error("Email không hợp lệ!");
            return
        }

        
        let res = await addNewUserService({
            email, name, password, phone
        })
        if(res && res.data) {
            toast.success("Bạn đã thêm thành công!");
            props.getAllUsers()
            setEmail("")
            setName("")
            setPassword("")
            setPhone("")
            handleClose()
        }else {
            toast.error("Thêm thất bại!")
        }
    }
    
    const handleDeleteUser = async () => {
        if(!userDelete && !userDelete._id) {
            toast.error("Không tồn tại user để xóa!")
        }

        let res = await deleteUserService(userDelete._id)
        if(res && res.status == 'OK') {
            toast.success(`Bạn đã xóa user: ${userDelete.name} thành công!`)
            props.getAllUsers()
            setUserDelete({})
            handleDeleteClose()
        }else {
            toast.success("Xóa thất bại!")
        }
    }

    const handleUpdateUser = () => {

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
            <div className="manage-user-content">
                <div className="heading">
                    <h3 className="manage-users-heading">Quản lý người dùng</h3>
                    <Button variant="primary" onClick={handleShowCreate}>
                        + Thêm mới
                    </Button>
                    
                </div>

                <table className="table-manage-users">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Phone number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.dataUsers && props.dataUsers.length > 0 &&
                            props.dataUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item._id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.name}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <button className="btn btn-warning update"
                                                onClick={() => handleShowUpdate(item)}
                                            >Sửa</button>
                                            <button className="btn btn-danger delete"
                                                onClick={() => handleShow(item)}
                                            >Xóa</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <div className="panigate">
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={props.maxPage ? props.maxPage : 5}
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

                {/* Modal create user */}
                <div className="modal">
                    <Modal show={show} onHide={handleClose} >
                            <Modal.Header closeButton>
                            <Modal.Title>Thêm mới người dùng</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <div className="mb-3 col-6">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" 
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Tên</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Họ và tên"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Mật khẩu</label>
                                        <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Mật khẩu" 
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Điện thoại</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Số điện thoại" 
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleAddNewUser}>
                                Thêm mới
                            </Button>
                            </Modal.Footer>
                    </Modal>
                </div>

                {/* Modal update user */}
                <Modal show={showUpdate} onHide={handleUpdateClose} >
                        <Modal.Header closeButton>
                        <Modal.Title>Cập nhật người dùng</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                                    <input disabled type="email" className="form-control" id="exampleFormControlInput1"
                                        value={userUpdate.email} 
                                    />
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Họ và tên</label>
                                    <input  type="text" className="form-control" id="exampleFormControlInput1"
                                        value={userUpdate.name} 
                                    />
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Mật khẩu</label>
                                    <input  type="password" className="form-control" id="exampleFormControlInput1"
                                        value={userUpdate.password} 
                                    />
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Số điện thoại</label>
                                    <input  type="text" className="form-control" id="exampleFormControlInput1"
                                        value={userUpdate.phone} 
                                    />
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleUpdateClose}>
                            Close
                        </Button>
                        <Button variant="primary" 
                        // onClick={handleAddNewUser}
                        >
                            Cập nhật
                        </Button>
                        </Modal.Footer>
                </Modal>

                {/* Modal delete user */}
                <Modal show={showDelete} onHide={handleDeleteClose} >
                        <Modal.Header closeButton>
                        <Modal.Title>Xóa người dùng</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <span>Bạn có chắc chắn xóa người dùng này?</span>                             
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleDeleteClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={handleDeleteUser}>
                            Delete
                        </Button>
                        </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

function mapStateToProps (state) {
    return  {
        dataUsers: state.admin.users,
        maxPage: state.admin.maxPage
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getAllUsers: (page) => dispatch(actions.getAllUsers(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser)