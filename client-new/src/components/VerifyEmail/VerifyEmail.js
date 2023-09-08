import { useLocation, useNavigate } from 'react-router-dom'
import './VerifyEmail.scss'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { verifyEmailService } from "../../service/UserService"

const VerifyEmail = () => {
    const [otp, setOtp] = useState("")
    const location = useLocation();
    const navigation = useNavigate()

    const email = location.state

    const handleClickBack = () => {
        navigation("/register")
    }

    const handleOnchangeOtp = (e) => {
        setOtp(e.target.value)
       
    }
    
    const handleSendOtp = async () => {
        if(otp.length !== 6) {
            toast.error("Chỉ 6 kí tự thôi bro!")
            return
        }

        

        let res = await verifyEmailService({
            email,
            otp
        })

        
        if(res && res.status === 'OK') {
            toast.success("Bạn đã tạo tài khoản thành công!")
            navigation("/login")
        }
    }
    return (
        <div className='container-vefify-email'>
            <div className='heading'>
                <div className='container'>
                    <i className="fa-regular fa-futbol"></i>
                    <span>Football Shop</span>
                </div>
            </div>
            <div className='content'>
                <div className='container'>
                    <div className='back' onClick={handleClickBack}>
                        <i className="fa-solid fa-angle-left"></i>
                        <span>Quay lại</span>
                    </div>

                    <div className='center'>
                        <h3>Xác minh bảo mật</h3>
                        <div className='verify'>
                            <span className='title'>Ứng dụng xác thực</span>
                            <input type="text" placeholder='......' value={otp}
                                onChange={(e) => handleOnchangeOtp(e)}
                            />
                            <span className='description'>Hãy nhập mã gồm 6 chữ số được gửi đến email của bạn</span>
                            <button className='btn btn-warning'
                                onClick={handleSendOtp}
                            >Gửi</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail