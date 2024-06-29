import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  

  // 사용자 정보를 가져오는 함수
export const fetchEditUser = async (userId) => {
  try {
      const response = await axios.get(`${BASE_URL}/users/${userId}`);
      return response.data;
  } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
  }
};

// 사용자 정보를 수정하는 함수
export const updateUser = async (userId, user) => {
  try {
      await axios.put(`${BASE_URL}/users/${userId}`, user);
  } catch (error) {
      throw new Error('Error updating user: ' + error.message);
  }
};