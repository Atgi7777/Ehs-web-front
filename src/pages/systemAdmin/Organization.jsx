import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FaEdit } from 'react-icons/fa'

const Organization = () => {
  const [organizations, setOrganizations] = useState([])

useEffect(() => {
  const fetchOrganizations = async () => {
    try {
      const res = await fetch('http://localhost:5050/api/system-admin/organizations', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('systemAdminToken')}`,
        },
      });

      if (!res.ok) throw new Error('API-с мэдээлэл татаж чадсангүй');

      const data = await res.json();
      setOrganizations(data);
    } catch (err) {
      console.error('API холболтын алдаа:', err);
      // Алдаа гарвал энд та өөрийн fallback өгөгдөл ашиглаж болно
    }
  };

  fetchOrganizations();
}, []);


const handleEdit = (orgId) => {
  navigate(`/system-admin/organization/${orgId}/edit`);
};

 

  const navigate = useNavigate()

const handleAddOrganization = () => {
  navigate('/system-admin/organization/add')
}

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Organizations</h2>
        <button  onClick={handleAddOrganization}
  className="bg-[#23476A] text-white px-5 py-2 rounded-md hover:bg-[#223a5c] transition"
>
  Add Organization
        </button>
      </div>

      <div className="overflow-x-auto rounded-md shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3 border-b">ID</th>
              <th className="text-left px-4 py-3 border-b">Name</th>
              <th className="text-left px-4 py-3 border-b">Employees</th>
              <th className="text-left px-4 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
  {organizations.map((org) => (
    <tr key={org.id} className="border-b hover:bg-gray-50">
      <td className="px-4 py-2">{org.id}</td>

      {/* Байгууллагын нэр дээр дарахад navigate хийх */}
      <td
        className="px-4 py-2 text-blue-600 hover:underline cursor-pointer"
        onClick={() => navigate(`/system-admin/organization/${org.id}`)}
      >
        {org.name}
      </td>

      <td className="px-4 py-2">{org.employeeCount}</td>

      <td className="px-4 py-2">
      <button
  onClick={() => handleEdit(org.id)}
  className="text-gray-600 hover:text-blue-600"
  title="Засах"
>
  <FaEdit />
</button>

      </td>
    </tr>
  ))}
  {organizations.length === 0 && (
    <tr>
      <td colSpan="4" className="text-center text-gray-500 py-4">
        Байгууллагын мэдээлэл алга байна.
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </div>
  )
}

export default Organization
