import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { parseJwt } from '../../utils/jwt';

const SystemAdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔁 Profile татах функц гадагшаа
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('systemAdminToken');
      const decoded = parseJwt(token);
      if (!decoded?.id) return;

      const res = await axios.get(`http://localhost:5050/api/system-admin/profile/${decoded.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(res.data);
    } catch (error) {
      console.error('Профайл мэдээлэл авах үед алдаа:', error);
    }
  };

  // useEffect ашиглан profile анх татах
  useEffect(() => {
    fetchProfile();
  }, []);

  // 📤 Зураг upload хийх
  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!selectedImage) return;

    try {
      const token = localStorage.getItem('systemAdminToken');
      const decoded = parseJwt(token);

      const formData = new FormData();
      formData.append('image', selectedImage);

      await axios.put(
        `http://localhost:5050/api/auth/profile/${decoded.id}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      await fetchProfile(); // шинэчлэгдсэн профайл дахин татна
      setSelectedImage(null);
      alert('Зураг амжилттай шинэчлэгдлээ');
    } catch (err) {
      console.error('Upload алдаа:', err);
      alert('Зураг шинэчлэхэд алдаа гарлаа');
    }
  };

  // 🔁 Тайлан руу navigate хийх
  const handleOrgReport = () => {
    navigate(`/system-admin/organization/${id}/report`);
  };

  // 🚪 Гарах
  const handleLogout = () => {
    localStorage.removeItem('systemAdminToken');
    navigate('/system-admin/login');
  };

  if (!profile) return <div className="text-center mt-10">Уншиж байна...</div>;

  return (
    <div className="max-w-4xl mx-auto text-center mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Систем админы профайл</h2>

      <img
        src={
          profile.image
            ? `http://localhost:5050/uploads/${profile.image}?${new Date().getTime()}` // cache busting
            : 'https://i.pravatar.cc/150?img=12'
        }
        alt="profile"
        className="w-28 h-28 mx-auto rounded-full border-4 border-gray-200 mb-4 object-cover"
      />

      {/* Зураг оруулах form */}
      <form
        onSubmit={handleImageUpload}
        className="mt-6 flex flex-col items-center gap-4"
        encType="multipart/form-data"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files[0])}
          className="block text-sm text-gray-600"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Зураг шинэчлэх
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-4">{profile.user}</h3>
      <p className="text-gray-600">Систем админ</p>
      <p className="text-gray-500 text-sm mt-1">
        Ажилд орсон огноо: {profile.joinedDate}
      </p>

      {/* Статистик хэсэг */}
      <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
        <div className="bg-white border rounded-xl p-4 shadow-sm w-64">
          <div className="text-2xl font-bold mb-1">{profile.employees}</div>
          <div className="text-sm text-gray-600">Нийт ажилчид</div>
        </div>
        <div className="bg-white border rounded-xl p-4 shadow-sm w-64">
          <div className="text-2xl font-bold mb-1">{profile.organizations}</div>
          <div className="text-sm text-gray-600">Үүсгэсэн байгууллага</div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
        <button
          onClick={handleOrgReport}
          className="px-6 py-2 bg-[#23476A] text-white rounded-md hover:bg-[#223a5c] transition"
        >
          Тайлан харах
        </button>

        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Гарах
        </button>
      </div>
    </div>
  );
};

export default SystemAdminProfile;
