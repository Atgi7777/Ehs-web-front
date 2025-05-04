import React, { useState } from 'react'
import logoImage from '../../assets/images/image.png';
import { useNavigate , Link} from 'react-router-dom';

function LoginForm() {
  
  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
  
    const handleSubmit = async (e) => { 
      e.preventDefault()
    
      try {
        const response = await fetch('http://localhost:5050/api/auth/login-org-admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })
    
        const data = await response.json()
    
        if (!response.ok) {
          alert(data.message || 'Нэвтрэхэд алдаа гарлаа.')
          return
        }
    
        // Token хадгалах
        localStorage.setItem('orgAdminToken', data.token)
        navigate('/org-admin/dashboard')
    
      } catch (error) {
        console.error('❌ Нэвтрэх үед алдаа:', error)
        alert('Сервертэй холбогдох үед алдаа гарлаа.')
      }
    }
 
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      {/* Header */}
      <header className="flex items-center bg-[#23476A] text-white px-6 py-4 text-2xl rounded-bl-3xl rounded-br-3xl">
        <img src={logoImage} alt="logo" className="w-10 mr-4" />
        <div className=" font-bold">ENVIRONMENT</div>
      </header>

      {/* Login Form */}
      <main className="flex-grow flex items-center justify-center px-4 mt-3">
        <section className="w-full max-w-md p-8 bg-white border border-gray-300 rounded-2xl shadow-md">
          <h2 className="text-3xl font-bold text-center mb-6 font-m-plus-2">Log in</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
  <div>
    <label className="block text-sm font-medium mb-1">Email</label>
    <input
      type="email"
      name="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium mb-1">Password</label>
    <input
      type="password"
      name="password"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>
  <button
    type="submit"
    className="bg-[#355D8B] text-white py-3 rounded-md text-sm mt-4 hover:bg-[#2e4e75] transition"
  >
    Нэвтрэх
  </button>

  <div className="flex items-center gap-4 text-gray-500 text-sm my-4">
  <div className="flex-grow border-t border-gray-300"></div>
  <div>or</div>
  <div className="flex-grow border-t border-gray-300"></div>
</div>

  {/* Системийн админаар нэвтрэх товч */}
  <p className="text-center text-sm text-gray-700 mt-1">
    <Link to="/system-admin/login" className="text-[#23476A] font-semibold hover:underline">
      Системийн админаар нэвтрэх
    </Link>
  </p>
</form>

        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6 mt-10 text-sm">
        <div className="font-semibold text-lg mb-2">ENVIRONMENT</div>
        <div className="mb-2">
          <p>Email: 1234***@XXXX.com | Addr: 123, XX street, XX District, XX City</p>
          <p>138-1234-XXXX</p>
        </div>
        <p>&copy; 2022 - All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default LoginForm;
