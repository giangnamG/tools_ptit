import axios from 'axios'
import config from './config'

const axiosClient = axios.create({
  baseURL: config.backend.baseUrl
})

axiosClient.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('access_token')
  request.headers.Authorization = `Bearer ${token}`
  return request
})

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    sessionStorage.removeItem('access_token');
    window.location.href = '/#login';
    return Promise.reject(error);
  }
)

export default axiosClient
