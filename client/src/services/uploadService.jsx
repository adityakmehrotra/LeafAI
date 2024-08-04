import axios from 'axios';

const api = 'https://leafai-api.adityakmehrotra.com';

export const uploadImage = async (formData, username = 'UNDEFINED') => {
  try {
    // Append the username to the formData
    formData.append('username', username);

    const response = await axios.post(`${api}/upload_image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.status === 429) { // Check if the rate limit has been exceeded
      alert("You have exceeded the rate limit. Please wait a while before trying again.");
      return;
    }

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
