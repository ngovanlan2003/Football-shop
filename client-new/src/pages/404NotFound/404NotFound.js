import { useNavigate } from 'react-router-dom'
import './404NotFound.scss'

const NotFound = () => {
    const navigation = useNavigate()

    const handleClickBack = () => {
        navigation("/")
    }

    return (
        <div className='container-not-found'>
            <div>
                <span className='left'>404 Not Found</span>
                <span className='right'>Đường dẫn không tồn tại</span>
                <i className="fa-solid fa-face-sad-tear"></i>
            </div>
            <div>
                <button className='btn btn-primary my-4 '
                    onClick={() => handleClickBack()}
                >Quay lại</button>
            </div>
        </div>
    ) 
}

export default NotFound