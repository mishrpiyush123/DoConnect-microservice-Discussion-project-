import axios from "axios";

const AUTH_BASE_URL = "http://localhost:8081/auth";

export const loginUser = async (data) => {
  const res = await axios.post(${AUTH_BASE_URL}/login, data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post(${AUTH_BASE_URL}/register, data);
  return res.data;
};