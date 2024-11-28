import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartModal from "../model/cart-model"; // Import modal giỏ hàng
import "../chatbot/chatbot.css"; // Import CSS riêng của Chatbot

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [cartData, setCartData] = useState(null); // Dữ liệu giỏ hàng
  const [showCartModal, setShowCartModal] = useState(false); // Điều khiển modal giỏ hàng
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId").toString();

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");

      try {
        const response = await fetch(
          "http://172.24.136.124:5005/webhooks/rest/webhook",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: input,
              metadata: { userId },
            }),
          }
        );

        const data = await response.json();

        data.forEach((item) => {
          if (item.text) {
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: item.text, sender: "bot" },
            ]);
          } else if (item.image) {
            setMessages((prevMessages) => [
              ...prevMessages,
              { imageUrl: item.image, sender: "bot" },
            ]);
          } else if (item.custom && item.custom.productId) {
            // Xử lý tin nhắn dạng custom với productId
            setMessages((prevMessages) => [
              ...prevMessages,
              { productId: item.custom.productId, sender: "bot" },
            ]);
          } else if (item.custom && item.custom.cartData) {
            // Nếu nhận được dữ liệu giỏ hàng
            setCartData(item.custom.cartData); // Lưu dữ liệu giỏ hàng
            setShowCartModal(true); // Hiển thị modal giỏ hàng
          }
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false); // Đóng modal giỏ hàng
  };

  const handleProductDetail = (productId) => {
    navigate(`/home/detail/${productId}`);
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle-button" onClick={toggleChatbot}>
        💬
      </button>
      {isOpen && (
        <div className="chatbot">
          <div className="chatbot-header">Chatbot</div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${
                  msg.sender === "user" ? "user" : "bot"
                }`}
              >
                {msg.text && <p>{msg.text}</p>}
                {msg.imageUrl && (
                  <img
                    src={msg.imageUrl}
                    alt="Product"
                    style={{ width: "100px", margin: "10px 0" }}
                  />
                )}
                {msg.productId && (
                  <button
                    className="detail-button"
                    onClick={() => handleProductDetail(msg.productId)}
                  >
                    Xem chi tiết
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="chatbot-input-container">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
      {/* Hiển thị modal giỏ hàng */}
      {showCartModal && (
        <CartModal cartData={cartData} onClose={handleCloseCartModal} />
      )}
    </div>
  );
}

export default Chatbot;
