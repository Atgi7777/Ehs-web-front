import React, { useState } from 'react'
import logoImage from '../../assets/images/image.png'
import Google from '../../assets/images/google.png'
import axios from 'axios';
 
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      alert('Бүх талбарыг бөглөнө үү');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      alert('Зөв имэйл хаяг оруулна уу');
      return;
    }

    if (password.length < 6) {
      alert('Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой');
      return;
    }
   
    try {
      const res = await axios.post('http://localhost:5050/api/auth/register', 
        { username: name, email, password }, 
        { withCredentials: true } 
      );
      

      if (res.data.token) {
        localStorage.setItem('systemAdminToken', res.data.token);
      }

      alert('Амжилттай бүртгэгдлээ! Та нэвтэрнэ үү.');
      window.location.href = '/';
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-8 ">
      {/* Header */}
      <div className="flex flex-col mb-6 justify-start">
        <img src={logoImage} alt="logo" className="w-14 mb-2 ml-12" />
        <h1 className="text-[#23476A] font-bold text-4xl font-madimi">EHS</h1>
        <div className="text-white text-sm bg-[#23476A] rounded-3xl px-4 py-1 mt-1 font-serif w-fit ml-12">
          Environment Health and Safety
        </div>
      </div>

      {/* Signup Box */}
      <div className="w-full max-w-md p-8 bg-white border border-gray-300 rounded-2xl shadow-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Sign up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#23476A] text-white py-2 rounded-md mt-2 hover:bg-[#2e4e75] transition"
          >
            Бүртгүүлэх
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account? <a href="/system-admin/login" className="text-[#23476A] font-medium hover:underline">Log In</a>
          </p>

          <div className="text-center text-gray-400 text-sm">or</div>

          <button
            type="button"
            className="flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <img src={Google} alt="google" className="w-5 h-5" />
            <span className="text-sm text-gray-600">Sign up with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
