import axios from "axios";

const QUESTION_API = "http://localhost:8083/questions";

export const getAnswersByQuestionId = async (questionId) => {
  try {
    const response = await axios.get(`${QUESTION_API}/${questionId}/answers`);
    return response.data;
  } catch {
    return [];
  }
};

export const createAnswer = async (questionId, answerData) => {
  const response = await axios.post(`${QUESTION_API}/${questionId}/answers`, answerData);
  return response.data;
};