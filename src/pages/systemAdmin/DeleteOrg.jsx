import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteOrg = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [org, setOrg] = useState(null);

  
  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const res = await fetch(`http://localhost:5050/api/system-admin/organizations/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('systemAdminToken')}`,
          },
        });
  
        if (!res.ok) throw new Error('Серверээс амжилттай хариу ирсэнгүй');
  
        const data = await res.json();
        setOrg(data);
      } catch (err) {
        console.error('Мэдээлэл татах алдаа:', err);
      }
    };
  
    fetchOrganization();
  }, [id]);
  

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Та бүрэн устгахдаа итгэлтэй байна уу? Энэ үйлдлийг буцаах боломжгүй.');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5050/api/system-admin/organizations/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('systemAdminToken')}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Устгах үед алдаа гарлаа.');
        return;
      }

      alert('Байгууллага амжилттай устгагдлаа.');
      navigate('/system-admin/organization');
    } catch (err) {
      console.error('Сервертэй холбогдож чадсангүй:', err);
      alert('Сервертэй холбогдож чадсангүй.');
    }
  };

  if (!org) return <p className="text-center mt-10">Уншиж байна...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow mt-12 text-center border">
      <img
         src={`http://localhost:5050/uploads/${org.logo}`}
        alt="logo"
        className="w-20 h-20 mx-auto mb-4 rounded-xl object-cover"
      />
      <h2 className="text-2xl font-bold text-red-600 mb-2">Байгууллага устгах</h2>
      <p className="mb-2 text-gray-700 text-lg">
        Байгууллагын нэр: <strong>{org.name}</strong>
      </p>
      <p className="text-gray-500 text-sm mb-6">
      Үйл ажиллагааны төрөл: {org.industry} | Бүртгэгдсэн огноо: {org.registered}

      </p>
  
      <div className="bg-red-50 border border-red-300 text-red-700 text-sm p-4 rounded-md mb-6">
        ⚠️ Та энэ байгууллагыг бүрмөсөн устгах гэж байна. Энэ үйлдлийг буцаах боломжгүй.
        <br />
        Устгасан тохиолдолд тухайн байгууллагын бүх хэрэглэгч, тайлан болон тохиргоонууд устах болно.
      </div>
  
      <div className="flex justify-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 rounded-md border hover:bg-gray-100"
        >
          Буцах
        </button>
        <button
          onClick={handleDelete}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Устгах
        </button>
      </div>
    </div>
  );
};  

export default DeleteOrg;
