import { toast } from 'react-toastify'
import { logoutUser } from '../../../service/UserService'
import './AdminHeader.scss'
import * as actions from '../../../store/actions'
import { connect } from "react-redux"
import { useNavigate } from 'react-router-dom'

const AdminHeader = (props) => {
    const navigation = useNavigate()

    const handleLogoutAdmin = async () => {
        await logoutUser()
        props.resetUser()
        localStorage.removeItem("access_token")
        toast.success("Đăng xuất thành công!")
        navigation("/")
    }

    return (
        <div className='admin-header'>
            <div className='content-header'>
                <div className='left'>
                    <i className="fa-regular fa-futbol"></i>
                    Football Shop
                </div>
                <div className='right'>
                    <span>Xin chào Admin!</span>
                    <i className="logout fa-solid fa-right-from-bracket"
                        onClick={() => handleLogoutAdmin()}
                    ></i>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader)