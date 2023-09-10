import {
    NavLink
  } from "react-router-dom";
import './Information.scss'
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import {registerUserService, loginUserService} from '../../service/UserService'
import { toast } from "react-toastify";
import { useNavigate  } from "react-router-dom";
import jwt_decode from "jwt-decode";
import * as actions from '../../store/actions'
import { connect } from "react-redux"

const Information = (props) => {
    const [isShowRegister, setIsShowRegister] = useState(true)
    const [isShowLogin, setIsShowLogin] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [emailLogin, setEmailLogin] = useState("")
    const [passwordLogin, setPasswordLogin] = useState("")

    const navigate = useNavigate()
    useEffect(() => {
        setIsShowRegister(props.isShowRegister)
        setIsShowLogin(props.isShowLogin)
    }, []) 

    const handleClickRegister = () => {
        setIsShowRegister(true)
        setIsShowLogin(false)
    }

    const handleClickLogin = () => {
        setIsShowRegister(false)
        setIsShowLogin(true)
    }

    const handleRegisterUser = async () => {
        if(!email || !name || !password || !confirmPassword) {
            toast.error("Vui lòng điền đầy đủ thông tin!")
            return
        }

        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)

        if(!isCheckEmail) {
            toast.error("Email của bạn không đúng định dạng!")
            return
        }

        if(password !== confirmPassword) {
            toast.error("Nhập lại mật khẩu không trùng khớp!")
            return
        }

        let user = {
            email, 
            password,
            confirmPassword,
            name
        }

        let res = await registerUserService(user)

        if(res && res.status === 'OK') {
            toast.success("Xác thực email bạn nhé!")
            setEmail("")
            setName("")
            setPassword("")
            setConfirmPassword("")
            navigate("/verify-email", {state: email})
            // setIsShowRegister(false)
            // setIsShowLogin(true)
        }else {
            toast.error("Đăng ký thất bại!")
        }
    }

    const handleLogin = async () => {
        if(!emailLogin || !passwordLogin) {
            toast.error("Vui lòng nhập đầy đủ thông tin!")
            return
        }

        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(emailLogin)

        if(!isCheckEmail) {
            toast.error("Email của bạn không đúng định dạng!")
            return
        }

        let loginUser = {
            email: emailLogin,
            password: passwordLogin
        }

        let res = await loginUserService(loginUser)
        if(res && res.status === "OK") {
            toast.success("Đăng nhập thành công!")
            setEmailLogin("")
            setPasswordLogin("")
            localStorage.setItem("access_token", JSON.stringify(res?.access_token))
            localStorage.setItem("refresh_token", JSON.stringify(res?.refresh_token))
            if(res.access_token) {
                const decoded = jwt_decode(res.access_token)
                if(decoded.id) {
                    await props.getDetailUser(decoded.id, res.access_token)
                }
            }

            if(props.detailUser.isAdmin) {
                navigate("/admin")
            }else {
                navigate("/")
            }
        }else {
            toast.error("Email và mật khẩu không trùng khớp!")
        }
    }

    const handleKeyDownSearch = (e) => {
        if(e.key === 'Enter') {
            handleLogin()
        }
    }

    const handleKeyDownRegister = (e) => {
        if(e.key === 'Enter') {
            handleRegisterUser()
        }
    }

    const handleClickLogo = () => {
        navigate("/")
    }

    return (
        <div className="information-container">
            <div className="header-container">
                <div className='content-header'  onClick={() => handleClickLogo()}>
                    <div className='left'>
                        <i className="fa-regular fa-futbol"></i>
                        Football Shop
                    </div>
                    <div className='information'>
                        <NavLink to="/register" className={"register"} onClick={() => handleClickRegister()}>Đăng ký</NavLink>
                        <NavLink to="/login" className={"login"} onClick={() => handleClickLogin()}>Đăng nhập</NavLink>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="content-left col-6">
                            <div className="content-logo">
                                <i className="fa-regular fa-futbol"></i>
                                <span className="name">
                                    Football Shop
                                </span>
                            </div>
                            <div className="description">
                                <span>Nền tảng thương mại uy tín</span>
                                <span>Trao đổi & mua bán áo quần, dụng cụ bóng đá</span>
                            </div>
                            </div>
                        <div className="content-right col-6">
                            {/* Register */}
                            {
                                isShowRegister === true &&
                                <div className="register-container">
                                    <div className="row">
                                        <h3>Đăng ký</h3>
                                        <div className="col-12 item">
                                            <label>Email</label>
                                            <input type="text" placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onKeyDown={(e) => handleKeyDownRegister(e)}
                                            />
                                        </div>
                                        <div className="col-12 item">
                                            <label>Họ và tên</label>
                                            <input type="text" placeholder="Họ và tên"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                onKeyDown={(e) => handleKeyDownRegister(e)}
                                            />
                                        </div>
                                        <div className="col-12 item">
                                            <label>Mật khẩu</label>
                                            <input type="password" placeholder="Mật khẩu"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                onKeyDown={(e) => handleKeyDownRegister(e)}
                                            />
                                        </div>
                                        <div className="col-12 item">
                                            <label>Nhập lại mật khẩu</label>
                                            <input type="password" placeholder="Nhập lại mật khẩu"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                onKeyDown={(e) => handleKeyDownRegister(e)}
                                            />
                                        </div>
                                    </div>
                                        <button className="btn btn-danger button-submit"
                                            onClick={() => handleRegisterUser()}
                                        >Đăng ký</button>
                                </div>
                            }
                            {
                                isShowLogin === true &&
                                <div className="login-container">
                                    <div className="row">
                                    <h3>Đăng nhập</h3>
                                    <div className="col-12 item">
                                            <label>Email</label>
                                            <input type="text" placeholder="Email"
                                                value={emailLogin}
                                                onChange={(e) => setEmailLogin(e.target.value)}
                                                onKeyDown={(e) => handleKeyDownSearch(e)}
                                            />
                                        </div>
                                        <div className="col-12 item">
                                            <label>Mật khẩu</label>
                                            <input type="password" placeholder="Mật khẩu"
                                                value={passwordLogin}
                                                onChange={(e) => setPasswordLogin(e.target.value)}
                                                onKeyDown={(e) => handleKeyDownSearch(e)}
                                            />
                                        </div>
                                    </div> 
                                    <button className="btn btn-danger"
                                        onClick={() => handleLogin()}
                                    >Đăng nhập</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

function mapStateToProps (state) {
    return  {
        detailUser: state.users
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getDetailUser: (id, token) => dispatch(actions.fetchDetailUser(id, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Information) 