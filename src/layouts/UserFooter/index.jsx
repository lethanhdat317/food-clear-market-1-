import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import logoHeader from "../../assets/images/logo-mixi-removebg.png";
import { MailFilled, YoutubeFilled, FacebookFilled } from "@ant-design/icons";
import { AiFillEnvironment } from "react-icons/ai";
function Footer() {
  return (
    <>
      <Row className="footer-container">
        <Col span={3} className="footer-col">
          <Link to="/">
            <img
              src={logoHeader}
              alt="logo"
              style={{ width: 150, height: 90 }}
            />
          </Link>
        </Col>
        <Col span={21}>
          <Row style={{ marginTop: 25 }}>
            <Col span={9} offset={1} className="footer-col">
              <p className="footer-label">Về chúng tôi</p>
              <p style={{textAlign: "justify"}}>
                Cuộc sống bận rộn với nhiều vai trò khiến những người phụ nữ
                hiện đại thiếu thốn thời gian cho những việc lặt vặt như đi chợ,
                mua sắm… Và còn trong thời kỳ đại dịch Covit đang hoành hoành
                như hiện tại thì việc ra đường ngay lúc này rất là bất tiện.
                Trong bối cảnh đó, chúng tôi<a><span className='footer-mixi'> Mixi food</span></a> mang đến cho khách hàng
                tiêu dùng dịch vụ đi chợ online ra đời như một xu hướng tất yếu
                của cuộc sống hiện đại.
              </p>
            </Col>
            <Col span={6} className="footer-col">
              <p className="footer-label">Liên kết liên quan</p>
              <ul className="footer-ul">
                <li>Điều kiện & Điều khoản</li>
                <li>Quy chế hoạt động</li>
                <li>Câu hỏi thường gặp</li>
                <li>Tin khuyến mãi</li>
                <li>Hệ thống chi nhánh</li>
              </ul>
            </Col>
            <Col span={8} className="footer-col">
              <p className="footer-label">Liên hệ</p>
              <p>Tư vấn miễn phí (24/7):</p>
              <span>1800 XXXX</span>
              <p>Góp ý, phản ánh (8h00 - 22h00):</p>
              <span> 1800 XXXX </span>
            </Col>
          </Row>

          <Row>
            <Col span={9} offset={1} className="footer-col">
              <p className="footer-label">Liên kết</p>
              <p>
                <MailFilled className='footer-icons' />Email: 
                <a href="mailto:mixi@foodscleanmarket.com">
                   hotromixi@foodscleanmarket.com
                </a>
              </p>
              <p>
                <FacebookFilled className='footer-icons' />Fanpage: 
                <a href="fb.com/mixifoodsmarket">
                   fb.com/mixifoodsmarket
                </a>
              </p>
              {/* <p><YoutubeFilled /> Youtube: Piano Shop</p> */}
            </Col>
            <Col span={14} className="footer-col">
              <p className="footer-label">Địa chỉ</p>
              <p>
                <AiFillEnvironment className='footer-icons'
                  style={{height: 17, paddingTop:0}}
                />
                86 Nguyễn Sinh Sắc, Phường Hòa Minh, Quận Liên Chiểu, TP Đà Nẵng.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Footer;
