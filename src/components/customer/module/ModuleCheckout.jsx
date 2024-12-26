import { useContext, useEffect, useState } from "react";
import CartService from "../../service/CartService";
import { PaginationContext } from "../../../context/PaginationContext";
import Pagination from "../../common/Pagination";
import { useNavigate } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

function ModuleCheckout() {
  const { noPage, setNoPage, totalPage, setTotalPage } =
    useContext(PaginationContext);
  const [checkoutResponse, setCheckoutResponse] = useState([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [payment, setPayment] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");
  const [shipment, setShipment] = useState("");
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [orders, setOrders] = useState({
    fullName: "",
    shipping_id: null,
    payment_id: null,
    address: "",
    phone: "",
    cartID: "",
  });

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const handlePaymentSuccess = (status) => {
    setPaymentSuccessful(status);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "shipping_id") {
      if (value !== "Choose Shipment") {
        const selectedShipping = checkoutResponse.shippingResponseList.find(
          (item) => item.id === parseInt(value)
        );
        setShippingFee(selectedShipping?.shippingFee || 0);
        setShipment(value);
      } else {
        setShippingFee(0);
      }
    }
    if (name === "payment_id") {
      if (value !== "Choose Payment") {
        setPayment(value);
      }
    }
    setOrders({ ...orders, [name]: value });
  };

  const applyCoupon = async () => {
    try {
      const token = localStorage.getItem("token");
      const totalAmount = checkoutResponse.totalAmount || 0;
      const response = await CartService.applyCoupon(
        token,
        couponCode,
        totalAmount
      );

      if (response.result) {
        const discountAmount = totalAmount - response.result;
        setCheckoutResponse({
          ...checkoutResponse,
          totalAmount: response.result,
          discountAmount: discountAmount,
        });
        setError("");
      } else {
        setError("Mã giảm giá không hợp lệ hoặc đã hết hạn.");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      setError("Có lỗi xảy ra khi áp dụng mã giảm giá.");
    }
  };

  const fetchSportswear = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await CartService.getCheckout(token, noPage);
      setNoPage(response.currentPage);
      setTotalPage(response.totalPage);
      setCheckoutResponse(response);
      setOrders({ ...orders, cartID: response.cartID });
    } catch (error) {
      console.error("Error fetching checkout details:", error);
    }
  };

  useEffect(() => {
    fetchSportswear();
  }, [noPage, totalPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (shipment === "") {
      alert("Bạn quên chưa chọn Shipment");
      return;
    }
    if (payment === "") {
      alert("Bạn quên chưa chọn Payment");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const totalAmount = checkoutResponse.totalAmount;
      const bankCode = payment;

      const vnPayResponse = await CartService.getVNPayPayment(token, {
        totalAmount,
        bankCode,
      });

      if (vnPayResponse.code === 200 && vnPayResponse.data.paymentUrl) {
        window.open(vnPayResponse.data.paymentUrl, "_blank");
        // Trigger WebSocket logic here
        handleWebSocketPaymentSuccess(orders);
      } else {
        alert("Không thể thực hiện thanh toán qua VNPay. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const handleWebSocketPaymentSuccess = async (onPaymentSuccess) => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Connected to WebSocket");

        // Lắng nghe thông điệp từ server
        stompClient.subscribe("/vnp", async (message) => {
          const status = message.body;
          console.log(`trang thai la: ${status}`);
          if (status === "success") {
            try {
              // Khi thanh toán thành công, gọi API để tạo đơn hàng
              const token = localStorage.getItem("token");
              const response = await CartService.createOrders(
                token,
                onPaymentSuccess
              );
              console.log(response);
              if (response.message === "oke") {
                window.confirm("Đặt hàng thành công!");
              } else {
                alert("Không thể thực hiện thao tác");
              }
            } catch (error) {
              console.error("Error creating order:", error);
            }
          } else if (status === "failed") {
            // Xử lý khi thanh toán thất bại
            alert("Thanh toán không thành công. Vui lòng thử lại.");
          }
        });
      },
      onStompError: (error) => {
        console.error("WebSocket error:", error);
      },
    });

    stompClient.activate();

    return () => stompClient.deactivate();
  };

  return (
    <div>
      <div style={{ marginTop: "30px" }}>
        <div className="cart-total-page spad">
          <div className="container">
            <h3>Thông tin của bạn</h3>
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Họ và tên</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Địa chỉ</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Shipment</label>
                    <select
                      className="form-select"
                      name="shipping_id"
                      onChange={handleChange}
                      required
                    >
                      <option>Choose Shipment</option>
                      {checkoutResponse.shippingResponseList?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.shippingMethod}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Payment</label>
                    <select
                      className="form-select"
                      name="payment_id"
                      onChange={handleChange}
                      required
                    >
                      <option>Choose Payment</option>
                      {checkoutResponse.paymentResponseList?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.paymentMethod}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="coupon-input">
                    <input
                      type="text"
                      placeholder="Nhập mã giảm giá"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="site-btn"
                    >
                      Áp dụng
                    </button>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="cart-detail">
                    <h6 className="fw-semibold mb-1 text-warning">
                      Thành tiền giỏ hàng
                    </h6>
                    <strong>
                      Tổng: {formatter.format(checkoutResponse.totalAmount)} (
                      {checkoutResponse.totalQuantity} vật phẩm)
                    </strong>
                    {checkoutResponse.cartItemResponseList?.map((item) => (
                      <div
                        className="card card-body"
                        key={item.id}
                        style={{ marginTop: "10px" }}
                      >
                        <div className="media align-items-center">
                          <img
                            src={item.image}
                            width="150"
                            height="150"
                            alt=""
                          />
                          <div className="media-body">
                            <h6>{item.sportswear_name}</h6>
                            <p>Size: {item.size}</p>
                            <p>Số lượng: {item.quantity}</p>
                            <h5 className="text-danger">
                              {formatter.format(item.price)} x {item.quantity}
                            </h5>
                          </div>
                        </div>
                      </div>
                    ))}

                    {checkoutResponse.discountAmount !== undefined && (
                      <div style={{ marginTop: "20px" }}>
                        <p className="text-success">
                          Giảm giá:{" "}
                          {formatter.format(checkoutResponse.discountAmount)}
                        </p>
                        <h5>
                          <strong>
                            Tổng sau giảm giá:{" "}
                            {formatter.format(checkoutResponse.totalAmount)}
                          </strong>
                        </h5>
                      </div>
                    )}

                    {totalPage > 1 && <Pagination />}
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Đặt hàng
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleCheckout;
