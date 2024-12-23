import { useContext, useEffect, useState } from "react";
import { PaginationContext } from "../../../context/PaginationContext";
import OrderService from "../../service/OrderService";
import Pagination from "../../common/Pagination";

function ModuleOrderAdmin() {
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
  const statusThree = () => {
    setNoPage(1);
    setStatus(3); // Navigate to the details page
  };
  const statusFour = () => {
    setNoPage(1);
    setStatus(4); // Navigate to the details page
  };
  useEffect(() => {
    fetchSportswear();
  }, [noPage, totalPage, status]);
  const fetchSportswear = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await OrderService.getAllOrderForAdminByStatus(
        token,
        status,
        noPage
      );
      setTotalPage(response.totalPage);
      if (totalPage > 0) {
        setNoPage(response.currentPage);
        setOrderResponse(response);
      }
      // setOrderResponse(response)

      console.log(response);
    } catch (error) {
      console.log("Error fetching users:");
    }
  };
  const setStatusOrderOneByIndex = async (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage

        const response = await OrderService.setOrderStatus(
          token,
          1,
          orderResponse.ordersResponseList[index].id
        );
        console.log(response);
        const updatedOrders = [...orderResponse.ordersResponseList];
        updatedOrders[index].status = 1;
        setOrderResponse({
          ...orderResponse,
          ordersResponseList: updatedOrders,
        });
      } catch (error) {
        console.log("error");
      }
    }
    // Update the cart in the backend
    // ...
  };
  const setStatusOrderTwoByIndex = async (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage

        const response = await OrderService.setOrderStatus(
          token,
          2,
          orderResponse.ordersResponseList[index].id
        );
        console.log(response);
        const updatedOrders = [...orderResponse.ordersResponseList];
        updatedOrders[index].status = 2;
        setOrderResponse({
          ...orderResponse,
          ordersResponseList: updatedOrders,
        });
      } catch (error) {
        console.log("error");
      }
    }
    // Update the cart in the backend
    // ...
  };
  const setStatusOrderThreeByIndex = async (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage

        const response = await OrderService.setOrderStatus(
          token,
          3,
          orderResponse.ordersResponseList[index].id
        );
        console.log(response);
        const updatedOrders = [...orderResponse.ordersResponseList];
        updatedOrders[index].status = 3;
        setOrderResponse({
          ...orderResponse,
          ordersResponseList: updatedOrders,
        });
      } catch (error) {
        console.log("error");
      }
    }
    // Update the cart in the backend
    // ...
  };
  const setStatusOrderFourByIndex = async (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage

        const response = await OrderService.setOrderStatus(
          token,
          4,
          orderResponse.ordersResponseList[index].id
        );
        console.log(response);
        const updatedOrders = [...orderResponse.ordersResponseList];
        updatedOrders[index].status = 4;
        setOrderResponse({
          ...orderResponse,
          ordersResponseList: updatedOrders,
        });
      } catch (error) {
        console.log("error");
      }
    }
    // Update the cart in the backend
    // ...
  };

  return (
    <div classNameName="" style={{ marginTop: "20px" }}>
      <div className="container">
        <article className="card">
          <header className="card-header">
            {" "}
            <button className={`btn ${status === 0 ? "text-danger" : ""}`}>
              Quản lý đơn hàng
            </button>{" "}
            /{" "}
            <button
              className={`btn ${status === 1 ? "text-danger" : ""}`}
              onClick={statusOne}
            >
              Đã tiếp nhận
            </button>{" "}
            /{" "}
            <button
              className={`btn ${status === 2 ? "text-danger" : ""}`}
              onClick={statusTwo}
            >
              Đã đóng gói
            </button>{" "}
            /{" "}
            <button
              className={`btn ${status === 3 ? "text-danger" : ""}`}
              onClick={statusThree}
            >
              Đang giao
            </button>{" "}
            /{" "}
            <button
              className={`btn ${status === 4 ? "text-danger" : ""}`}
              onClick={statusFour}
            >
              Đã giao
            </button>{" "}
          </header>
          <div className="card-body">
            {orderResponse.ordersResponseList &&
              orderResponse.ordersResponseList.map((item, index) => (
                <div className="">
                  <h6>Order ID: {item.id}</h6>
                  <article className="card">
                    <div className="card-body row">
                      <div className="col">
                        {" "}
                        <strong>Thời gian tạo:</strong> <br />
                        {item.createDate}{" "}
                      </div>
                      {/* <div className="col"> <strong>Địa chị nhận:</strong> <br />  {item.shippingAddress} </div> */}
                      <div className="col">
                        {" "}
                        <strong>Người nhận:</strong> <br /> {item.receiver}, |{" "}
                        <i className="fa fa-phone"></i>
                        {item.phone}{" "}
                      </div>
                      <div className="col">
                        {" "}
                        <strong>Shipment:</strong> <br />{" "}
                        {item.shippingResponse.shippingMethod} ($
                        {item.shippingResponse.shippingFee}){" "}
                      </div>
                      <div className="col">
                        {" "}
                        <strong>Tổng giá trị sản phẩm:</strong> <br /> $
                        {item.totalOrder}{" "}
                      </div>
                      <div className="col">
                        {" "}
                        <strong>Giá trị đơn hàng:</strong> <br /> $
                        {item.totalOrder + item.shippingResponse.shippingFee}{" "}
                      </div>
                    </div>
                  </article>
                  <div className="track">
                    <div
                      className={`step ${item.status >= 1 ? "active" : ""}`}
                      onClick={() => setStatusOrderOneByIndex(index)}
                    >
                      {" "}
                      <span className="icon">
                        {" "}
                        <i className="fa fa-check"></i>{" "}
                      </span>{" "}
                      <span className="text">Đã tiếp nhận</span>{" "}
                    </div>
                    <div
                      className={`step ${item.status >= 2 ? "active" : ""}`}
                      onClick={() => setStatusOrderTwoByIndex(index)}
                    >
                      {" "}
                      <span className="icon">
                        {" "}
                        <i className="fa fa-user"></i>{" "}
                      </span>{" "}
                      <span className="text"> Đã đóng gói</span>{" "}
                    </div>
                    <div
                      className={`step ${item.status >= 3 ? "active" : ""}`}
                      onClick={() => setStatusOrderThreeByIndex(index)}
                    >
                      {" "}
                      <span className="icon">
                        {" "}
                        <i className="fa fa-truck"></i>{" "}
                      </span>{" "}
                      <span className="text"> Đang giao </span>{" "}
                    </div>
                    <div
                      className={`step ${item.status >= 4 ? "active" : ""}`}
                      onClick={() => setStatusOrderFourByIndex(index)}
                    >
                      {" "}
                      <span className="icon">
                        {" "}
                        <i className="fa fa-box"></i>{" "}
                      </span>{" "}
                      <span className="text">Đã giao</span>{" "}
                    </div>
                  </div>
                  <hr />
                  <ul className="row">
                    {item.orderItemResponseList &&
                      item.orderItemResponseList.map((item1, index) => (
                        <li className="col-md-4">
                          <figure className="itemside mb-3">
                            <div className="aside">
                              <img
                                src={item1.image}
                                className="img-sm border"
                              />
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
                  <hr />
                </div>
              ))}
            {totalPage > 1 && <Pagination />}
            {/* <a href="#" className="btn btn-warning" data-abc="true"> <i className="fa fa-chevron-left"></i> Back to orders</a> */}
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
                            {/* <h4>Thêm vài cái áo đi</h4>
                                                    <a href="/home" className="btn btn-primary cart-btn-transform m-3" data-abc="true">Tiếp tục mua sắm</a> */}
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
export default ModuleOrderAdmin;
