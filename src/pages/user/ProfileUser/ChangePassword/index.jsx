import { Card, Row, Col, Input, Button, notification, Space, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function ProfilePage() {
  const { userInfo } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  function renderProfileUser() {
    return (
      <>
        <Row>
          <Col span={24} style={{padding: '1em'}}>
            <Form
              // form={checkoutForm}
              name="basic"
              layout="vertical"
              // initialValues={{
              //   name: userInfo.data.name,
              //   email: userInfo.data.email,
              // }}
              // onFinish={(values) => handleOrder(values)}
            >
              <Card size="small" className="main-tile-profile">
                <Space>Đổi mật khẩu</Space>
              </Card>
              <Row gutter={16}>
                <Col span={20} offset={2} style={{marginTop: 30}}>
                  <Form.Item
                    label="Mật khẩu cũ"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Bạn cần nhập mật khẩu cũ!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
                <Col span={20} offset={2}>
                    <Form.Item
                      label="Mật khẩu mới"
                      name="password"
                      rules={[
                        { required: true, message: "Bạn cần nhập mật khẩu mới!" },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>
                  <Col span={20} offset={2}>
                    <Form.Item
                      name="confirm"
                      label="Xác nhận mật khẩu"
                      dependencies={["password"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Bạn chưa xác nhận lại mật khẩu!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Mật khẩu xác nhận không chính xác!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>
              </Row>
              <Row style={{float: 'right', paddingRight: '6em'}}>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Đổi mật khẩu
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
  return <>{renderProfileUser()}</>;
}
// }
export default ProfilePage;
