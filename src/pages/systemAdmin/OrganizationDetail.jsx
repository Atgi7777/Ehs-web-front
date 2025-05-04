import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const OrganizationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [org, setOrg] = useState(null);
  const [admin, setAdmin] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('systemAdminToken');
 
    fetch(`http://localhost:5050/api/organizations/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setOrg(data))
      .catch(err => console.error('Орг мэдээлэл алдаа:', err));

      

    fetch(`http://localhost:5050/api/orgadmin/organization/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Алдаа гарлаа');
        return res.json();
      })
      .then(data => setAdmin(data))
      .catch(err => console.error('Админ мэдээлэл алдаа:', err));

      fetch(`http://localhost:5050/api/system-admin/organizations/${id}/status`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          setStatus({
            totalEmployees: data.employeeCount,
            activeUsers: data.activeUsers || 'N/A',
            updated: data.updated_at || 'N/A',
          });
        })
        .catch(err => console.error('Статус мэдээлэл алдаа:', err));
      
       
  }, [id]);
 
  if (!org || !status) return <p className="text-center mt-10">Түр хүлээнэ үү...</p>;

  return (
    
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
      <button onClick={() => navigate('/system-admin/organization')} className="text-blue-600 mb-4 hover:underline">
        &larr; Буцах
      </button>

      <div className="text-center">
      
<img
  src={org.logo ? `http://localhost:5050/uploads/${org.logo}` : 'https://via.placeholder.com/80'}
  alt="logo"
  className="w-20 h-20 mx-auto mb-4 rounded-xl object-cover"
/>

          
        <h2 className="text-2xl font-bold mb-1">{org.name}</h2>
        <p>Organization Name: <strong>“{org.name}”</strong></p>
        <p>Industry: {org.industry}</p>
        <p>Address: {org.address}</p>
        <p>Phone: {org.phone}</p>
        <p>Registered: {new Date(org.registered).toLocaleDateString()}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-8">
  {/* Admins list */}
  <div className="flex-1 space-y-4">
    {admin.length > 0 ? (
      admin.map((adm) => (
        <div key={adm.id} className="border rounded-lg p-4 flex items-center gap-4">
          <img
            src={adm.profile ? `http://localhost:5050/uploads/${adm.profile}` : 'https://via.placeholder.com/80'}
            alt="admin"
            className="w-16 h-16 rounded-full object-cover border"
          />
          <div>
            <h3 className="font-semibold text-lg mb-1">Admin Information</h3>
            <p className="flex items-center gap-2 mb-1">
              <FaUser /> Name: {adm.user_name}
            </p>
            <p className="flex items-center gap-2 mb-1">
              <FaEnvelope /> Email: {adm.email}
            </p>
            <p className="flex items-center gap-2">
              <FaPhone /> Phone: {adm.phone}
            </p>
          </div>
        </div>
      ))
    ) : (
      <p>No admins found.</p>
    )}
  </div>

  {/* Organization status */}
  <div className="flex-1 border rounded-lg p-4 h-fit">
    <h3 className="font-semibold text-lg mb-3">Organization status</h3>
    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
      <li>Total Employees: {status.totalEmployees}</li>
      <li>Active Users: {status.activeUsers}</li>
      <li>Last Updated: {new Date(status.updated).toLocaleString()}</li>
    </ul>
  </div>
</div>


      <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
        <button
          onClick={() => navigate(`/system-admin/organization/${id}/admin/add`)}
          className="bg-[#23476A] text-white px-6 py-2 rounded-md hover:bg-[#223a5c] transition"
        >
          Add admin
        </button>
        <button
          onClick={() => navigate(`/system-admin/organization/${id}/edit`)}
          className="border px-6 py-2 rounded-md hover:bg-gray-100"
        >
          Засах
        </button>
        <button
          onClick={() => navigate(`/system-admin/organization/${id}/delete`)}
          className="border px-6 py-2 rounded-md hover:bg-red-100 text-red-600"
        >
          Бүртгэл устгах
        </button>
      </div>
    </div>
  );
};

export default OrganizationDetail;
