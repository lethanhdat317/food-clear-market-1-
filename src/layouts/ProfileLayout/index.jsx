import { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import history from "../../utils/history";

import UserHeader from "../UserHeader";
import UserFooter from "../UserFooter";
import { Row, Col, Avatar } from "antd";

// import * as Style from './styles';

const MENU_PROFILE = [
  {
    title: "Thông tin cá nhân",
    path: "/profile",
    icon: "",
  },
  {
    title: "Lịch sử giao dịch",
    path: "/profile/oder",
    icon: "",
  },
  {
    title: "Đổi mật khẩu",
    path: "/profile/change-password",
    icon: "",
  },
  // {
  //   title: 'Đăng xuất',
  //   path: '/admin/to-do-list',
  //   icon: '',
  // }
];
function ProfileLayout({
  exact,
  path,
  component: Component,
  location,
  isShowSidebar,
}) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  function renderMenuProfilePage() {
    return MENU_PROFILE.map((menuItem, menuIndex) => {
      return (
        <>
          <div
            className="menu-profile"
            key={`menu-${menuIndex}`}
            active={location.pathname === menuItem.path}
            onClick={() => history.push(menuItem.path)}
          >
            {menuItem.title}
          </div>
        </>
      );
    });
  }
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            <UserHeader type="user"/>
            <Row className="main-profile-container">
              <Col offset={2} span={4} className="profile-left">
                <div>
                  <Avatar
                    size={200}
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                </div>
                {renderMenuProfilePage()}
              </Col>
              <Col  span={16} className="profile-container">
                <Component {...routeProps} />
              </Col>
            </Row>
            <UserFooter />
          </>
        );
      }}
    />
  );
}

export default ProfileLayout;
