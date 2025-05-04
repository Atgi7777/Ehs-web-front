//components/systemAdmin/AdminList.jsx
import React from 'react';

const AdminList = ({ admins, onDelete }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    return new Date(timestamp).toLocaleString('mn-MN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return ( 
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">👥 Админ мэдээлэл</h3>
      
      {admins.length === 0 ? (
        <div className="p-4 border border-dashed rounded text-gray-600 bg-gray-50">
          <p>Админ бүртгэгдээгүй байна.</p>
          </div>
      ) : (

        admins.map((admin, index) => (
          <div key={admin.id} className="mt-4 p-4 border rounded bg-gray-50 space-y-3 text-sm">
            <div className="flex items-center gap-3">
            {admin.profile ? (
  <img
    src={`http://localhost:5050/uploads/${admin.profile}`}
    alt="admin"
    className="w-14 h-14 rounded-full object-cover border"
  />
) : (
  <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
    🧑‍💼
  </div>
)}

              <div>
                <p className="font-semibold">{admin.user_name}</p>
                <p className="text-xs text-gray-500">Сүүлд шинэчилсэн: {formatDate(admin.assigned_at)}</p>
              </div>
            </div>

           

            <p><strong>Имэйл:</strong> {admin.email}</p>
            <p><strong>Утас:</strong> {admin.phone || 'Утасны дугаар оруулаагүй'}</p>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => onDelete(index)} className="text-red-600 hover:underline">🗑 Устгах</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminList;
