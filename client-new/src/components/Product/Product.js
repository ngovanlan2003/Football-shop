import { useEffect } from 'react'
import './Product.scss'
import { connect } from "react-redux"
import * as actions from '../../store/actions'
import { useState } from 'react'
import { useNavigate  } from "react-router-dom";


const Clothes = (props) => {

    const navigation = useNavigate()

    useEffect(() => {
        getProducts()
    }, [props.page])

    const getProducts = async () => {
        await props.getProductsType(props.typeProduct, props.page)
    }

    const handleClickProduct = (id) => {
        navigation(`/detail-product/${id}`)
    }

    return (
        <div className="clothes-container">
            <div className="content">
                <div className='row'>
                    {props.clothesClub && props.clothesClub.length > 0 && props.typeProduct === "P1"
                        && 
                        props.clothesClub.map((item, index) => {
                            return (
                                <div className='col-2' key={item._id}>
                                    <div className='item' onClick={() => handleClickProduct(item._id)}>
                                        <img src={item.image} alt="Áo"/>
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
                    {props.clothesNation && props.clothesNation.length > 0 && props.typeProduct === "P2"
                        && 
                        props.clothesNation.map((item, index) => {
                            return (
                                <div className='col-2' key={item._id}>
                                    <div className='item'>
                                        <img src={item.image} alt="Áo"/>
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
                    {props.shoes && props.shoes.length > 0 && props.typeProduct === "P3"
                        && 
                        props.shoes.map((item, index) => {
                            return (
                                <div className='col-2' key={item._id}>
                                    <div className='item'>
                                        <img src={item.image} alt="Áo"/>
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
    )
}

function mapStateToProps (state) {
    return  {
        clothesClub: state.product.clothesClub,
        clothesNation: state.product.clothesNation,
        shoes: state.product.shoes,
        backpacks: state.product.backpacks,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getProductsType: (type, page) => dispatch(actions.getProductsType(type, page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clothes)