import axios from "axios";


class OrderService {
    static BASE_URL = "http://localhost:8080"
    static async getAllOrderForCustomerByStatus(token, status, noPage) {
        try {
            const response = await axios.post(`${OrderService.BASE_URL}/api/customer/orders`, { status, noPage }, {
                headers: { Authorization: `Bearer ${token}` },
                'Content-Type': 'application/json'
            })
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getAllOrderForAdminByStatus(token, status, noPage) {
        try {
            const response = await axios.post(`${OrderService.BASE_URL}/api/admin/orders`, { status, noPage }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async setOrderStatus(token, status, noPage) {
        try {
            const response = await axios.post(`${OrderService.BASE_URL}/api/admin/change-status-orders`, { status, noPage }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async userReview(token, order) {
        try {
            const response = await axios.post(`${OrderService.BASE_URL}/api/customer/feedback`, order, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            return response.data;
        } catch (err) {
            throw err;
        }
    }




}
export default OrderService;