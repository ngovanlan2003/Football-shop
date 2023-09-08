import './Footer.scss'

const Footer = () => {
    return ( 
        <div className="footer-container">
                    <div className='top'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-3 item'>
                                    <div className='heading'>Chăm sóc khách hàng</div>
                                    <a href='#'>
                                        <span>Copy Đại Học Duy Tân</span>
                                    </a>
                                    <a href='#'>
                                        <span>@Duy nhất tại Đại Học Duy Tân</span>
                                    </a>
                                </div>
                                <div className='col-3 item'>
                                    <div className='heading'>Về shop</div>
                                    <a href='#'>
                                        <span>Giới thiệu về Football shop</span>
                                    </a>
                                    <a href='#'>
                                        <span>Điều Khoản Football shop</span>
                                    </a>
                                </div>
                                <div className='col-3 item'>
                                    <div className='heading'>THEO DÕI CHÚNG TÔI TRÊN</div>
                                    <a href='#'>
                                        <span>Facebook</span>
                                    </a>
                                    <a href='#'>
                                        <span>Instagram</span>
                                    </a>
                                </div>
                                <div className='col-3 item'>
                                    <div className='heading'>thanh toán</div>
                                    <a href='#'>
                                        <span>Tiền mặt</span>
                                    </a>
                                    <a href='#'>
                                        <span>Chuyển khoản</span>
                                    </a>
                                    <a href='#'>
                                        <span>Khi nhận hàng</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bottom'>
                        <div className='container'>
                            <div className='address'>
                                <span>
                                    Địa chỉ: 137 Đường Nguyễn Văn Linh, Hải Châu, Q. Thanh Khê, Đà Nẵng
                                </span>
                                <span>
                                    @Bản quyền thuộc Đại Học Duy Tân.
                                </span>
                                <span>
                                    Thiết kế bởi Trung Tâm Công Nghệ Phần Mềm.
                                </span>
                            </div>
                        </div>

                    </div>
        </div>
    )
}

export default Footer