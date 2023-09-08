import { useEffect } from "react";
import Information from "./components/Information/Information";
import Admin from "./pages/Admin/Admin";
import ManageProduct from "./pages/Admin/Manage/ManageProduct";
import ManageUser from "./pages/Admin/Manage/ManageUser";
import HomePage from "./pages/HomePage/HomePage";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as actions from './store/actions'
import { connect } from "react-redux"
import jwt_decode from "jwt-decode";
import { axiosJwt, refreshToken } from "./service/UserService";
import axios from "axios";
import Profile from "./components/Profile/Profile";
import DetailProduct from "./pages/Admin/DetailProduct/DetailProduct";
import Cart from "./components/Cart/Cart";
import ManageOrder from "./pages/Admin/Manage/ManageOrder";
import AllProductType from "./pages/AllProductType/AllProductType";
import Search from "./components/Search/Search";
import NotFound from "./pages/404NotFound/404NotFound";
import VerifyEmail from "./components/VerifyEmail/VerifyEmail";
import Statistic from "./pages/Admin/Manage/Statistic";

function App(props) {

  useEffect(() => {
    let { storeageData, decoded} = handleDecoded()
    if(storeageData) {
      props.getDetailUser(decoded.id, storeageData)
    }
  }, [])

  const handleDecoded = () => {
    let storeageData = localStorage.getItem("access_token")
    let decoded = {}
    if(storeageData && checkJson(storeageData)) {
      storeageData = JSON.parse(storeageData)

      decoded = jwt_decode(storeageData)
    }
    return {decoded, storeageData}
  }

  //nếu access_token hết hạn sẽ chạy vào interceptor để lấy refresh_token trước khi getdetailUser
  axiosJwt.interceptors.request.use(async function (config) {
    let {  decoded } = handleDecoded()
    const currentTime = new Date()
    if(decoded.exp < currentTime.getTime() / 1000) {
      let data = await refreshToken()
      config.headers['token'] = `Bearer ${data.access_token}`
    }

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  const checkJson = (data) => {
    try{
      JSON.parse(data)
    }catch(e) {
      return false
    }
    return true
  }

  return (
    <>
    <Router>
      <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route path="/all-product/:type" element={<AllProductType />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/detail-product/:id" element={<DetailProduct />}></Route>
          <Route  path="/register" 
              element={<Information 
                isShowRegister={true}
                isShowLogin={false}
              />}></Route>
          <Route  path="/login" 
              element={<Information 
              isShowRegister={false}
              isShowLogin={true}
            />}></Route>
          <Route path="/verify-email" element={<VerifyEmail />}></Route>
          {props.detailUser && props.detailUser.isAdmin === true 
          &&
          <>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/admin/manage-user" element={<ManageUser />}></Route>
          <Route path="/admin/manage-product" element={<ManageProduct />}></Route>
          <Route path="/admin/manage-order" element={<ManageOrder />}></Route>
          <Route path="/admin/statistic" element={<Statistic />}></Route>
          </>
          }
          <Route path="*" exact element={<NotFound />}></Route>
      </Routes>
    </Router>
     <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

function mapStateToProps (state) {
  return  {
      detailUser: state.users
  }
}

function mapDispatchToProps (dispatch) {
  return {
      getDetailUser: (id, token) => dispatch(actions.fetchDetailUser(id, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
