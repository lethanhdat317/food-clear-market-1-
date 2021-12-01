
import {
  Row,
  Col,
  Image,
  Button,
  Space,
  Divider,
  InputNumber,
  Rate,
} from "antd";
import { ShoppingCartOutlined, CarOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { AiOutlineArrowLeft } from "react-icons/ai";

import history from "../../../utils/history";

import {
  getProductDetailAction,
  addToCartAction,
} from "../../../redux/actions";

function ProductDetailPage({ match }) {
  const [productCount, setProductCount] = useState(1);

  const productId = parseInt(match.params.id);

  const { userInfo } = useSelector((state) => state.userReducer);
  const { productDetail } = useSelector((state) => state.productReducer);
  const { cartList } = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetailAction({ id: productId }));
  }, []);

  function handleAddToCart() {
    const cartData = [...cartList.data];
    const cartIndex = cartData.findIndex(
      (item) => item.productId === productId
    );
    if (cartIndex !== -1) {
      cartData.splice(cartIndex, 1, {
        ...cartData[cartIndex],
        count: cartData[cartIndex].count + productCount,
      });
      dispatch(
        addToCartAction({
          id: userInfo.data.id,
          data: { cart: cartData },
        })
      );
    } else {
      const newCartData = [
        ...cartData,
        {
          id: uuidv4(),
          productId: productId,
          image: productDetail.data.image,
          name: productDetail.data.name,
          price: productDetail.data.price,
          count: productCount,
        },
      ];
      dispatch(
        addToCartAction({
          id: userInfo.data.id,
          data: { cart: newCartData },
        })
      );
    }
  }

  return (
    <>
      <Row className="detail-content">
        <Col span={24}>
          <Row>
              <button className="button-back" onClick={() => history.goBack()}>
                <AiOutlineArrowLeft 
                  style=
                    {{
                      fontSize: 25,
                      marginBottom: -15,
                    }}
                />
                </button>
              <p className="main-title-name-page" style={{marginLeft:'-0.5em'}}>
                THÔNG TIN SẢN PHẨM
              </p>
              <Divider className="main-style-hr" style={{ marginTop: -5, border: "2px groove #237804" }} />
          </Row>
        </Col>
        <Col span={7} className="detail-image">
          <Image
            width={325}
            alt={productDetail.data.name}
            src={productDetail.data.image}
          />
        </Col>
        <Col span={17} className="detail-info">
          <p className="detail-name-product">{productDetail.data.name}</p>
          <p className="detail-category-product">
            Loại sản phẩm: {productDetail.data.category?.name}
          </p>
          <p className="detail-pice-product">
            Giá:
            {productDetail.data.price >= 0 &&
              ` ${productDetail.data.price.toLocaleString()} Vnd`}
            <span>{` ${productDetail.data.unit}`}</span>
          </p>
          <Rate disabled defaultValue={2} style={{ rateStarSize: 300 }} />
          <p>
            Những bữa ăn tươi sạch luôn là mối quan tâm hàng đầu của người tiêu
            dùng hiện nay. Thấu hiểu điều đó, MM Mega Market đã xây dựng hệ
            thống nông trại rau củ quả tại Đà Lạt, Tiền Giang theo tiêu chuẩn
            VietGap & HACCP trong kiểm soát các nguy cơ về an toàn vệ sinh thực
            phẩm. MM Mega Market tự hào là sự lựa chọn hàng đầu về các sản phẩm
            rau củ, trái cây tươi, với mức đầu tư quy mô cho chuỗi quy trình
            khép kín từ trồng trọt, chăm sóc, thu hoạch đến vận chuyển. Quá
            trình này luôn có sự tham gia của đội ngũ kỹ sư nông nghiệp MM, làm
            việc trực tiếp với nông dân và hợp tác xã để chọn giống, lên kế
            hoạch sản xuất, thu hoạch, bao bì đóng gói và phân phối đến các
            trung tâm trên toàn quốc.
          </p>

          <div className="detail-count-product">
            <InputNumber
              min={1}
              onChange={(value) => setProductCount(value)}
              value={productCount}
            />
          </div>
          <Space>
            {/* <Button
              type="primary"
              icon={<CarOutlined />}
              style={{
                marginLeft: -6,
                backgroundColor: "#237804",
              }}
            >
              Mua ngay
            </Button> */}
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={() => handleAddToCart()}
              style={{
                backgroundColor: "#389e0d",
              }}
            >
              Thêm vào giỏ
            </Button>
          </Space>
        </Col>
      </Row>
    </>
  );
}

export default ProductDetailPage;
