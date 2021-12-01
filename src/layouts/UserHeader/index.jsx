import { Space, Button, Menu, Dropdown, Affix, Badge } from "antd";
import React, { useState } from "react";

import { Link, withRouter } from "react-router-dom";
import logoHeader from "../../assets/images/logo-mixi-removebg.png";
import history from "../../utils/history";
import {
  FacebookFilled,
  LinkedinFilled,
  TwitterOutlined,
  // UserOutlined,
  ShoppingCartOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { compose } from "redux";
import { connect, useSelector, useDispatch } from "react-redux";

import { logoutAction, changeThemeAction } from "../../redux/actions";

function Header({
  type,
  isShowSidebar,
  // setIsShowSidebar,
  logout,
  userInfo,
}) {
  const { cartList } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  function handleLogout() {
    localStorage.removeItem("userInfo");
    logout();
    if (type === "admin") {
      history.push("/login");
    }
  }

  function renderUserDropdown() {
    return (
      <Menu>
        {userInfo.data.role === "admin" ? (
          <Menu.Item onClick={() => history.push("/admin")}>Admin</Menu.Item>
        ) : null}

        <Menu.Item onClick={() => history.push("/profile")}>
          Thông tin cá nhân
        </Menu.Item>
        <Menu.Item onClick={() => history.push("/profile/oder")}>
          Lịch sử đơn hàng
        </Menu.Item>
        <Menu.Item onClick={() => handleLogout()}>Đăng xuất</Menu.Item>
      </Menu>
    );
  }

  return (
    <div className="header-form">
      {type === "admin" && (
        <Button
          type="text"
          icon={
            isShowSidebar ? (
              <MenuFoldOutlined style={{ color: "white" }} />
            ) : (
              <MenuUnfoldOutlined style={{ color: "white" }} />
            )
          }
          // onClick={() => setIsShowSidebar(!isShowSidebar)}
        ></Button>
      )}
      <Link to="/">
        <img src={logoHeader} alt="logo" style={{ width: 110 }} />
      </Link>

      <div className="header-container">
        <div className="header-info" style={{ marginTop: -20 }}>
          <Space>
            <span style={{ cursor: "default" }}>
              86 Nguyen Sinh Sac, Hoa Minh Ward, Lien Chieu District, Da Nang
              City
            </span>
            <span>
              <a href="#">(+84) 347567080</a>,&nbsp;&nbsp;
              <a href="#">(+84) 94893827</a>
            </span>
            <span>
              <a href="mailto:mixi@foodscleanmarket.com">
                mixi@foodscleanmarket.com
              </a>
            </span>
            <div class="header-icons">
              <Link to="#">
                <TwitterOutlined style={{ marginLeft: 30, marginRight: 10 }} />
              </Link>
              <Link to="#">
                <FacebookFilled style={{ marginRight: 10 }} />
              </Link>
              <Link to="#">
                <LinkedinFilled style={{ marginRight: 10 }} />
              </Link>
            </div>
          </Space>
          <hr style={{ color: "black" }} />
        </div>
        <div className="header-menu">
          {type === "user" && (
            <Space>
              <Link to="/">
                <Button type="link">
                  <p>HOME</p>
                </Button>
              </Link>
              <Link to="/about">
                <Button type="link">
                  <p>ABOUT</p>
                </Button>
              </Link>
              <Link to="/contacts">
                <Button type="link">
                  <p>CONTACTS</p>
                </Button>
              </Link>
              <Link to="/blogs">
                <Button type="link">
                  <p>BLOG</p>
                </Button>
              </Link>
            </Space>
          )}

          <Space className="header-icon-login">
            <Badge
              count={cartList.data.length}
              size="small"
              onClick={() => history.push("/cart")}
              className="header-car"
              style={{ marginRight: 25 }}
            >
              <ShoppingCartOutlined
                style={{ color: "#237804" }}
                className="header-button-icon"
              />
            </Badge>
            {userInfo.data.name ? (
              <Dropdown overlay={renderUserDropdown()} trigger={["click"]}>
                <p className="hearder-user-info">{userInfo.data.name}</p>
              </Dropdown>
            ) : (
              <Link to="/login">
                <Button type="primary">Đăng nhập</Button>
              </Link>
            )}
          </Space>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  return {
    userInfo: userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Header);
