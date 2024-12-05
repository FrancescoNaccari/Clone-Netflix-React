import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = process.env.REACT_APP_API_BACK;

class AuthService {
  static async register(data) {
    return axios.post(`${API_BASE_URL}auth/register`, data).catch(this.handleError);
  }

  static async login(credentials) {
    try {
      const response = await axios.post(`${API_BASE_URL}auth/login`, credentials);
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      this.setLogoutTimer(user.accessToken);
      return user;
    } catch (error) {
      return this.handleError(error);
    }
  }

  static async loginWithGoogle(token) {
    try {
      const response = await axios.post(`${API_BASE_URL}auth/login/oauth2/code/google`, { token });
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      this.setLogoutTimer(user.accessToken);
      return user;
    } catch (error) {
      return this.handleError(error);
    }
  }

  static logout() {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  static setLogoutTimer(token) {
    const expirationDate = jwtDecode(token).exp * 1000;
    const timeLeft = expirationDate - Date.now();
    setTimeout(() => this.logout(), timeLeft);
  }

  static getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  static handleError(error) {
    console.error('API Error:', error.response?.data || error.message);
    throw new Error('Errore durante la comunicazione con il server.');
  }
}

export default AuthService;
