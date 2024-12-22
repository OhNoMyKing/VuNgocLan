// import React, { useContext } from 'react';
// import { CartContext } from '../../../context/CartProvider';

import { useContext, useEffect, useState } from "react";
import CartService from "../../service/CartService";
import { PaginationContext } from "../../../context/PaginationContext";
import Pagination from "../../common/Pagination";
import { Link, useNavigate } from "react-router-dom";

function ModuleCart() {
  const { noPage, setNoPage, totalPage, setTotalPage } =
    useContext(PaginationContext);
  const navigate = useNavigate();
  const [cartResponse, setCartResponse] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSportswear();
  }, [noPage]);

  const fetchSportswear = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await CartService.getCart(token, noPage);
      setCartResponse(data);
      setTotalPage(data.totalPage);
      setNoPage(data.currentPage);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const clearCart = async () => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?"
      )
    ) {
      try {
        const token = localStorage.getItem("token");
        const response = await CartService.clearCart(token);
        if (response.message === "oke") {
          alert("Giỏ hàng đã được làm trống.");
          fetchSportswear();
        }
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    }
  };

  const deleteByID = async (index) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await CartService.deleteOrderItemByID(
          token,
          cartResponse.cartItemResponseList[index].id
        );
        if (response.message === "oke") {
          alert("Sản phẩm đã được xóa.");
          fetchSportswear();
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const increaseQuantity = async (index) => {
    try {
      const token = localStorage.getItem("token");
      await CartService.increaseQuantity(
        token,
        cartResponse.cartItemResponseList[index].id
      );
      fetchSportswear();
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const decreaseQuantity = async (index) => {
    try {
      const token = localStorage.getItem("token");
      await CartService.decreaseQuantity(
        token,
        cartResponse.cartItemResponseList[index].id
      );
      fetchSportswear();
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const applyCoupon = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await CartService.applyCoupon(token, couponCode);
      if (response.cartItemResponseList) {
        setCartResponse(response);
        setError("");
      } else {
        setError("Mã giảm giá không hợp lệ hoặc đã hết hạn.");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      setError("Có lỗi xảy ra khi áp dụng mã giảm giá.");
    }
  };

  const totalDiscount = cartResponse.cartItemResponseList?.reduce(
    (acc, item) => acc + (item.discountAmount || 0),
    0
  );

  return (
    <div style={{ marginTop: "30px" }}>
      {totalPage > 0 ? (
        <div className="cart-page">
          <div className="container">
            <div className="cart-table">
              <table>
                <thead>
                  <tr>
                    <th className="product-h">Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Giảm giá</th>
                    <th>Tổng tiền</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartResponse.cartItemResponseList?.map((item, index) => (
                    <tr key={index}>
                      <td className="product-col">
                        <img src={item.image} alt="" />
                        <div className="p-title">
                          <h5>{item.sportswear_name}</h5>
                        </div>
                      </td>
                      <td className="price-col">
                        {formatter.format(item.price)}
                      </td>
                      <td className="quantity-col">
                        <div className="pro-qty">
                          <button
                            className="btn btn-white px-3"
                            onClick={() => decreaseQuantity(index)}
                            disabled={item.quantity === 1}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <input type="text" value={item.quantity} readOnly />
                          <button
                            className="btn btn-white px-3"
                            onClick={() => increaseQuantity(index)}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td>{formatter.format(item.discountAmount || 0)}</td>
                      <td>
                        {formatter.format(
                          item.totalAmount - (item.discountAmount || 0)
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-white px-3"
                          onClick={() => deleteByID(index)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cart-summary">
              <p>Tổng giảm giá: {formatter.format(totalDiscount)}</p>
              <p>
                Tổng tiền sau giảm giá:{" "}
                {formatter.format(cartResponse.totalAmount - totalDiscount)}
              </p>
            </div>

            <div className="cart-btn">
              <div className="row">
                <div className="col-lg-6">
                  <div className="coupon-input">
                    <input
                      type="text"
                      placeholder="Nhập mã giảm giá"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button onClick={applyCoupon} className="site-btn">
                      Áp dụng
                    </button>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>
                <div className="col-lg-5 offset-lg-1 text-left text-lg-right">
                  <button className="site-btn clear-btn" onClick={clearCart}>
                    Xóa tất cả
                  </button>
                  <Link
                    to="/checkout"
                    className="site-btn update-btn btn-warning"
                  >
                    Tiến hành đặt hàng
                  </Link>
                </div>
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid mt-100">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body cart">
                  <div className="col-sm-12 empty-cart-cls text-center">
                    <img
                      src="https://i.imgur.com/dCdflKN.png"
                      width="130"
                      height="130"
                      className="img-fluid mb-4 mr-3"
                      alt="Empty Cart"
                    />
                    <h3>
                      <strong>Giỏ hàng của bạn đang rỗng</strong>
                    </h3>
                    <h4>Thêm vài sản phẩm để tiếp tục.</h4>
                    <Link
                      to="/home"
                      className="btn btn-primary cart-btn-transform m-3"
                    >
                      Tiếp tục mua sắm
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModuleCart;
