import React from 'react';

const OrganizationForm = ({ orgData, onChange, onSubmit, onCancel, onImageChange }) => {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">📝 Байгууллагын мэдээлэл засах</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={orgData.name}
          onChange={onChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Нэр"
        />
       
        <input
          type="text"
          name="address"
          value={orgData.address}
          onChange={onChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Хаяг"
        />
        <input
          type="text"
          name="phone"
          value={orgData.phone}
          onChange={onChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Утас"
        />
        <input
          type="text"
          name="activity_type"
          value={orgData.industry}
          
          onChange={onChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Үйл ажиллагааны төрөл"
        />

        {/* 📷 Зураг оруулах талбар */}
        <div>
          <label className="block text-sm font-medium text-gray-700">📁 Профайл зураг солих</label>
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="mt-1"
          />
        </div>

        {/* 🖼 Preview */}
        {orgData.profileImage && (
          <div className="mt-2">
            <img
              src={`http://localhost:5050/uploads/${orgData.profileImage}`}
              alt="Зураг"
              className="w-24 h-24 rounded-full object-cover border"
            />
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 text-black rounded">
            Буцах
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Хадгалах
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrganizationForm;
