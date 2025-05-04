import { useState } from 'react';

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  password: '',
  image: null, // file
  role: 'employee',
  professional_degree: '',
  status: 'active',
  position: '',
 
};

const EmployeeForm = ({ onCreate }) => {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.password) {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('password', formData.password);
      submitData.append('role', formData.role);
      submitData.append('image' , formData.image);
      


      if (formData.role === 'employee') {
        submitData.append('position', formData.position);
      } else if (formData.role === 'Safety_engineer') {
        submitData.append('professional_degree', formData.professional_degree);
        submitData.append('status', formData.status);
      }
      
     

      

      onCreate(submitData);
      setFormData(initialFormState);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Ажилтан бүртгэх</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Нэр</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>
        <div>
          <label className="text-sm">Утас</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>
        <div>
          <label className="text-sm">Имэйл</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>
        <div>
          <label className="text-sm">Нууц үг</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm">Зураг (файл)</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>
        {formData.role === 'employee' && (
  <div>
    <label className="text-sm">Албан тушаал</label>
    <input
      name="position"
      value={formData.position}
      onChange={handleChange}
      className="w-full border rounded px-3 py-2 mt-1"
    />
  </div>
)}


        {formData.role === 'Safety_engineer' && (
          <>
            <div>
              <label className="text-sm">Мэргэжлийн зэрэг</label>
              <input
                name="professional_degree"
                value={formData.professional_degree}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm">Төлөв</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
              >
                <option value="active">Идэвхтэй</option>
                <option value="inactive">Идэвхгүй</option>
              </select>
            </div>
          </>
        )}
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium mb-2">Үүрэг</p>
        <label className="mr-6">
          <input
            type="radio"
            name="role"
            value="employee"
            checked={formData.role === 'employee'}
            onChange={handleChange}
          />
          <span className="ml-2">Ажилтан</span>
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="Safety_engineer"
            checked={formData.role === 'Safety_engineer'}
            onChange={handleChange}
          />
          <span className="ml-2">ХАБ инженер</span>
        </label>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-[#314F7B] text-white font-medium px-6 py-2 rounded-md hover:bg-blue-900"
        >
          Бүртгэх
        </button>
      </div>
    </div>
  );
};

export default EmployeeForm;
