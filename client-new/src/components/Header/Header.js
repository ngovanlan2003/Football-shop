import './Header.scss'
import {
    NavLink, useNavigate
  } from "react-router-dom";
import * as actions from '../../store/actions'
import { connect } from "react-redux"
import { useEffect, useState } from 'react';
import { getAllCartService } from "../../service/OrderService"
import { toast } from 'react-toastify';
import jwt_decode from "jwt-decode";

const Header = (props) => {
    const [search, setSearch] = useState("")

    useEffect(() => {
        getCats()
    }, [])
    const navigate = useNavigate()

    const handleClickProfile = () => {
        navigate("/profile")
    }

    const handleClickLogo = () => {
        navigate("/")
    }

    const getCats = async () => {
        let access_token = localStorage.getItem("access_token")
        if(access_token) {
            const decoded = jwt_decode(access_token)

            props.getAllCart(decoded?.id)
        }
    }
    
    const handleClickCart = () => {
        navigate("/cart")
    }

    const handleClickSearch = () => {
        if(search) {
            navigate(`/search?search=${search}`)
        }else {
            toast.error("Bạn chưa nhập từ khóa tìm kiếm!")
        }
    }

    const handleKeyDownSearch = (e) => {
        if(e.key === 'Enter') {
            handleClickSearch()
        }
    }

    return (
        <div className="header-container">
            <div className='content-header row'>
                <div className='left col-3' onClick={() => handleClickLogo()}>
                    <i className="fa-regular fa-futbol"></i>
                    Football Shop
                </div>
                <div className='center col-6'>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Tìm kiếm sản phẩm" 
                            aria-label="Recipient's username" aria-describedby="button-addon2" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => handleKeyDownSearch(e)}
                        />
                        <button className="btn btn-secondary" type="button" id="button-addon2"
                            onClick={() => handleClickSearch()}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </div>
                <div className='right col-3'>
                    <div className='cart'
                        onClick={() => handleClickCart()}
                    >
                        <i className="fa-solid fa-cart-plus"></i>
                        <span>{props.carts.totalCart ? props.carts.totalCart : ""}</span>
                    </div>
                    <div className='information'>
                        {props.detailUser && props.detailUser.name 
                            ? 
                            <div className='profile' onClick={() => handleClickProfile()}>
                                {props.detailUser.avatar 
                                    ?
                                    <img  className="avatar" src={props.detailUser.avatar} alt="avatar"/>
                                    :
                                    <i className="avatar-icon fa-solid fa-user"></i>
                                }
                                <span>{props.detailUser.name}</span>
                            </div> 
                            : 
                            <>
                                <NavLink to="/register" className={"register"}>Đăng ký</NavLink>
                                <NavLink to="/login" className={"login"}>Đăng nhập</NavLink>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps (state) {
    return  {
        detailUser: state.users,
        carts: state.order
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getAllCart : (id) => dispatch(actions.getAllCartFromAction(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)