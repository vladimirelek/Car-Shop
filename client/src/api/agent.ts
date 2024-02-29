import axios, { AxiosError, AxiosResponse } from "axios";
import store from "../redux/store";
import { toast } from "react-toastify";
import { PaginatedResponse } from "../models/pagination";

axios.defaults.baseURL = "http://localhost:5030/api/";
const responseBody = (response: AxiosResponse) => response.data;
axios.interceptors.request.use(
  (config) => {
    const myToken = store.getState().auth.user?.token;
    config.headers.Authorization = `Bearer ${myToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    const pagination = response.headers["pagination"];
    console.log(response);
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
      console.log(response);

      return response;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 403:
        toast.error("You are not allowed to do that!");
        break;
      // case 500:
      //   toast.error("Server error");
      //   break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);
const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};
const Auth = {
  login: (values: any) => requests.post("Auth/login", values),
  register: (values: any) => requests.post("Auth/register", values),
  currentUser: () => requests.get("Auth/currentUser"),
  getUserById: (id: number) => requests.get(`Auth/${id}`),
  addMessageToUser: (values: any) =>
    requests.post("Auth/addMessageToInbox", values),
  getAllMessages: (userId: number) =>
    requests.get(`Auth/getAllMessages/${userId}`),
  deleteMessage: (userId: number, messageId: number) =>
    requests.delete(`Auth/deleteMessage/${userId}/${messageId}`),
};
const Cars = {
  getFeaturedCars: () => requests.get("Cars/getFeaturedCars"),
  getAllCars: (params: URLSearchParams) =>
    requests.get("Cars/getAllCars", params),
  getCarById: (id: number) => requests.get(`Cars/${id}`),
  addComment: (values: any) => requests.put("Cars/addComment", values),
  deleteComment: (carId: number, commentId: number) =>
    requests.delete(`Cars/${carId}/${commentId}`),
  getImage: (imageName: string) => requests.get(`Cars/getImage/${imageName}`),
  addNewCar: (values: any) => requests.post("Cars/addNewCar", values),
  deleteCar: (carId: number) => requests.delete(`Cars/${carId}`),
  addFeaturedCar: (values: any) => requests.put("Cars/FeaturedCar", values),
};
const agent = {
  Auth,
  Cars,
};
export default agent;
