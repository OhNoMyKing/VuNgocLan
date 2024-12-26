import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import CartService from "../../service/CartService";

const WebSocketComponent = ({ onPaymentSuccess }) => {
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Connected to WebSocket");

        // Lắng nghe thông điệp từ server
        stompClient.subscribe("/vnp", async (message) => {
          const status = message.body;
          console.log(status);
          if (status === "success") {
            try {
              // Khi thanh toán thành công, gọi API để tạo đơn hàng
              const token = localStorage.getItem("token");
              const response = await CartService.createOrders(
                token,
                onPaymentSuccess
              );

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
  }, [onPaymentSuccess]);

  return null;
};

export default WebSocketComponent;
