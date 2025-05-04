import axios from 'axios';
const API_BASE_URL = 'http://localhost:5050/api/orgadmin';

export const createEmployee = async (formData) => {
  const token = localStorage.getItem('orgAdminToken');

  const response = await fetch(`http://localhost:5050/api/users/register`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      
      // ⚠️ multipart/form-data үед Content-Type заавал бичих шаардлагагүй
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('❌ Бүртгэх үед алдаа:', errorData);
    throw errorData;
  }

  return await response.json();
};

export const getEmployeeById = async (id) => {
  const token = localStorage.getItem('orgAdminToken');
  const res = await axios.get(`${API_BASE_URL}/employee/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateEmployee = async (id, formData) => {
  const token = localStorage.getItem('orgAdminToken');
  const res = await axios.put(`${API_BASE_URL}/employee/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

