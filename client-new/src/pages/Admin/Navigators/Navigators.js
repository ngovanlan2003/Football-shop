import './Navigators.scss'
import {
    NavLink
  } from "react-router-dom";

const Navigators = () => {
    return (
        <div className="navigators-container">
            <div className='menu'>
                <ul className='menu-list'>
                    <li className='menu-item'>
                        <NavLink to="/admin/manage-user">
                            Quản lý người dùng
                        </NavLink>
                    </li>
                    <li className='menu-item'>
                        <NavLink to="/admin/manage-product">Quản lý sản phẩm</NavLink>
                    </li>
                    <li className='menu-item'>
                        <NavLink to="/admin/manage-order">Quản lý đơn hàng</NavLink>
                    </li>
                    <li className='menu-item'>
                        <NavLink to="/admin/statistic">Thống kê</NavLink>
                    </li>
                </ul>
            </div>
            
        </div>
    )
}

export default Navigators