
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Router, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

import history from './utils/history';

import DefaultLayout from './layouts/DefaultLayout';
import AdminLayout from './layouts/AdminLayout';
import FullLayout from './layouts/FullLayout';
import ProfileLayout from './layouts/ProfileLayout';

import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

import HomePage from './pages/user/Home';
import ProductDetailPage from './pages/user/ProductDetail';
import AboutPage from './pages/user/About';
import CartPage from './pages/user/Cart';
import CheckoutPage from './pages/user/Checkout';
import ProfilePage from './pages/user/ProfileUser/Profile';
import OrderPage from './pages/user/ProfileUser/Oders';
import ChangePassWordPage from './pages/user/ProfileUser/ChangePassword';
import ContactPage from './pages/user/Contact';
import BlogsPage from './pages/user/Blog';

import DashboardPage from './pages/admin/Dashboard';

import NotFoundPage from './pages/NotFound';

import {
  getUserInfoAction,
} from './redux/actions'


import './ResetApp.css';
import './App.css';
import 'antd/dist/antd.less';



function App(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log("🚀 ~ file: App.js ~ line 44 ~ useEffect ~ userInfo", userInfo)
    if (userInfo) {
      const decodedUserInfo = jwtDecode(userInfo.accessToken);
      dispatch(getUserInfoAction({ id: decodedUserInfo.sub }));
    }
  }, []);

  return (
    <Router history={history}>
        <Switch>
          <DefaultLayout exact path="/" component={HomePage} />
          <DefaultLayout exact path="/about" component={AboutPage} />
          <DefaultLayout exact path="/cart" component={CartPage} />
          <DefaultLayout exact path="/checkout" component={CheckoutPage} />
          <DefaultLayout exact path="/contacts" component={ContactPage} />
          <DefaultLayout exact path="/blogs" component={BlogsPage} />
          <DefaultLayout exact path="/product/:id" component={ProductDetailPage} />
          <ProfileLayout exact path="/profile" component={ProfilePage} />
          <ProfileLayout exact path="/profile/oder" component={OrderPage} />
          <ProfileLayout exact path="/profile/change-password" component={ChangePassWordPage} />

          <AdminLayout exact path="/admin" component={DashboardPage} />

          <FullLayout exact path="/login" component={LoginPage} />
          <FullLayout exact path="/register" component={RegisterPage} />

          <FullLayout component={NotFoundPage} />
        </Switch>
    </Router>
  );
}

export default App;
