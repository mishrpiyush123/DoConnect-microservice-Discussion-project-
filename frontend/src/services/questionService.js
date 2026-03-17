import axios from "axios";

const BASE_URL = "http://localhost:8083/questions";

export const createQuestion = async (data) => {
  return (await axios.post(BASE_URL, data)).data;
};

export const getAllQuestions = async () => {
  return (await axios.get(BASE_URL)).data;
};