import React, { useState } from 'react'
import { parseJwt } from '../../utils/jwt'



const AddOrganization = () => {
  
  const [form, setForm] = useState({
    orgName: '',
    orgAddress: '',
    contactEmail: '',
    activityType: '',     
    adminName: '',
    adminEmail: '',  
    adminPhone: '',
    adminProfile: '',
    orgProfile: '',
  })

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm({ ...form, [name]: files[0] });
  };
  


 
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('systemAdminToken');
      const decoded = parseJwt(token);
  
      const formData = new FormData();
      formData.append('systemAdminId', decoded.id);
      formData.append('orgName', form.orgName);
      formData.append('orgAddress', form.orgAddress);
      formData.append('orgEmail', form.contactEmail);
      formData.append('activityType', form.activityType);
      formData.append('adminUsername', form.adminName);
      formData.append('adminEmail', form.adminEmail);
      formData.append('adminPhone', form.adminPhone);
  
      if (form.adminProfile instanceof File) {
        formData.append('adminProfile', form.adminProfile);
      }
  
      if (form.orgProfile instanceof File) {
        formData.append('orgProfile', form.orgProfile);
      }
  
      const response = await fetch('http://localhost:5050/api/auth/create-organization-with-admin', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        alert(data.message || 'Үүсгэхэд алдаа гарлаа');
        return;
      }
  
      alert('Байгууллага амжилттай нэмэгдлээ!');
      setForm({
        orgName: '',
        orgAddress: '',
        contactEmail: '',
        activityType: '',
        adminName: '',
        adminEmail: '',
        adminPhone: '',
        adminProfile: '',
        orgProfile: '',
      });
    } catch (error) {
      console.error('Серверийн алдаа:', error);
      alert('Сервертэй холбогдож чадсангүй');
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow border border-blue-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Organizations</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Organization Info */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Organization Information</h3>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="orgName"
              value={form.orgName}
              onChange={handleChange}
              placeholder="Name"
              className="border p-2 rounded-md"
              required
            />
            <input
              type="text"
              name="orgAddress"
              value={form.orgAddress}
              onChange={handleChange}
              placeholder="Organization address"
              className="border p-2 rounded-md"
              required
            />
            <input
              type="email"
              name="contactEmail"
              value={form.contactEmail}
              onChange={handleChange}
              placeholder="Contact email"
              className="border p-2 rounded-md"
              required
            />
            <input
              type="text"
              name="activityType"
              value={form.activityType}
              onChange={handleChange}
              placeholder="Үйл ажиллагааны төрөл"
              className="border p-2 rounded-md"
              required
            />
            <input
  type="file"
  name="orgProfile"
  onChange={handleFileChange}
  className="border p-2 rounded-md"
  accept="image/*"
/>
            
          </div>
        </div>

        {/* Organization Admin */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Organization Admin</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="adminName"
              value={form.adminName}
              onChange={handleChange}
              placeholder="Name"
              className="border p-2 rounded-md"
              required
            />
            <input
              type="email"
              name="adminEmail"
              value={form.adminEmail}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 rounded-md"
              required
            />
            <input
              type="text"
              name="adminPhone"
              value={form.adminPhone}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-2 rounded-md"
              required
            />
             <input
  type="file"
  name="adminProfile"
  onChange={handleFileChange}
  className="border p-2 rounded-md"
  accept="image/*"
/>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-[#23476A] text-white rounded-md hover:bg-[#223a5c] transition"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default AddOrganization
