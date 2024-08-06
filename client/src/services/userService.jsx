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
      alert('Something went wrong. Try to Download an image and use that');
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

export const checkCredentials = async (username, password) => {
  try {
    const response = await axios.post(`${api}/check_login`, { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkUsername = async (username) => {
  try {
    const response = await axios.get(`${api}/check_username`, { params: { username } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (username) => {
  try {
    const response = await axios.delete(`${api}/delete_account`, { data: { username } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async (username) => {
  try {
    const response = await axios.get(`${api}/get_user_info`, { params: { username } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${api}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUploadedFile = async (filename, username) => {
    try {
      const response = await fetch("https://leafai-api.adityakmehrotra.com/delete_file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename, username }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete file");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  };
  