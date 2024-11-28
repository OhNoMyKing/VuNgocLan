import React from "react";
import "./CartModal.css";

const CartModal = ({ cartData, onClose }) => {
  if (!cartData || !cartData.cartItemResponses) {
    return (
      <div className="chatbot-cart-modal-overlay">
        <div className="chatbot-cart-modal">
          <h2>Thông báo</h2>
          <p>Giỏ hàng trống hoặc bạn chưa đăng nhập.</p>
          <button onClick={onClose}>Đóng</button>
        </div>
      </div>
    );
  }

  const { cartItemResponses, totalAmount, totalQuantity, userName } = cartData;

  return (
    <div className="chatbot-cart-modal-overlay">
      <div className="chatbot-cart-modal">
        <h2>🛒 Giỏ hàng của {userName}</h2>
        <p>📦 Tổng sản phẩm: {totalQuantity}</p>
        <p>💰 Tổng giá trị: {totalAmount} VNĐ</p>
        <ul>
          {cartItemResponses.map((item) => (
            <li key={item.id}>
              <img
                src={item.image}
                alt={item.sportswear_name}
                style={{ width: "50px", marginRight: "10px" }}
              />
              {item.sportswear_name} - Size: {item.size} | Số lượng:{" "}
              {item.quantity} | Giá: {item.price} VNĐ
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default CartModal;
