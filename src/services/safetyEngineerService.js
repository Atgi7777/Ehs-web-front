// services/safetyEngineerService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5050/api/orgadmin';

export const getSafetyEngineerById = async (id) => {
  const token = localStorage.getItem('orgAdminToken');
  const res = await axios.get(`${API_BASE_URL}/engineer/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateSafetyEngineer = async (id, formData) => {
  const token = localStorage.getItem('orgAdminToken');

  const res = await axios.put(`${API_BASE_URL}/engineer/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};
