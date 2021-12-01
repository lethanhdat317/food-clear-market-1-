import { useEffect } from "react";
import { Card, Row, Col, Input, Button, Form, Radio, Space, Divider } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { orderProductAction } from "../../../redux/actions";

function CheckoutPage() {
  // textarea
  const { TextArea } = Input;
  const onChange = (e) => {
    console.log(e);
  };

  const [checkoutForm] = Form.useForm();

  const { cartList } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  let totalPrice = 0;

  useEffect(() => {
    if (userInfo.data.id) {
      checkoutForm.resetFields();
    }
  }, [userInfo.data.id]);

  function handleOrder(values) {
    dispatch(
      orderProductAction({
        id: userInfo.data.id,
        data: {
          userId: userInfo.data.id,
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          address: values.address,
          note: values.note,
          products: cartList.data,
          totalPrice,
          checkoutInfo: values.checkoutInfo,
          status: "waiting",
        },
      })
    );
  }

  function renderCartItems() {
    return cartList.data.map((cartItem, cartIndex) => {
      totalPrice = totalPrice + cartItem.price * cartItem.count;
      return (
        <>  
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
            <Col span={12} className="render-cart-item name">
              {cartItem.name}
            </Col>
            <Col span={3} className="render-cart-item price">
              {cartItem.price.toLocaleString()}
            </Col>
            <Col span={3} className="render-cart-item count">
              x{cartItem.count}
            </Col>
            <Col span={3} className="render-cart-item total">
              {(cartItem.price * cartItem.count).toLocaleString()}
            </Col>
          </Row>
        </Card>
          
        </>
      );
    });
  }

  return (
    <>
      <Row className="cart-container">
        <Col>
          <Row>
            <p className="main-title-name-page">THANH TOÁN</p>
            <Divider className="main-style-hr" style={{ marginTop: -5, border: "2px groove #237804" }} />
          </Row>
          <Row>
            <Col span={14}>
              <Form
                form={checkoutForm}
                name="basic"
                layout="vertical"
                initialValues={{
                  name: userInfo.data.name,
                  email: userInfo.data.email,
                }}
                onFinish={(values) => handleOrder(values)}
              >
                <Card
                  title="Thông tin cá nhân"
                  size="small"
                  style={{ margin: "16px 0" }}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Tên"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Tên không được để trống!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Email không đươc để trống!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[
                          {
                            required: true,
                            message: "Số điện thoại không đươc để trống!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[
                          {
                            required: true,
                            message: "Địa chỉ không được để trống!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label="Need Attention"
                        name="note"
                      >
                        <TextArea
                          placeholder="Những điều bạn muốn cửa hàng chú ý"
                          allowClear
                          onChange={onChange}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
                <Card title="Thông tin thanh toán" size="small">
                  <Form.Item name="checkoutInfo">
                    <Radio.Group>
                      <Space direction="vertical">
                        <Radio value="momo">Momo</Radio>
                        <Radio value="zalo">Zalo Pay</Radio>
                        <Radio value="atm">Thẻ ATM</Radio>
                        <Radio value="visa">Thẻ VISA, Master, JCB</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Card>
                <Button
                  htmlType="submit"
                  type="primary"
                  block
                  style={{ marginTop: 16 }}
                >
                  Thanh Toán
                </Button>
              </Form>
            </Col>
            <Col span={10}
              style=
              {{
                margin: "16px 0",
                padding: "0 20px 20px 20px"
              }}
            >
              <Card span={10}
                size="small"
                className="card-title"
                >
                  Thông tin đơn hàng
                </Card>
                  {renderCartItems()}
                  
                  <Card span={10}
                size="small"
                className="card-title"
                >
                  <p className="cart-col-right-totalPrice"
                    style={{marginTop: 10, }}
                  >
                    Thành tiền: {totalPrice.toLocaleString()} VND
                  </p>
                </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default CheckoutPage;
