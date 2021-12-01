import { Form, Input, Button, Checkbox, notification } from "antd";
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { loginAction } from '../../redux/actions';

// import { userList } from '../../constants/user';

function LoginPage() {
  // function handleSubmit(values) {
  //   const userInfo = userList.find((user) => {
  //     return user.email === values.email && user.password === values.password;
  //   })
  //   if (userInfo) {
  //     localStorage.setItem('userInfo', JSON.stringify(userInfo));
  //     if (userInfo.role === 'user') {
  //       history.push('/');
  //     } else {
  //       history.push('/admin')
  //     }
  //   } else {
  //     notification.error({
  //       message: 'Đăng nhập thất bại',
  //       description: 'Email hoặc mật khẩu không đúng!'
  //     })
  //   }
  // }

  const { responseAction } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const [loginForm] = Form.useForm();

  useEffect(() => {
    if (responseAction.login.error) {
      loginForm.setFields([
        {
          name: 'email',
          errors: [' ']
        },
        {
          name: 'password',
          errors: [responseAction.login.error]
        },
      ]);
    }
  }, [responseAction.login])

  function handleSubmit(values) {
    dispatch(loginAction({
      data: values,
    }));
  }

  return (
    <div className="login-container">
      <div className="login-register-form">
        <div className="login-register-title">
          <h2>Login</h2>
        </div>
        <Form
          form={loginForm}
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={(values) => handleSubmit(values)}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Bạn cần nhập email!",
              },
              {
                type: "email",
                message: "Không tìm thấy email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Bạn cần nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Ghi nhớ tài khoản</Checkbox>
          </Form.Item>

          <Form.Item>
            <div style={{ display: "inline-block", marginBottom: 16 }}>
              Bạn chưa có tài khoản?&nbsp;
              Bấm vào đây để
              <Link to="/register" style={{color: '#0050b3'}}> đăng ký.</Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              block
              loading={responseAction.login.load}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default LoginPage;
