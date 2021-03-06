
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
                TH??NG TIN S???N PH???M
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
            Lo???i s???n ph???m: {productDetail.data.category?.name}
          </p>
          <p className="detail-pice-product">
            Gi??:
            {productDetail.data.price >= 0 &&
              ` ${productDetail.data.price.toLocaleString()} Vnd`}
            <span>{` ${productDetail.data.unit}`}</span>
          </p>
          <Rate disabled defaultValue={2} style={{ rateStarSize: 300 }} />
          <p>
            Nh???ng b???a ??n t????i s???ch lu??n l?? m???i quan t??m h??ng ?????u c???a ng?????i ti??u
            d??ng hi???n nay. Th???u hi???u ??i???u ????, MM Mega Market ???? x??y d???ng h???
            th???ng n??ng tr???i rau c??? qu??? t???i ???? L???t, Ti???n Giang theo ti??u chu???n
            VietGap & HACCP trong ki???m so??t c??c nguy c?? v??? an to??n v??? sinh th???c
            ph???m. MM Mega Market t??? h??o l?? s??? l???a ch???n h??ng ?????u v??? c??c s???n ph???m
            rau c???, tr??i c??y t????i, v???i m???c ?????u t?? quy m?? cho chu???i quy tr??nh
            kh??p k??n t??? tr???ng tr???t, ch??m s??c, thu ho???ch ?????n v???n chuy???n. Qu??
            tr??nh n??y lu??n c?? s??? tham gia c???a ?????i ng?? k??? s?? n??ng nghi???p MM, l??m
            vi???c tr???c ti???p v???i n??ng d??n v?? h???p t??c x?? ????? ch???n gi???ng, l??n k???
            ho???ch s???n xu???t, thu ho???ch, bao b?? ????ng g??i v?? ph??n ph???i ?????n c??c
            trung t??m tr??n to??n qu???c.
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
              Th??m v??o gi???
            </Button>
          </Space>
        </Col>
      </Row>
    </>
  );
}

export default ProductDetailPage;
