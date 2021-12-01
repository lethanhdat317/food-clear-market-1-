import { useEffect } from "react";
import { Card, Row, Col, Table, Button, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { getOrderHistoryAction } from "../../../../redux/actions";
import { current } from "immer";

function OrderPage() {
  const { userInfo } = useSelector((state) => state.userReducer);
  const { orderHistory } = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(getOrderHistoryAction({ userId: userInfo.data.id }));
    }
  }, [userInfo]);
  const columns = [
    {
      title: "Tên",
      // width: 100,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      // width: 100,
      dataIndex: "email",
      key: "email",
    },
    { title: "SĐT", dataIndex: "numberphone", key: "numberphone" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    { title: "Chú ý", dataIndex: "note", key: "note" },
    { title: "Tổng tiền", dataIndex: "totalprice", key: "totalprice" },
    { title: "Thanh toán", dataIndex: "checkout", key: "checkout" },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
  ];
  function renderOrdersList() {
    return orderHistory.data.map((orderItem, orderIndex) => {
      return (
        <>
          <tr>
            <td style={{borderRight: 'none'}}>
              <button bordered={false} style={{backgroundColor: "white", width: '2em', cursor:"pointer", borderRadius: '150%'}}>
                +
              </button>
            </td>
            <td style={{borderLeft: 'none'}}>{orderItem.name}</td>
            <td>{orderItem.email}</td>
            <td>{orderItem.phoneNumber}</td>
            <td>{orderItem.address}</td>
            <td>{orderItem.note}</td>
            <td>{orderItem.totalPrice.toLocaleString()} vnd</td>
            <td>{orderItem.checkoutInfo}</td>
            <td>{orderItem.status}</td>
          </tr>
          <tr>

          </tr>
        </>
      );
    });
  }
  return (
    <Row>
      <Col span={24} className="main-tile-profile">
        <Card size="small" className="main-tile-profile">
          <Space>Lịch sử giao dịch</Space>
        </Card>
      </Col>
      <Col span={24} className="main-oder-container" >
        <table >
          <tr >
            <th style={{borderRight: 'none'}}></th>
            <th style={{width:1000, borderLeft:'none'}}>Tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Địa chỉ</th>
            <th>Chú ý</th>
            <th>Tổng tiền</th>
            <th>Thanh toán</th>
            <th>Trạng thái</th>
          </tr>
          {renderOrdersList()}
        </table>
      </Col>
    </Row>
  );
}
export default OrderPage;
