import React, { useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'

const SystemAdminLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('systemAdminToken')
    if (!isLoggedIn) {
      navigate('/system-admin/login')
    }
  }, [navigate])

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#23476A] text-white px-6 py-8 rounded-r-3xl shadow-lg">
        <h1 className="text-2xl font-bold mb-8 text-center font-m-plus-2">Системийн Админ</h1>
        
        <nav className="flex flex-col gap-3">
          <NavLink
            to="/system-admin/dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition ${
                isActive ? 'bg-white text-[#23476A] font-semibold' : 'hover:bg-[#3f5d8d]'
              }`
            }
          >
            Хяналтын самбар
          </NavLink>
          <NavLink
            to="/system-admin/organization" 
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition ${
                isActive ? 'bg-white text-[#23476A] font-semibold' : 'hover:bg-[#3f5d8d]'
              }`
            }
          >
            Байгууллага 
          </NavLink>
          <NavLink
            to="/system-admin/profile"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition ${
                isActive ? 'bg-white text-[#23476A] font-semibold' : 'hover:bg-[#3f5d8d]'
              }`
            }
          >
            Профайл
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default SystemAdminLayout
