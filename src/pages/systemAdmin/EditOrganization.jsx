import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import OrganizationDetails from '../../components/systemAdmin/OrganizationDetails';
import OrganizationForm from '../../components/systemAdmin/OrganizationForm';
import AdminList from '../../components/systemAdmin/AdminList';

import {
  fetchOrganizationById,
  updateOrganization,
  uploadOrganizationImage,
} from '../../services/organizationService';

import {
  fetchOrganizationAdmins,
  deleteAdmin,
} from '../../services/adminService';

const EditOrganization = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [orgData, setOrgData] = useState({
    name: '',
    code: id,
    contactEmail: '',
    address: '',
    profileImage: '',
    phone: '',
    activity_type: '',
  });

  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('systemAdminToken');
        const [orgRes, adminRes] = await Promise.all([
          fetchOrganizationById(id, token),
          fetchOrganizationAdmins(id, token),
        ]);

        const org = orgRes.data;
        setOrgData({
          name: org.name,
          code: id,
          contactEmail: org.email,
          address: org.address,
          profileImage: org.profile || '',
          phone: org.phone || '',
          activity_type: org.activity_type || '',
        });

        setAdmins(adminRes.data);
      } catch (err) {
        console.error('Өгөгдөл ачааллах үед алдаа:', err);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrgData({ ...orgData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('profileImage', file);
    formData.append('oldImage', orgData.profileImage); 
  
    try {
      const token = localStorage.getItem('systemAdminToken');
      const res = await uploadOrganizationImage(formData, token);
  
      if (res.data.filename) {
        const imageUrl = res.data.filename;
  
        const updatedOrg = {
          ...orgData,
          profileImage: imageUrl,
        };
  
        setOrgData(updatedOrg);
  
        await updateOrganization(
          id,
          {
            name: updatedOrg.name,
            code: id,
            email: updatedOrg.contactEmail,
            address: updatedOrg.address,
            phone: updatedOrg.phone,
            activity_type: updatedOrg.activity_type,
            profile: updatedOrg.profileImage,
          },
          token
        );
      }
    } catch (err) {
      console.error('Зураг оруулах үед алдаа:', err);
    }
  };
  

  const handleDeleteAdmin = async (index) => {
    const token = localStorage.getItem('systemAdminToken');
    const adminId = admins[index].id;
    try {
      await deleteAdmin(adminId, token);
      setAdmins(admins.filter((_, i) => i !== index));
    } catch (err) {
      console.error('Админ устгах үед алдаа:', err);
    }
  };

  const handleSaveOrganization = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('systemAdminToken');

    try {
      await updateOrganization(
        id,
        {
          name: orgData.name,
          code: id,
          email: orgData.contactEmail,
          address: orgData.address,
          phone: orgData.phone,
          activity_type: orgData.activity_type,
          profile: orgData.profileImage,
        },
        token
      );
      alert('Амжилттай хадгаллаа');
    } catch (err) {
      console.error('Байгууллага хадгалах үед алдаа:', err);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
      <div>
        <OrganizationDetails orgData={orgData} onImageUpload={handleImageUpload} />
        <AdminList
          admins={admins}
          onDelete={handleDeleteAdmin}
        />
      </div>

      <OrganizationForm
  orgData={orgData}
  onChange={handleInputChange}
  onSubmit={handleSaveOrganization}
  onCancel={() => navigate(-1)}
  onImageChange={handleImageUpload} 
/>

     
    </div>
  );
};

export default EditOrganization;
