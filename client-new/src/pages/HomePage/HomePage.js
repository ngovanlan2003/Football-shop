import Header from "../../components/Header/Header"
import SliderComponent from '../../components/Slider/SliderComponent'
import './HomePage.scss'
import Product from '../../components/Product/Product'
import Footer from '../../components/Footer/Footer.js'
import ReactPaginate from "react-paginate"
import { useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import * as actions from '../../store/actions'
import { useEffect, useState } from "react"

const HomePage = (props) => {
    const navigate = useNavigate()
    const [page, setPage] = useState(0)

    const handleClickAllProduct = (typeProduct) => {
        navigate(`/all-product/${typeProduct}`)
    }

    const handlePageClick = (e) => {
        setPage(e.selected)
    }

    return ( 
        <div className="home-container">
            <div>
                <Header />
            </div>
            <div className="slider-homepage">
                <SliderComponent />
            </div>
            <div className="content-homepage">
                <div className="container">
                    {props.clothesClub && props.clothesClub.length > 0 &&
                        <div className="heading">
                            <h3>Áo quần</h3>
                            <span onClick={() => handleClickAllProduct("P1")}>Xem thêm</span>
                        </div>
                    }
                    <Product 
                        typeProduct="P1"
                        page={page}
                    />
                </div>
                <div className="container">
                    
                    {props.clothesNation && props.clothesNation.length > 0 &&
                        <div className="heading" >
                            <h3>Giày dép</h3>
                            <span onClick={() => handleClickAllProduct("P2")}>Xem thêm</span>
                        </div>
                    }
                    <Product 
                        typeProduct="P2"
                        page={page}
                    />

                </div>
                <div className="container">
                    {props.shoes && props.shoes.length > 0 &&
                        <div className="heading">
                            <h3>Bóng</h3>
                            <span onClick={() => handleClickAllProduct("P3")}>Xem thêm</span>
                        </div>
                    }
                    <Product 
                        typeProduct="P3"
                        page={page}
                    />
                </div>
            </div>
            <div className="panigation">
                <ReactPaginate
                    nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={props?.maxPage ? props?.maxPage : 5}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
            <div className="footer">
                <Footer />
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
        maxPage: state.product.maxPage,
    }
}

function mapDispatchToProps  (dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)