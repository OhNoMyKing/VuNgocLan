import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SportswearService from "../../service/SportswearService";
import { PaginationContext } from "../../../context/PaginationContext";
import Pagination from "../../common/Pagination";

function ModuleShowSportswearDetail() {
  const { sportswearId } = useParams();
  const [sportswears, setSportswears] = useState([]);
  const [relatedPhoto, setRelatedPhoto] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const { noPage, setNoPage, totalPage, setTotalPage } =
    useContext(PaginationContext);

  const [selectedSize, setSelectedSize] = useState("");
  const [listUserReviewResponseList, setListUserReviewResponseList] = useState(
    []
  );
  const [userReviewResponseList, setUserReviewResponseList] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken !== token) {
      setToken(storedToken); // Update token state if it's different
    }
  }, [token]);
  useEffect(() => {
    // Fetch users data when the component mounts
    fetchSportswear();
    fetchUserReview();
    fetchRecommendations();
  }, [sportswearId, noPage]);

  const fetchSportswear = async () => {
    try {
      // const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await SportswearService.getSportswearByID(
        token,
        sportswearId
      );
      setSportswears(response);
      setRelatedPhoto(response.list_of_related_sportswear_images);

      // Assuming the list of users is under the key 'ourUsersList'
    } catch (error) {
      console.log("Error fetching users:");
    }
  };
  const fetchUserReview = async () => {
    try {
      // const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await SportswearService.getUserReviewBySportswearID(
        token,
        sportswearId,
        noPage
      );
      setTotalPage(response.totalPage);
      setNoPage(response.currentPage);
      setListUserReviewResponseList(response);
      setUserReviewResponseList(response.userReviewResponseList);
      console.log(userReviewResponseList.length);

      // Assuming the list of users is under the key 'ourUsersList'
    } catch (error) {
      console.log("Error fetching users:");
    }
  };

  // Hàm lấy danh sách gợi ý từ API Python
  const fetchRecommendations = async () => {
    try {
      // Gọi hàm getRecommendations từ SportswearService
      console.log("Fetching recommendations for productId:", sportswearId);
      const recommendedIds = await SportswearService.getRecommendations(
        sportswearId, // ID sản phẩm hiện tại
        6 // Số sản phẩm gợi ý
      );

      // Kiểm tra xem recommendedIds có phải là mảng không
      if (Array.isArray(recommendedIds)) {
        const recommendedIdsList = recommendedIds.map((item) => item.id);
        console.log(recommendedIdsList);
        fetchRecommendedProducts(recommendedIdsList);
      } else {
        console.error("Received data is not an array:", recommendedIds);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  //
  // Hàm lấy thông tin chi tiết các sản phẩm gợi ý từ backend
  const fetchRecommendedProducts = async (recommendedIdsList) => {
    try {
      // const token = localStorage.getItem("token");
      const recommendedProductsArray = []; // Mảng lưu các sản phẩm gợi ý

      // Duyệt qua từng ID trong danh sách recommendedIdsList
      for (let i = 0; i < recommendedIdsList.length; i++) {
        const productId = recommendedIdsList[i];
        const response = await SportswearService.getSportswearByID(
          token,
          productId
        ); // Lấy thông tin sản phẩm cho từng ID

        // Kiểm tra nếu có sản phẩm trả về, rồi thêm vào mảng recommendedProductsArray
        if (response) {
          recommendedProductsArray.push(response);
        }
      }
      // Cập nhật state với danh sách các sản phẩm gợi ý
      setRecommendedProducts(recommendedProductsArray);
    } catch (error) {
      console.error("Error fetching recommended products:", error);
    }
  };

  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  let timeOut = null;
  const [quantity, setQuantity] = useState(1); // State for quantity

  // ... (rest of your code)

  useEffect(() => {
    timeOut =
      autoPlay &&
      setTimeout(() => {
        slideRight();
      }, 10000);
  });
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const slideRight = () => {
    setCurrent(current === relatedPhoto.length - 1 ? 0 : current + 1);
  };

  const slideLeft = () => {
    setCurrent(current === 0 ? relatedPhoto.length - 1 : current - 1);
  };
  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value); // Update selected size state
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (selectedSize === "") {
      alert("Please select your size.");
      return;
    }
    // Tạo đối tượng orderItemRequest
    const newOrderItemRequest = {
      sportswear_id: sportswears.id,
      quantity: quantity,
      size: selectedSize,
    };

    // Cập nhật trạng thái orderItemRequest *trước* khi ghi nhật ký

    // Bây giờ ghi nhật ký trạng thái đã cập nhật
    console.log("OrderItem Request:", newOrderItemRequest);

    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      const response = await SportswearService.createOrderItem(
        token,
        newOrderItemRequest
      );
      console.log(response);
      if (response.message === "oke") {
        // Giả sử API trả về 201 Created khi thành công
        // window.alert("Đã thêm vào giỏ hàng!");
        alert("Đã thêm vào giỏ hàng 11!");
      }
    } catch (error) {
      console.log("error");
    }
  };
  //ham render
  // Thêm vào bên dưới phần hiện tại hoặc trong phần render
  const renderRelatedProducts = () => {
    return (
      <div className="related-products mt-5">
        <h3 className="mb-4">Sản phẩm liên quan</h3>
        <div className="row">
          {recommendedProducts.map((product, index) => (
            <div key={index} className="col-md-3 col-6 mb-4">
              <div className="product-card">
                <img
                  src={product.main_image}
                  alt={product.name}
                  className="img-fluid rounded mb-2"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <h6>{product.name}</h6>
                <p>{product.price_vnd} VND</p>
                <a
                  href={`/home/detail/${product.id}`}
                  className="btn btn-primary btn-sm"
                >
                  Xem chi tiết
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="product-page">
        <div className="container">
          {/* <div className="product-control">
                        <a href="#">Previous</a>
                        <a href="#">Next</a>
                    </div> */}
          <div className="row">
            <div className="col-lg-6">
              <div
                className="carousel"
                onMouseEnter={() => {
                  setAutoPlay(false);
                  clearTimeout(timeOut);
                }}
                onMouseLeave={() => {
                  setAutoPlay(true);
                }}
              >
                <div
                  className="carousel_wrapper"
                  style={{ width: "80%", height: "80%", margin: "auto" }}
                >
                  {relatedPhoto.map((image, index) => {
                    return (
                      /* (condition) ? true : false */

                      <div
                        key={index}
                        className={
                          index == current
                            ? "carousel_card carousel_card-active"
                            : "carousel_card"
                        }
                      >
                        <img className="card_image" src={image} alt="" />
                        {/* <div className="card_overlay">
                                                    <h2 className="card_title">{title}</h2>
                                                </div> */}
                      </div>
                    );
                  })}
                  <div className="carousel_arrow_left" onClick={slideLeft}>
                    &lsaquo;
                  </div>
                  <div className="carousel_arrow_right" onClick={slideRight}>
                    &rsaquo;
                  </div>
                  <div className="carousel_pagination">
                    {relatedPhoto.map((_, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            index == current
                              ? "pagination_dot pagination_dot-active"
                              : "pagination_dot"
                          }
                          onClick={() => setCurrent(index)}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center mb-3">
                {relatedPhoto.map((image, index) => {
                  return (
                    <div className="div">
                      <img
                        style={{ width: "80px", height: "80px" }}
                        className="rounded-2"
                        src={image}
                      />
                    </div>
                  );
                })}
              </div>
              {/* owl-carousel bo thi moi hien thi anh o className ben duoi */}
              {/* <div className="product-slider ">
                                <div className="product-img">

                                    <figure>
                                        <img src={sportswears.main_photo} alt="" />
                                        <div className="p-status">new</div>
                                    </figure>
                                </div>

                            </div> */}
            </div>
            <div className="col-lg-6">
              <div className="product-content">
                <h2> {sportswears.name}</h2>
                <div className="pc-meta">
                  <h5>{sportswears.price_vnd}</h5>
                  <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                </div>
                <p>{sportswears.description}</p>
                {/* <ul className="tags">
                                    <li><span>Category :</span> Men’s Wear</li>
                                    <li><span>Tags :</span> man, shirt, dotted, elegant, cool</li>
                                </ul> */}

                <div className="row mb-4">
                  <div className="col-md-4 col-6">
                    <label className="mb-2">Size</label>
                    <select
                      onChange={handleSizeChange}
                      className="form-select "
                      style={{ height: "35px" }}
                      required
                    >
                      <option value="">Chọn Size</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>
                </div>
                <div className="product-quantity">
                  <div className="pro-qty">
                    <button
                      className="btn btn-white  px-3"
                      onClick={decreaseQuantity}
                      disabled={quantity === 1}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <input min="1" value={quantity} />
                    <button
                      className="btn btn-white px-3"
                      onClick={increaseQuantity}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
                <a className="primary-btn pc-btn" onClick={handleAddToCart}>
                  Thêm vào giỏ hàng
                </a>

                {/* <ul className="p-info">
                                    <li>Product Information</li>
                                    <li>Reviews</li>
                                    <li>Product Care</li>
                                </ul> */}
              </div>
            </div>
            <div className="container mt-5">
              {/* Hiển thị sản phẩm liên quan */}
              {renderRelatedProducts()}
            </div>
            <div className="container mt-5">
              <div className="row  d-flex justify-content-center">
                <div className="col-md-12">
                  <div className="headings d-flex justify-content-between align-items-center mb-3">
                    <h5>Bình luận ({userReviewResponseList.length})</h5>

                    <div className="buttons">
                      <span className="badge bg-white d-flex flex-row align-items-center">
                        {/* <span className="text-primary">Bình luận</span> */}
                        {/* <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked />

                                                </div> */}
                      </span>
                    </div>
                  </div>
                  {userReviewResponseList.map((item, index) => (
                    <div>
                      <div className="card p-3 mt-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="user d-flex flex-row align-items-center">
                            <img
                              src={item.main_image}
                              style={{ width: "50px", height: "50px" }}
                              className="user-img rounded-circle mr-2"
                            />
                            <span>
                              <small className="font-weight-bold text-primary">
                                {item.userName}
                              </small>{" "}
                              <small className="font-weight-bold">
                                {item.comment}{" "}
                              </small>
                            </span>
                          </div>

                          <small>
                            {item.time > 0
                              ? item.time + " ngày trước"
                              : "gần đây"}
                          </small>
                        </div>

                        <div className="action d-flex justify-content-between mt-2 align-items-center">
                          <div className="reply px-4"></div>

                          <div className="icons align-items-center">
                            {[...Array(item.rate)].map((_, index) => (
                              <i
                                key={index}
                                className="fa fa-star text-warning"
                              ></i>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* them mt-2 */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModuleShowSportswearDetail;
