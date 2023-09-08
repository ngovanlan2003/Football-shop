import './SliderComponent.scss'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from '../../assets/images/banner1.jfif'
import banner2 from '../../assets/images/banner2.jfif'
import banner3 from '../../assets/images/banner3.jfif'
import banner4 from '../../assets/images/banner4.png'
import banner5 from '../../assets/images/banner5.jfif'
import logo1 from '../../assets/images/pr1.jfif'
import logo2 from '../../assets/images/pr2.jfif'


const SliderComponent = () => {

    let settings = {
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    return (
        <div className="row slider-container">
            <Slider {...settings} className='col-8'>
                <div>
                    <img src={banner1} />
                </div>
                <div>
                    <img src={banner2} />
                </div>
                <div>
                    <img src={banner3} />
                </div>
                <div>
                    <img src={banner4} />
                </div>
                <div>
                    <img src={banner5} />
                </div>
            </Slider>
            <div className='col-4 marketing'>
                <img className='logo1' src={logo1} alt="ảnh marketing"/>
                <img className='logo2' src={logo2} alt="ảnh marketing"/>
            </div>
        </div>
    )
}

export default SliderComponent