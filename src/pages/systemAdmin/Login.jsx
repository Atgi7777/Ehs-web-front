import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logoImage from '../../assets/images/image.png'

function SystemAdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => { 
    e.preventDefault()
  
    try {
      const response = await fetch('http://localhost:5050/api/auth/login', {
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
      localStorage.setItem('systemAdminToken', data.token)
      navigate('/system-admin/dashboard')
  
    } catch (error) {
      console.error('❌ Нэвтрэх үед алдаа:', error)
      alert('Сервертэй холбогдох үед алдаа гарлаа.')
    }
  }
  

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

      {/* Login Box */}
      <section className="w-full max-w-md p-8 rounded-2xl border border-gray-300 bg-white shadow-md mx-auto">
        <h2 className="mb-6 text-3xl font-bold text-center font-m-plus-2">Log in</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
  
  <div className="flex flex-col">
    <label htmlFor="email" className="text-sm font-medium mb-1">Email</label>
    <input 
      id="email"
      type="email"
      name="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>

  <div className="flex flex-col mt-2">
    <label htmlFor="password" className="text-sm font-medium mb-1">Password</label>
    <input 
      id="password"
      type="password"
      name="password"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>

  <button 
    type="submit"
    className="bg-[#23476A] text-white py-3 rounded-md text-sm mt-4 hover:bg-[#2e4e75] transition"
  >
    Нэвтрэх
  </button>

  <div className="flex items-center gap-4 text-gray-500 text-sm my-4">
  <div className="flex-grow border-t border-gray-300"></div>
  <div>or</div>
  <div className="flex-grow border-t border-gray-300"></div>
</div>

  <p className="text-center text-sm text-gray-700 mt-1 mb-3">
    <Link to="/org-admin/login" className="text-[#23476A] font-semibold hover:underline">
      Байгууллагын админаар нэвтрэх
    </Link>
  </p>

 



  <p className="text-center text-sm text-gray-700">
    Haven't an account? <Link to="/system-admin/signup" className="text-[#23476A] font-semibold hover:underline">Sign Up</Link>
  </p>

  
</form>

      </section>
    </div>
  )
}

export default SystemAdminLogin
