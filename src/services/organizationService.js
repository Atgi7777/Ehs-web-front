// services/organizationService.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5050/api',
});
 

// Байгууллагын мэдээлэл авах
export const fetchOrganizationById = (id, token) =>
  API.get(`/organizations/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// Байгууллагын мэдээлэл хадгалах
export const updateOrganization = (id, data, token) =>
  API.put(`/system-admin/organization/${id}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

// Зураг upload хийх
export const uploadOrganizationImage = async (formData, token) => {
  return await axios.post('http://localhost:5050/api/auth/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

