import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import logoImage from '../assets/images/image.png';
import { LogOut } from 'lucide-react'; // logout icon

const OrgAdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('orgAdminToken');
    navigate('/org-admin/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Navbar */}
      <header className="flex items-center justify-between bg-[#23476A] text-white px-6 py-4 rounded-b-3xl shadow-md">
        <div className="flex items-center space-x-4">
          <img src={logoImage} className="w-10" alt="enviroment-logo" />
          <h1 className="text-2xl font-semibold font-m-plus-2">ENVIRONMENT</h1>
        </div>

        <div className="flex items-center space-x-6 mr-10">
          <nav className="flex space-x-6 text-sm font-medium">
            <NavLink
              to="/org-admin/dashboard"
              className={({ isActive }) =>
                isActive ? 'border-b-2 border-white' : 'hover:underline'
              }
            >
              Нүүр хуудас
            </NavLink>
            <NavLink
              to="/org-admin/register-employee"
              className={({ isActive }) =>
                isActive ? 'border-b-2 border-white' : 'hover:underline'
              }
            >
              Ажилтан бүртгэх
            </NavLink>
            <NavLink
              to="/org-admin/organization"
              className={({ isActive }) =>
                isActive ? 'border-b-2 border-white' : 'hover:underline'
              }
            >
              Байгууллага мэдээлэл
            </NavLink>
          </nav>

          {/* Гарах icon */}
          <button
            onClick={handleLogout}
            title="Гарах"
            className="hover:text-red-400 transition"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6 mt-10 text-sm">
        <div className="font-semibold text-lg mb-2">ENVIRONMENT</div>
        <div className="mb-2">
          <p>Email: 1234***@XXXX.com | Addr: 123, XX street, XX District, XX City</p>
          <p>138-1234-XXXX</p>
        </div>
        <p>&copy; Copyright 2022 - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default OrgAdminLayout;
