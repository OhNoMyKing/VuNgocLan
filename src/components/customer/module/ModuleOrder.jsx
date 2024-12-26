import { useContext, useEffect, useState } from "react";
import { PaginationContext } from "../../../context/PaginationContext";
import OrderService from "../../service/OrderService";
import ModuleUserReview from "./ModuleUserReview";
import Pagination from "../../common/Pagination";

function ModuleOrder() {
  const { noPage, setNoPage, totalPage, setTotalPage } =
    useContext(PaginationContext);
  const [orderResponse, setOrderResponse] = useState([]);

  const [status, setStatus] = useState(1);

  const statusOne = () => {
    setNoPage(1);
    setStatus(1); // Navigate to the details page
  };
  const statusTwo = () => {
    setNoPage(1);
    setStatus(2); // Navigate to the details page
  };
  useEffect(() => {
    fetchSportswear();
  }, [noPage, totalPage, status]);
  const fetchSportswear = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await OrderService.getAllOrderForCustomerByStatus(
        token,
        status,
        noPage
      );
      // setOrderResponse(response)
      // console.log(response)
      setTotalPage(response.totalPage);
      if (totalPage > 0) {
        setNoPage(response.currentPage);
        setOrderResponse(response);
      }
    } catch (error) {
      console.log("Error fetching users:");
    }
  };
  return (
    <div classNameName="" style={{ marginTop: "20px" }}>
      <div className="container">
        <article
          className="card"
          style={{ boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.15)" }}
        >
          <header className="card-header">
            {" "}
            <button className="btn">Đơn hàng</button> /{" "}
            <button
              className={`btn ${status === 1 ? "text-danger" : ""}`}
              onClick={statusOne}
            >
              Đang chờ xử lý
            </button>{" "}
            /{" "}
            <button
              className={`btn ${status === 2 ? "text-danger" : ""}`}
              onClick={statusTwo}
            >
              Hoàn thành
            </button>
          </header>
          <div className="card-body">
            {orderResponse.ordersResponseList &&
              orderResponse.ordersResponseList.map((item, index) => (
                <div
                  className="card"
                  style={{ boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.15)" }}
                >
                  <h6 className="m-2">Order ID: {item.id}</h6>

                  <article className="">
                    <div className="card-body row">
                      <div className="col-10">
                        {" "}
                        <strong>Ngày tạo:</strong> <br />
                        {item.createDate}{" "}
                      </div>
                      {/* <div className="col"> <strong>Shipping BY:</strong> <br /> BLUEDART, | <i className="fa fa-phone"></i> +1598675986 </div>
                                        <div className="col"> <strong>Status:</strong> <br /> Picked by the courier </div>
                                        <div className="col"> <strong>Tracking #:</strong> <br /> BD045903594059 </div> */}
                      <div className="col-2">
                        {item.status == 4 && <ModuleUserReview order={item} />}
                        {item.status == 5 && (
                          <div className="btn btn-secondary mt-4 text-white">
                            <strong></strong> Đã đánh giá{" "}
                            <i class="fa-solid fa-check"></i>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                  <div className="track">
                    <div className={`step ${item.status >= 1 ? "active" : ""}`}>
                      {" "}
                      <span className="icon">
                        {" "}
                        <i className="fa fa-check"></i>{" "}
                      </span>{" "}
                      <span className="text">Đã tiếp nhận</span>{" "}
                    </div>
                    <div className={`step ${item.status >= 2 ? "active" : ""}`}>
                      {" "}
                      <span className="icon">
                        {" "}
                        <i className="fa fa-user"></i>{" "}
                      </span>{" "}
                      <span className="text"> Đã đóng gói</span>{" "}
                    </div>
                    <div className={`step ${item.status >= 3 ? "active" : ""}`}>
                      {" "}
                      <span className="icon">
                        {" "}
                        <i className="fa fa-truck"></i>{" "}
                      </span>{" "}
                      <span className="text"> Đang giao </span>{" "}
                    </div>
                    <div className={`step ${item.status >= 4 ? "active" : ""}`}>
                      {" "}
                      <span className="icon">
                        {" "}
                        <i className="fa fa-box"></i>{" "}
                      </span>{" "}
                      <span className="text">Đã giao</span>{" "}
                    </div>
                  </div>

                  <ul className="row">
                    {item.orderItemResponseList &&
                      item.orderItemResponseList.map((item1, index) => (
                        <li className="col-md-4">
                          <figure className="itemside mb-3">
                            <div className="aside">
                              <img src={item1.image} className="img-sm m-2 " />
                            </div>
                            <figcaption className="info align-self-center">
                              <p className="title">
                                {item1.sportswear_name}{" "}
                                <strong className="text-danger">
                                  x{item1.quantity_ordered}
                                </strong>
                                <br /> Size: {item1.size}
                              </p>{" "}
                              <span className="text-muted">
                                {item1.totalAmount}{" "}
                              </span>
                            </figcaption>
                          </figure>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}

            {totalPage > 1 && (
              <div>
                <Pagination />{" "}
                <a href="/home" className="btn btn-success" data-abc="true">
                  {" "}
                  <i className="fa fa-chevron-left"></i> Tiếp tục mua hàng
                </a>
              </div>
            )}
            {totalPage === 0 && (
              <div>
                <div className="container-fluid  mt-100">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card">
                        <div className="card-body cart">
                          <div className="col-sm-12 empty-cart-cls text-center">
                            <img
                              src="https://cdn3.iconfinder.com/data/icons/e-commerce-website-1/64/Out-of-stock-512.png"
                              width="130"
                              height="130"
                              className="img-fluid mb-4 mr-3"
                            />
                            <h3>
                              <strong>Bạn chưa có đơn hàng nào</strong>
                            </h3>
                            <h4>Thêm vài cái áo đi</h4>
                            <a
                              href="/home"
                              className="btn btn-primary cart-btn-transform m-3"
                              data-abc="true"
                            >
                              Tiếp tục mua sắm
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
export default ModuleOrder;
