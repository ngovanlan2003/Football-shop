import { useEffect, useState } from "react"
import Header from "../Header/Header"
import "./Profile.scss"
import jwt_decode from "jwt-decode";
import { getDetailUser, logoutUser, updatePasswordService, updateUserService } from '../../service/UserService'
import _ from 'lodash';
import { toast } from "react-toastify";
import * as actions from '../../store/actions'
import { connect } from "react-redux"
import { Button, Modal } from "react-bootstrap";

const Profile = (props) => {
    const [avatar, setAvatar] = useState('')
    const [user, setUser] = useState({})
    const [userCopy, setUserCopy] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [updatePassword, setUpdatePassword] = useState({currentPassword: '', newPassword: '', confirmPassword: ''})

    useEffect(() => {
        getDetailUserProfile()
    }, [])

    const convertToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader()
    
        reader.readAsDataURL(file)
        reader.onload = () => {
          if(reader.result) {
            resolve(reader.result)
          }
        }
        reader.onerror = reject;
      }
    )

    const getDetailUserProfile = async () => {
        let access_token = localStorage.getItem("access_token")
        if(access_token) {
            const decoded = jwt_decode(access_token)
            if(decoded && decoded.id) {
                let useId = decoded.id
                let res = await getDetailUser(useId, access_token)
                if(res && res.statusText === 'OK' && res.data && res.data.data) {
                    setUser(res.data.data)
                    setUserCopy(res.data.data)
                    if(res.data.data.avatar) {
                        setAvatar(res.data.data.avatar)
                    }
                }
            }
        }
    } 
    
    const handleOnchangeAvatar =  async (e) => {
        let base64 =  await convertToBase64(e.target.files[0])
        if(base64) {
            setAvatar(base64)
        }
    }

    const handleUpdateUser = async () => {
        if(!_.isEqual(user, userCopy) || avatar !== "") {
            const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            const isCheckEmail = reg.test(user.email)

            if(!isCheckEmail) {
                toast.error("Email không đúng định dạng!")
                return
            }

            let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
            let checkPhone = regex.test(user.phone)
            if(!checkPhone) {
                toast.error("Số điện thoại không đúng định dạng!")
            }

            let userCurrent = avatar ? {...user, avatar: avatar} : user
            let res = await updateUserService(user._id, userCurrent)
            if(res && res.status === 'OK' && res.data) {
                toast.success("Cập nhật thông tin thành công!")
            }else {
                toast.error("Server đang lỗi.Xin lỗi vì sự bất tiện này!")

            }

        }else {
            toast.warning("Bạn chưa thay đổi thông tin gì!")
        }
    }

    const handleClickLogout = async () => {
        await logoutUser()
        props.resetUser()
        setUser({})
        setAvatar('')
        localStorage.removeItem("access_token")
        toast.success("Đăng xuất thành công!")
    }
    
    const handleShowModal = (productId) => {
        // setIdConfirmProduct(productId)
        setShowModal(true)
    }
    
    const handleCloseConfirm = () => {
        setShowModal(false)
    };

    const handleUpdatePassword = async () => {
        let {_id} = user
        let {currentPassword, newPassword, confirmPassword} = updatePassword
        if(newPassword !== confirmPassword) {
            toast.error("Mật khẩu không trùng khớp!")
            return
        }

        let update = {
            id: _id,
            currentPassword,
            newPassword
        }

        let res = await updatePasswordService(update)

        if(res && res.status === 'OK') {
            toast.success("Cập nhật mật khẩu thành công!")
            handleCloseConfirm()
            setUpdatePassword({})
        }
    }

    return ( 
        <div className="profile-container">
            <Header />
            <div className="profile-content container">
                    <div className="profile-header">
                        <div>
                            <h3>Hồ sơ của tôi</h3>
                            <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
                        </div>
                        <button className="btn btn-primary"
                            onClick={() => handleShowModal()}
                        >Đổi mật khẩu</button>
                    </div>
                    <div className="row content-list">
                        <div className="col-8">
                            <div className="row">
                                <div className="col-6 item">
                                    <label>Email</label>
                                    <input value={user.email ? user.email : ""} placeholder="Email" 
                                        onChange={(e) => setUser({...user, email: e.target.value})}
                                    />
                                </div>
                                <div className="col-6 item">
                                    <label>Họ và tên</label>
                                    <input value={user.name ? user.name : ""} placeholder="Họ và tên"
                                        onChange={(e) => setUser({...user, name: e.target.value})}
                                    />
                                </div>
                                <div className="col-12 item">
                                    <label>Số điện thoại</label>
                                    <input value={user.phone ? user.phone : ""} placeholder="Số điện thoại"
                                        onChange={(e) => setUser({...user, phone: e.target.value})}
                                    />
                                </div>
                                <div className="col-12 item">
                                    <label>Địa chỉ</label>
                                    <input value={user.address ? user.address : ""} placeholder="Địa chỉ"
                                        onChange={(e) => setUser({...user, address: e.target.value})}
                                    />
                                </div>
                                <div className="submit">
                                    <button className="btn btn-warning"
                                        onClick={() => handleUpdateUser()}
                                    >Cập nhật</button>
                                    <button className="btn btn-danger"
                                        onClick={() => handleClickLogout()}
                                    >Đăng xuất</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 avatar">
                            {!avatar 
                                ? 
                                <div className="avatar-content">
                                    <i className="avatar-icon fa-solid fa-user"></i>
                                    <input id="avatar" hidden type="file" onChange={(e) => handleOnchangeAvatar(e)}/>
                                    <label htmlFor="avatar">Chọn ảnh</label>
                                </div>
                                :
                                <div className="avatar-content">
                                    <img className="image-avatar" src={avatar} alt="Ảnh đại diện"/>
                                    <input id="avatar" hidden type="file" onChange={(e) => handleOnchangeAvatar(e)}/>
                                    <label htmlFor="avatar">Chọn ảnh</label>
                                </div>
                            }
                        </div>
                    </div>
            </div>
            <Modal show={showModal} onHide={handleCloseConfirm} dialogClassName="modal-create-product">
                <Modal.Header closeButton>
                <Modal.Title>Cập nhật mật khẩu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row list">
                        <div className="col-12 item">
                            <label>Nhập lại mật khẩu</label>
                            <input type="password" placeholder="..." 
                                value={updatePassword.currentPassword}
                                onChange={(e) => setUpdatePassword({...updatePassword, currentPassword: e.target.value})}
                            />
                        </div>
                        <div className="col-12 item">
                            <label>Mật khẩu mới</label>
                            <input type="password" placeholder="..."
                                value={updatePassword.newPassword}
                                onChange={(e) => setUpdatePassword({...updatePassword, newPassword: e.target.value})}
                            />
                        </div>
                        <div className="col-12 item">
                            <label>Xác nhận mật khẩu</label>
                            <input type="password" placeholder="..."
                                value={updatePassword.confirmPassword}
                                onChange={(e) => setUpdatePassword({...updatePassword, confirmPassword: e.target.value})}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseConfirm}>
                    Close
                </Button>
                <Button variant="warning" 
                onClick={handleUpdatePassword}
                >
                    Xác nhận
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

function mapStateToProps (state) {
    return  {
    }
}

function mapDispatchToProps (dispatch) {
    return {
        resetUser: () => dispatch(actions.resetUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)