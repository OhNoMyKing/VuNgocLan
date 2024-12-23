import axios from "axios";

class CartService {
  static BASE_URL = "http://localhost:8080";
  static async getCart(token, noPage) {
    try {
      const response = await axios.get(
        `${CartService.BASE_URL}/api/customer/cart?noPage=${noPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  // Phương thức gọi API thanh toán
  static async initiatePayment(token, amount, bankCode) {
    try {
      const response = await axios.get(
        `${CartService.BASE_URL}/hello/vnpay?amount=${amount}&bankCode=${bankCode}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Giả sử response chứa dữ liệu kết quả thanh toán
    } catch (err) {
      throw err;
    }
  }
  static async getCheckout(token, noPage) {
    try {
      const response = await axios.get(
        `${CartService.BASE_URL}/api/customer/checkout?noPage=${noPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  static async clearCart(token) {
    try {
      const response = await axios.get(
        `${CartService.BASE_URL}/api/customer/clear-cart`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  static async deleteOrderItemByID(token, id) {
    try {
      const response = await axios.get(
        `${CartService.BASE_URL}/api/customer/delete-cart-item/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  static async increaseQuantity(token, id) {
    try {
      const response = await axios.get(
        `${CartService.BASE_URL}/api/customer/increase-quantity/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  static async decreaseQuantity(token, id) {
    try {
      const response = await axios.get(
        `${CartService.BASE_URL}/api/customer/decrease-quantity/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async createOrders(token, orders) {
    try {
      const response = await axios.post(
        `${CartService.BASE_URL}/api/customer/create-orders`,
        orders,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}
export default CartService;
