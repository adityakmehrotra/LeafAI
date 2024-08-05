import axios from 'axios';

const api = 'https://leafai-api.adityakmehrotra.com';

export const uploadImage = async (formData, username = 'UNDEFINED') => {
  try {
    formData.append('username', username);

    const response = await axios.post(`${api}/upload_image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.status === 429) {
      alert("You have exceeded the rate limit. Please wait a while before trying again.");
      return;
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert("Bad request. Please check the file and try again.");
    } else {
      alert('Failed to process the request: ' + error.message);
    }
    throw error;
  }
};

export const getUserUploads = async (username) => {
  try {
    const response = await axios.get(`${api}/get_user_uploads`, {
      params: { username }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserImage = async (username, filePath) => {
  try {
    const response = await axios.delete(`${api}/delete_image`, {
      data: { username, file_path: filePath }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
