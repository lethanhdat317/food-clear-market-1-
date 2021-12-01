import { Form, Input, Select, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { registerAction } from '../../redux/actions';

function RegisterPage() {

  const { responseAction } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [registerForm] = Form.useForm();
  
  useEffect(() => {
    if (responseAction.register.error) {
      registerForm.setFields([
        {
          name: 'email',
          errors: [responseAction.register.error]
        },
      ]);
    }
  }, [responseAction.register])

  function handleSubmit(values) {
    dispatch(registerAction({
      data: {
        name: values.name,
        email: values.email,
        password: values.password,
        gender: values.gender,
        cart: [],
        role: 'user',
      },
    }));
  }

  return (
    <div className="register-container">
      <div className="login-register-form">
        <div className="login-register-title">
          <h2>Register</h2>
        </div>
        <Form
          form={registerForm}
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={(values) => handleSubmit(values)}
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Bạn chưa nhập tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: "Bạn chưa nhập giới tính!" }]}
          >
            <Select>
              <Select.Option value="male">Nam</Select.Option>
              <Select.Option value="female">Nữ</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Bạn chưa nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
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
                    new Error(
                      "Mật khẩu xác nhận không chính xác!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
           name="agree" 
           valuePropName="checked"
           rules={[{ required: true, message: "Bạn phải đồng ý mọi điều khoản!" }]}
           >
            <Checkbox>Đồng ý với các điều khoản</Checkbox>
          </Form.Item>

          <div style={{ display: "inline-block", marginBottom: 16 }}>
            Bạn đã có tài khoản?&nbsp;
            <Link to="/login" style={{color: '#0050b3'}}>
              Đăng nhập
            </Link>
          </div>

          <Button 
            type="primary" 
            htmlType="submit" 
            block
            loading={responseAction.register.load}
          >
            Đăng kí
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;
