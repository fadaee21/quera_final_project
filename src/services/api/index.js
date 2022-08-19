import Axios from "axios";

export const createUserAPI = ({ email, password }) =>
  Axios.post("http://127.0.0.1:8000/users", {
    email,
    password,
  });

export const loginUserAPI = () => Axios.get("http://127.0.0.1:8000/users");

export const getAllProductsAPI = () =>
  Axios.get("http://localhost:8000/products");

export const getOneProductsAPI = (id) =>
  Axios.get(`http://localhost:8000/products/${id}`);

export const postOneProductsAPI = (data) =>
  Axios.post("http://localhost:8000/products", data);

export const removeProductAPI = (productId) =>
  Axios.delete(`http://localhost:8000/products/${productId}`);

export const editProductAPI = (productId, data) =>
  Axios.put(`http://localhost:8000/products/${productId}`, data);

export const getChart = () =>
  Axios.get("https://dummy.restapiexample.com/api/v1/employees");
