// import { cartList } from "../../../constants/cart";
import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  notification,
  Divider,
  Empty,
} from "antd";

import { useSelector, useDispatch } from "react-redux";
import history from "../../../utils/history";

import { PlusOutlined, MinusOutlined, CloseOutlined } from "@ant-design/icons";

import {
  minusItemCountAction,
  plusItemCountAction,
  deleteCartItemAction,
} from "../../../redux/actions";
import { Link } from "react-router-dom";
function CartPage() {
  const { cartList } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  let totalPrice = 0;

  function handlePlusCount(index) {
    const newCartData = [...cartList.data];
    newCartData.splice(index, 1, {
      ...newCartData[index],
      count: newCartData[index].count + 1,
    });
    dispatch(
      plusItemCountAction({
        id: userInfo.data.id,
        data: { cart: newCartData },
      })
    );
  }

  function handleMinusCount(index) {
    if (cartList.data[index].count === 1) return null;
    console.log(
      cartList
    );
    const newCartData = [...cartList.data];
    newCartData.splice(index, 1, {
      ...newCartData[index],
      count: newCartData[index].count - 1,
    });
    dispatch(
      minusItemCountAction({
        id: userInfo.data.id,
        data: { cart: newCartData },
      })
    );
  }

  function handleDeleteItem(index) {
    const newCartData = [...cartList.data];
    newCartData.splice(index, 1);
    dispatch(
      deleteCartItemAction({
        id: userInfo.data.id,
        data: { cart: newCartData },
      })
    );
  }

  function handleCheckout() {
    if (!userInfo.data.id) {
      notification.warn({
        message: "Bạn chưa đăng nhập",
      });
    } else {
      history.push("/checkout");
    }
  }

  function renderCartItems() {
    return cartList.data.map((cartItem, cartIndex) => {
      totalPrice = totalPrice + cartItem.price * cartItem.count;
      return (
        <Card
          key={`cart-${cartItem.id}`}
          size="small"
          className="render-cart-item"
        >
          <Row className="render-cart-item">
            <Col span={3} className="render-cart-item image">
              <img
                src={cartItem.image}
                alt={cartItem.name}
                srcset=""
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={7} className="render-cart-item name">
              {cartItem.name}
            </Col>
            <Col span={3} className="render-cart-item price">
              {cartItem.price.toLocaleString()}
            </Col>
            <Col span={5} className="render-cart-item count">
              <Input.Group compact>
                <Button
                  icon={<MinusOutlined />}
                  onClick={() => handleMinusCount(cartIndex)}
                />
                <Input
                  value={cartItem.count}
                  readOnly
                  style={{ width: 40, textAlign: "center" }}
                />
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => handlePlusCount(cartIndex)}
                />
              </Input.Group>
            </Col>
            <Col span={4} className="render-cart-item total">
              {(cartItem.price * cartItem.count).toLocaleString()}
            </Col>
            <Col span={2} className="render-cart-item delete">
              <Button
                type="text"
                danger
                icon={<CloseOutlined />}
                onClick={() => handleDeleteItem(cartIndex)}
              />
            </Col>
          </Row>
        </Card>
      );
    });
  }
  function renderCartList() {
    if (!userInfo.data.id) {
      return (
        <>
          <Col span={24}>
            <Empty
              imageStyle={{
                height: 350,
              }}
              description={
                <span>
                  Bạn cần đăng nhập để thêm vào giỏ hàng
                </span>
              }
            >
              <Link to="/login">
                <Button type="primary">Đăng nhập</Button>
              </Link>
            </Empty>
          </Col>
        </>
      );
    } else if (cartList.data.length > 0) {
      return (
        <>
          <Col span={18}>
            <Card size="small" className="card-title">
              <Row>
                <Col span={3}></Col>
                <Col span={7}>Tên</Col>
                <Col span={3}>Giá (vnd)</Col>
                <Col span={5}>Số lượng</Col>
                <Col span={4}>Tổng giá (vnd)</Col>
                <Col span={2}></Col>
              </Row>
            </Card>
            <Row>{renderCartItems()}</Row>
          </Col>

          <Col span={6}>
            <Row className="cart-col-right">
              <Col span={24}>
                <Row>
                  <p className="cart-col-right-title">
                    TỔNG <span>GIỎ HÀNG</span>
                  </p>
                </Row>
                <Row>
                  <p className="cart-col-right-totalPrice">
                    Thành tiền: {totalPrice.toLocaleString()} VND
                  </p>
                </Row>
                <Row>
                  <Col span={15}>
                    <Input placeholder="Mã giảm giá" />
                  </Col>
                  <Col span={8} offset={1}>
                    <Button
                      type="primary"
                      ghost
                      className="cart-col-right-button-sale"
                    >
                      ÁP DỤNG
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Button
                    block
                    className="cart-col-right-checkout"
                    onClick={() => handleCheckout()}
                  >
                    THANH TOÁN
                  </Button>
                </Row>
              </Col>
            </Row>
          </Col>
        </>
      );
    } else {
      return (
        <>
          <Col span={24}>
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 300,
              }}
              description={<span>Giỏ hàng trống</span>}
            >
              <Link to="/">
                <Button type="primary">Mua hàng ngay</Button>
              </Link>
            </Empty>
          </Col>
        </>
      );
    }
  }
  return (
    <>
      <Row className="cart-container">
        <Col span={24}>
          <Row>
            <p className="main-title-name-page">GIỎ HÀNG</p>
            <Divider className="main-style-hr" style={{ marginTop: -5, border: "2px groove #237804" }} />
          </Row>
          <Row>{renderCartList()}</Row>
        </Col>
      </Row>
    </>
  );
}

export default CartPage;
