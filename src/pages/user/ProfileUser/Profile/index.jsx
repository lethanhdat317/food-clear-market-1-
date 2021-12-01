import {
  Card,
  Row,
  Col,
  Input,
  Button,
  notification,
  Space,
  Form,
  Select,
} from "antd";
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { editUserInfoAction } from '../../../../redux/actions';

function ProfilePage() {
  const { userInfo } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [editUserInfoForm] = Form.useForm();
  const [isEdit, setIsEdit] = useState(true);

  function handleEditUserInfo(values) {
    console.log("🚀 ~ file: index.jsx ~ line 25 ~ handleEditUserInfo ~ values", values)
    dispatch(editUserInfoAction({
      // id: id,
      data: {
        updateAt: moment().valueOf(),
        ...values,
      },
    }));
  }

  function renderProfileUser() {
    if (isEdit) {
      return (
        <>
          <Row>
            <Col span={24}>
              <Card
                size="small"
                className="main-tile-profile"
              >
                <Space style={{marginRight: '46em'}}>Thông tin cá nhân</Space>
                <Space style={{marginRight: 0}}>
                  {isEdit && (
                    <Button onClick={() => setIsEdit(false)} >
                      Sửa thông tin
                    </Button>
                  )}
                </Space>
              </Card>
            </Col>
            <Col span={24}>Tên: {userInfo.data.name}</Col>
            <Col span={24}>Email: {userInfo.data.email}</Col>
            <Col span={24}>Giới tính: {userInfo.data.gender}</Col>
          </Row>
        </>
      );
    } else {
      return (
        <Form
          form={editUserInfoForm}
          name="edit-userInfo"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 20 }}
          initialValues={{
            name: userInfo.data.name,
            email: userInfo.data.email,
            gender: userInfo.data.gender,
          }}
          onFinish={(values) => {
            // handleEditUser(values, index);
            handleEditUserInfo(values)
            setIsEdit(true);
          }}
        >
          <Card
            size="small"
            className="main-tile-profile"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Space>Sửa thông tin cá nhân</Space>
          </Card>
          <Col span={21} offset={0} style={{marginTop: 40}}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Bạn cần nhập email!" }]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={21} offset={0}>
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Bạn cần nhập tên!" }]}
          >
            <Input />
          </Form.Item>
          </Col>
          <Col span={21} offset={0}>
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
          </Col>
          <Col span={22} offset={1}>
          <Row gutter={16}>
            <Col span={4} offset={8}>
              <Button type="primary" htmlType="submit" block>
                OK
              </Button>
            </Col>
            <Col span={4}>
              <Button htmlType="button" block onClick={() => setIsEdit(true)}>
                Cancel
              </Button>
            </Col>
          </Row>
          </Col>
        </Form>
      );
    }
  }
  return <>{renderProfileUser()}</>;
}
// }
export default ProfilePage;
