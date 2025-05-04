import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getSafetyEngineerById,
  updateSafetyEngineer
} from '../../services/safetyEngineerService';

const EngineerProfilePage = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchEngineer = async () => {
      try {
        const data = await getSafetyEngineerById(id);
        setFormData(data);
        if (data?.profile?.image) {
          setPreviewImage(`http://localhost:5050/uploads/${data.profile.image}`);
        }
      } catch (error) {
        console.error('ХАБ инженер татахад алдаа:', error);
      }
    };

    fetchEngineer();
  }, [id]);

  if (!formData) {
    return <p className="text-center mt-10">Уншиж байна...</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profile: { image: file }, // file object
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
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
      submitData.append('professional_degree', formData.professional_degree);
      submitData.append('gender', formData.gender);
      submitData.append('age', formData.age);
      submitData.append('address', formData.address);
      submitData.append('department', formData.department);

      if (formData.profile?.image instanceof File) {
        submitData.append('image', formData.profile.image);
      }

      const result = await updateSafetyEngineer(id, submitData);
      alert(result.message || 'Амжилттай хадгалагдлаа');
    } catch (error) {
      alert(error.message || 'Хадгалах үед алдаа гарлаа');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mt-10">
      {/* Profile Preview */}
      <div className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-2xl font-bold mb-4">Хаб инженер мэдээлэл</h2>

        <div className="flex gap-6 items-center">
          <img
            src={previewImage || '/default-profile.png'}
            alt="Профайл зураг"
            className="w-24 h-24 object-cover rounded-full border"
          />
          <div>
            <p className="text-xl font-semibold">{formData.name}</p>
          </div>
        </div>

        <div className="text-sm text-gray-700 space-y-1">
          <p><strong>Имэйл:</strong> {formData.email}</p>
          <p><strong>Утас:</strong> {formData.phone}</p>
          <p><strong>Хүйс:</strong> {formData.gender}</p>
          <p><strong>Нас:</strong> {formData.age}</p>
          <p><strong>Хаяг:</strong> {formData.address}</p>
          <p><strong>Хэлтэс:</strong> {formData.department}</p>
          <p><strong>Мэргэжлийн зэрэг:</strong> {formData.professional_degree}</p>
          <p>
            <strong>Ажилд орсон огноо:</strong>{' '}
            {new Date(formData.created_at).toLocaleDateString('mn-MN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p><strong>Идэвхтэй эсэх:</strong> {formData.is_active ? 'Тийм' : 'Үгүй'}</p>
        </div>
      </div>

      {/* Засварлах форм */}
      <div className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Мэдээлэл засварлах</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Нэр"
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Имэйл"
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            type="text"
            name="professional_degree"
            value={formData.professional_degree}
            onChange={handleChange}
            placeholder="Мэргэжлийн зэрэг"
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Утасны дугаар"
            className="w-full border px-3 py-2 rounded"
            required
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Хүйс сонгоно уу</option>
            <option value="Эрэгтэй">Эрэгтэй</option>
            <option value="Эмэгтэй">Эмэгтэй</option>
            <option value="Бусад">Бусад</option>
          </select>

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Нас"
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Хаяг"
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Хэлтэс"
            className="w-full border px-3 py-2 rounded"
            required
          />

          <div className="space-y-2">
            <label className="block font-medium">Зураг оруулах:</label>
            <input
              type="file"
              name="profile"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#314F7B] hover:bg-[#1e3355] text-white font-medium py-2 px-4 rounded"
          >
            Хадгалах
          </button>
        </form>
      </div>
    </div>
  );
};

export default EngineerProfilePage;
