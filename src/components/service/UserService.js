import axios from "axios";

class UserService {
  static BASE_URL = "http://localhost:8080";
  static async login(username, password) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/api/auth/login`,
        { username, password }
      );

      return response.data;
    } catch (err) {
      throw err;
    }
  }
  static async getProflie(token) {
    try {
      const response = await axios.get(
        `${UserService.BASE_URL}/api/customer/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  static async changeProflie(token, userRequest) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/api/customer/change-profile`,
        userRequest,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  static async updateUser(token, userUpdate) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/api/admin/update-user`,
        userUpdate,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  static async register(email, username, password) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/api/auth/register`,
        { email, username, password }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
  }
  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }
  static isAdmin() {
    const roles = localStorage.getItem("roles"); // Assuming 'roles' is the key in localStorage
    if (roles) {
      const rolesArray = JSON.parse(roles); // Parse the stringified array from localStorage
      return rolesArray.includes("ROLE_ADMIN"); // Check if the array contains 'ADMIN'
    }
    return false;
  }

  static isUser() {
    const roles = localStorage.getItem("roles");
    if (roles) {
      const rolesArray = JSON.parse(roles); // Parse the stringified array from localStorage
      return rolesArray.includes("ROLE_CUSTOMER"); // Check if the array contains 'ADMIN'
    }
    return false;
  }

  static adminOnly() {
    return this.isAuthenticated() && this.isAdmin();
  }
  static async getAllUserForAdmin(token, key, noPage, categoryName) {
    try {
      const response = await axios.get(
        `${UserService.BASE_URL}/api/admin/get-all-user?key=${key}&&noPage=${noPage}&&categoryName=${categoryName}`,
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
export default UserService;
