import { useParams, useLocation, useNavigate } from 'react-router-dom'
import './Search.scss'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {getAllProductSearch} from "../../service/ProductService"
import { useEffect } from 'react';
import { useState } from 'react';

const Search = (props) => {
    const [dataProduct, setDataProduct] = useState([])

    const location = useLocation().search;
    const search = new URLSearchParams(location).get("search");

    const navigation = useNavigate()
    
    useEffect(() => {
        getProductSearch()
    }, [])

    const getProductSearch = async () => {
        if(search) {
            let res = await getAllProductSearch(search)
            if(res && res.status === 'OK' && res.data) {
                setDataProduct(res.data)
            }else {
                setDataProduct([])
            }
        } 
    }

    const handleClickProduct = (id) => {
        navigation(`/detail-product/${id}`)
    }

    return (
        <div className='search-container'>
            <Header />
            <div className='content'>
                <div className='container'>
                    <div className='heading'>
                        <h3>Sản phẩm liên quan đến "{search}"</h3>
                    </div>
                    <div className='product'>
                        {dataProduct && dataProduct.length > 0 
                            ?
                            <div className='row'>
                                {dataProduct.map((item, index) => {
                                    return (
                                    <div className='col-2' key={item._id}>
                                        <div className='item' 
                                            onClick={() => handleClickProduct(item._id)}
                                        >
                                            <img src={item.image} alt="Áo"/>
                                            <span className='description'>{item.name}</span>
                                            <div className='price-wrap'>
                                                <span className='price'>{item.price}</span>
                                                <span className='quanlity'>Đã bán: 10</span>
                                            </div>
                                        </div>
                                    </div>  
                                    )
                                })}
                            </div>
                            :

                            <div className='no-product-search'>
                                <span>Từ khóa bạn tìm kiếm không tồn tại sản phẩm nào cả</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Search