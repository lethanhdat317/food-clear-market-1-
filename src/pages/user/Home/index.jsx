import {
  Row,
  Col,
  Card,
  Input,
  Space,
  Button,
  Carousel,
  Slider,
  Checkbox,
  Select,
  Tag,
} from "antd";
import { Link } from "react-router-dom";
// import { productList } from "../../../constants/product";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PRODUCT_LIMIT } from '../../../constants/product';

import { ShoppingCartOutlined, CarOutlined, SearchOutlined } from "@ant-design/icons";

import banner1 from "../../../assets/images/banner-1.png";
import banner2 from "../../../assets/images/banner-2.jpg";
import banner3 from "../../../assets/images/banner-3.jpg";
import banner4 from "../../../assets/images/banner-4.png";
import certificate from "../../../assets/images/certificate.png";
import ship from "../../../assets/images/itruck-filled.png";
import refresh from "../../../assets/images/refresh.png";
import protect from "../../../assets/images/protect-filled.png";

import imgContentsLeft from "../../../assets/images/left-contents.jpg";

import {
  getProductListAction,
  getCategoryListAction,
} from "../../../redux/actions";

// css banner
const contentStyle = {
  height: "350px",
  width: "1350px",
  marginBottom: "10px",
  background: "#364d79",
};


//select theo các hình thức
const { Option } = Select;

