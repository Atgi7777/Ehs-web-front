// services/adminService.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5050/api',
});




// Байгууллагын админуудыг авах (энэ хэвээр байж болно, system-admin-ийн route юм)
export const fetchOrganizationAdmins = (orgId, token) =>
  API.get(`/orgadmin/organization/${orgId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ✅ Админ мэдээлэл авах
export const fetchAdminById = (adminId, token) =>
  API.get(`/orgadmin/organization-admin/${adminId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ✅ Админ засах
export const updateAdmin = (adminId, data, token) =>
  API.put(`/orgadmin/organization-admin/${adminId}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

// ✅ Админ нэмэх
export const createAdmin = (orgId, data, token) =>
  API.post(`/auth/add-admin-to-organization/${orgId}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

// ✅ Админ устгах
export const deleteAdmin = (adminId, token) =>
  API.delete(`/orgadmin/organization-admin/${adminId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
