import './AdminHeader.scss'

const AdminHeader = () => {
    return (
        <div className='admin-header'>
            <div className='content-header'>
                <div className='left'>
                    <i className="fa-regular fa-futbol"></i>
                    Football Shop
                </div>
                <div className='right'>
                    <span>Xin chào Admin!</span>
                </div>
            </div>
        </div>
    )
}

export default AdminHeader