function HomePage() {
  const [categoriesSelected, setCategoriesSelect] = useState([]);
  const [priceRange, setPriceRange] = useState([10000, 1000000]);
  const [searchKey, setSearchKey] = useState("");

  const { productList } = useSelector((state) => state.productReducer);
  const { categoryList } = useSelector((state) => state.categoryReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getProductListAction({ page: 1 }));
  }, []);

  function handleFilterCategory(value) {
    setCategoriesSelect(value);
    dispatch(
      getProductListAction({
        page: 1,
        categoriesSelected: value,
        priceRange,
        searchKey,
      })
    );
  }

  function handleRangePrice(value) {
    setPriceRange(value);
    dispatch(
      getProductListAction({
        page: 1,
        categoriesSelected,
        priceRange,
        searchKey,
      })
    );
  }

  function handleSearchProduct(value) {
    setSearchKey(value);
    dispatch(
      getProductListAction({
        page: 1,
        categoriesSelected,
        priceRange,
        searchKey: value,
      })
    );
  }

  function handleShowMore() {
    dispatch(
      getProductListAction({
        page: productList.page + 1,
        searchKey: searchKey,
        categoriesSelected,
        priceRange,
        more: true,
      })
    );
  }

  function renderCategoryFilter() {
    if (
      categoriesSelected.length === 0 &&
      !searchKey &&
      priceRange[0] === 10000 &&
      priceRange[1] === 1000000
    )
      return null;
    return (
      <Space wrap style={{ marginBottom: 16 }}>
        Đang filter theo:
        {categoriesSelected.length > 0 &&
          categoriesSelected.map((selectedItem, selectedIndex) => {
            const categorySelectedData = categoryList.data.find(
              (categoryItem) => categoryItem.id === selectedItem
            );
            return (
              <Tag
                key={`category-${selectedIndex}`}
                closable
                onClose={(e) => {
                  e.preventDefault();
                  const newCategoriesSelect = [...categoriesSelected];
                  newCategoriesSelect.splice(selectedIndex, 1);
                  setCategoriesSelect(newCategoriesSelect);
                  dispatch(
                    getProductListAction({
                      page: 1,
                      categoriesSelected: newCategoriesSelect,
                      priceRange,
                      searchKey: searchKey,
                    })
                  );
                }}
              >
                {categorySelectedData.name}
              </Tag>
            );
          })}
        {searchKey && (
          <Tag
            closable
            onClose={() => {
              setSearchKey("");
              dispatch(
                getProductListAction({
                  page: 1,
                  categoriesSelected,
                  priceRange,
                  searchKey: undefined,
                })
              );
            }}
          >
            {`Tìm theo từ khóa: ${searchKey}`}
          </Tag>
        )}
        {(priceRange[0] !== 0 || priceRange[1] !== 1000000) && (
          <Tag
            closable
            onClose={() => {
              setPriceRange([0, 1000000]);
              dispatch(
                getProductListAction({
                  page: 1,
                  categoriesSelected,
                  priceRange: [0, 1000000],
                  searchKey,
                })
              );
            }}
          >
            {`Giá từ: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}`}
          </Tag>
        )}
      </Space>
    );
  }

  function renderCategoryCheckbox() {
    const categoryCheckbox = categoryList.data.map((categoryItem) => ({
      label: categoryItem.name,
      value: categoryItem.id,
    }));
    return (
      <Checkbox.Group
        options={categoryCheckbox}
        onChange={(value) => handleFilterCategory(value)}
        value={categoriesSelected}
      />
    );
  }

  function renderProductList() {
    return productList.data.map((productItem, productIndex) => {
      return (
        <Col span={8} key={`product-item-${productItem.id}`}>
          <Link to={`/product/${productItem.id}`}>
          <Card
              hoverable
              style={{
                width: 300,
              }}
              cover={<img alt="example" src={productItem.image} />}
            >
              <h1>{productItem.name}</h1>
              <p>{`${productItem.price.toLocaleString()} VND`}</p>
              <Row
                style={{
                  marginTop: 10,
                  padding: 0,
                }}
              >
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
                  {/* <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    style={{
                      backgroundColor: "#389e0d",
                    }}
                  >
                    Thêm vào giỏ
                  </Button> */}
                </Space>
              </Row>
            </Card>
          </Link>
        </Col>
        
      );
    });
  }

  
  return (
    <>
      <Carousel autoplay>
        <div>
          <img src={banner1} alt="banner1" style={contentStyle} />
        </div>
        <div>
          <img src={banner2} alt="banner2" style={contentStyle} />
        </div>
        <div>
          <img src={banner3} alt="banner3" style={contentStyle} />
        </div>
        <div>
          <img src={banner4} alt="banner4" style={contentStyle} />
        </div>
      </Carousel>
      <Row style={{ marginLeft: 40, marginRight: 40 }}>
        <Col
          span={6}
          style={{
            // background: 'gray',
            padding: "80px 5px 5px 5px",
          }}
        >
          <Row gutter={[0, 0]}>
            <p
              style={{
                fontWeight: "bold",
                fontSize: 19,
              }}
            >
              CÁC LOẠI SẢN PHẨM
            </p>
            {renderCategoryCheckbox()}
          </Row>
          <Row
            gutter={[0, 0]}
            style={{
              marginTop: 30,
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: 19,
              }}
            >
              GIÁ BÁN
            </p>
            <Col span={24}>
              <Slider
                style={{width:'90%'}}
                min={10000}
                max={1000000}
                step={10000}
                range
                tipFormatter={(value) => value.toLocaleString()}
                onChange={(value) => handleRangePrice(value)}
                value={priceRange}
              />
            </Col>
            
          </Row>
          <Row
            gutter={[0, 0]}
            style={{
              marginTop: 30,
            }}
          >
            <Col span={24}>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: 19,
                }}
              >
                SẢN PHẨM NỔI BẬT
              </p>
            </Col>
            <Col span={24}>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </Col>
            <Col
              span={24}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={imgContentsLeft}
                alt="imgContentsLeft"
                style={{
                  width: "90%",
                }}
              />
            </Col>
            <Col span={24}>
              <p className="text-center">Tại sao nên chọn chúng tôi</p>
              <ul className="group-list">
                <li>
                  <img
                    src={certificate}
                    alt="certificate"
                    className="group-list-image"
                    style={{ margin: "0 0.4em 0 -0.3em" }}
                  />
                  <span>Sản phẩm đạt chuẩn an toàn thực phẩm</span>
                </li>
                <li>
                  <img
                    src={ship}
                    alt="ship"
                    className="group-list-image"
                    style={{ width: 21, margin: "0 0.4em 4px 0" }}
                  />
                  <span>Giao hàng toàn quốc</span>
                </li>
                <li>
                  <img
                    src={refresh}
                    alt="refresh"
                    className="group-list-image"
                    style={{ width: 22, margin: "5px 0.3em 4px 0" }}
                  />
                  <span>Đổi trả trong vòng 15 ngày</span>
                </li>
              </ul>
            </Col>
          </Row>
        </Col>

        <Col
          span={18}
          style={
            {
              // background: '#e6f7ff'
            }
          }
        >
          <Input
            placeholder="Tìm kiếm..."
            onChange={(e) => handleSearchProduct(e.target.value)}
            value={searchKey}
            suffix={<SearchOutlined />}
            style={{ marginBottom: 16, width: '80%', margin: '0px auto'}}
          />
          {renderCategoryFilter()}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: 20,
              paddingRight: "5%",
            }}
          >
            <Select
              className="select-product"
              showSearch
              style={{ width: 200, marginBottom: 15 }}
              placeholder="Phân loại mặc định"
              optionFilterProp="children"
              bordered={false}
              // onChange={onChange}
              // onFocus={onFocus}
              // onBlur={onBlur}
              // onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="up">Giá từ thấp đến cao</Option>
              <Option value="down">Giá từ cao đến thấp</Option>
              <Option value="new">Sản phẩm mới nhất</Option>
            </Select>
          </div>
          <div style={{ padding: 0 }}>
            <Row gutter={[22, 25]}>{renderProductList()}</Row>
          </div>
          <Row
            style={{
              marginBottom: 10,
            }}
          >
            {productList.data.length % PRODUCT_LIMIT === 0 && (
              <Row justify="center" style={{ marginTop: 16 }}>
                <Button onClick={() => handleShowMore()}
                  style={{marginLeft:'30em'}}
                >
                  Show more
                </Button>
              </Row>
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default HomePage;
