import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5050/api',
});

export const uploadImage = (formData, token) =>
  API.post('/system-admin/upload-image', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
