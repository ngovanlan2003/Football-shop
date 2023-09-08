import { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import './AllProductType.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllProductsMore } from '../../service/ProductService'
import { toast } from 'react-toastify'

const AllProductType = () => {

    let [dataProducts, setDataProducts] = useState([])
    useEffect(() => {
        getProduct()
    }, [])

    const params = useParams()
    const navigation = useNavigate()

    const getProduct = async () => {
        if(params && params.type) {
            let res = await getAllProductsMore(params.type)

            console.log("res: ", res);
            if(res && res.status === 'OK' && res.data) {
                setDataProducts(res.data)
            }else {
                toast.error("Server đang lỗi, k thể lấy sản phẩm!")
            }
        }

    }

    const handleClickProduct = (id) => {
        navigation(`/detail-product/${id}`)
    }

    return (
        <div className="container-all-product-type">
            <Header />
            <div className='content'>
                <div className='container'>
                    <div>
                        <h3>Tất cả sản phẩm</h3>
                    </div>
                    <div className='list-product'>
                        <div className='row'>
                        {dataProducts && dataProducts.length > 0 
                        && 
                        dataProducts.map((item, index) => {
                            return (
                                <div className='col-2' key={item._id}>
                                    <div className='item' 
                                    onClick={() => handleClickProduct(item._id)}
                                    >
                                        <img src={item.image} alt="ảnh sản phẩm"/>
                                        <span className='description'>{item.name}</span>
                                        <div className='price-wrap'>
                                            <span className='price'>{item.price}</span>
                                            <span className='quanlity'>Đã bán: 10</span>
                                        </div>
                                    </div>
                                </div>  
                            )
                        })
                    }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AllProductType