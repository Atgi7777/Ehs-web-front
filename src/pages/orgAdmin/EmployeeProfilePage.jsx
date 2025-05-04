import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeById, updateEmployee } from '../../services/employeeService';

const EmployeeProfilePage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(id);
        setFormData(data);
        if (data?.profile?.image) {
          setPreviewImage(`http://localhost:5050/uploads/${data.profile.image}`);
        }
      } catch (error) {
        console.error('Ажилтан татахад алдаа:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profile: { image: file },
      }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('position', formData.position);
      submitData.append('department', formData.department);
      submitData.append('gender', formData.gender);
      submitData.append('age', formData.age);
      submitData.append('address', formData.address);

      if (formData.profile?.image instanceof File) {
        submitData.append('image', formData.profile.image);
      }

      const result = await updateEmployee(id, submitData);
      alert(result.message || 'Амжилттай хадгалагдлаа');
    } catch (error) {
      alert(error.message || 'Хадгалах үед алдаа гарлаа');
    }
  };

  if (!formData) return <p className="text-center mt-10">Уншиж байна...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mt-10">
      {/* Зүүн талд харах хэсэг */}
      <div className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-2xl font-bold mb-4">Ажилтны мэдээлэл</h2>

        <div className="flex gap-6 items-center">
          <img
            src={previewImage || '/default-profile.png'}
            alt="Профайл"
            className="w-24 h-24 object-cover rounded-full border"
          />
          <div>
            <p className="text-xl font-semibold">{formData.name}</p>
            <p className="text-gray-600">{formData.position}</p>
            <p className="text-sm text-gray-500">{formData.department}</p>
          </div>
        </div>

        <div className="text-sm text-gray-700 space-y-1">
          <p><strong>Имэйл:</strong> {formData.email}</p>
          <p><strong>Утас:</strong> {formData.phone}</p>
          <p><strong>Хүйс:</strong> {formData.gender}</p>
          <p><strong>Нас:</strong> {formData.age}</p>
          <p><strong>Хаяг:</strong> {formData.address}</p>
          <p><strong>Ажилд орсон огноо:</strong> {new Date(formData.created_at).toLocaleDateString()}</p>
          <p><strong>Идэвхтэй эсэх:</strong> {formData.is_active ? 'Тийм' : 'Үгүй'}</p>
        </div>
      </div>

      {/* Баруун талд засварлах хэсэг */}
      <div className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold mb-2">Мэдээлэл засварлах</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Нэр" className="w-full border px-3 py-2 rounded" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Имэйл" className="w-full border px-3 py-2 rounded" required />
          <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Албан тушаал" className="w-full border px-3 py-2 rounded" required />
          <input type="text" name="department" value={formData.department || ''} onChange={handleChange} placeholder="Хэлтэс" className="w-full border px-3 py-2 rounded" />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Утасны дугаар" className="w-full border px-3 py-2 rounded" required />
          <select name="gender" value={formData.gender || ''} onChange={handleChange} className="w-full border px-3 py-2 rounded">
            <option value="">Хүйс сонгоно уу</option>
            <option value="Эрэгтэй">Эрэгтэй</option>
            <option value="Эмэгтэй">Эмэгтэй</option>
            <option value="Бусад">Бусад</option>
          </select>
          <input type="number" name="age" value={formData.age || ''} onChange={handleChange} placeholder="Нас" className="w-full border px-3 py-2 rounded" />
          <input type="text" name="address" value={formData.address || ''} onChange={handleChange} placeholder="Хаяг" className="w-full border px-3 py-2 rounded" />

          <div>
            <label className="block text-sm font-medium mb-1">Зураг оруулах:</label>
            <input type="file" name="profile" accept="image/*" onChange={handleFileChange} className="w-full border px-3 py-2 rounded" />
          </div>

          <button type="submit" className="w-full bg-[#314F7B] hover:bg-[#1e3355] text-white font-medium py-2 px-4 rounded">
            Хадгалах
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeProfilePage;
