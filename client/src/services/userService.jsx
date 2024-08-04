import axios from 'axios';

const api = 'https://leafai-api.adityakmehrotra.com';

export const getUserInfo = async (username) => {
  const response = await axios.get(`${api}/get_user_info`, {
    params: { username }
  });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${api}/register`, userData);
  return response.data;
};
