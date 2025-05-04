import React from 'react'
import { Navigate } from 'react-router-dom'

// Layouts
import SystemAdminLayout from '../layouts/SystemAdminLayout'
import OrgAdminLayout from '../layouts/OrgAdminLayout'

// System Admin Pages
import SystemAdminDashboard from '../pages/systemAdmin/Dashboard'
import AddOrganization from '../pages/systemAdmin/AddOrganization'
import OrganizationDetail from '../pages/systemAdmin/OrganizationDetail'
import SystemAdminLogin from '../pages/systemAdmin/Login'
import SystemAdminSignUp from '../pages/systemAdmin/SignUp'
import SystemAdminProfile from '../pages/systemAdmin/Profile'
import Organization from '../pages/systemAdmin/Organization'
import DeleteOrg from '../pages/systemAdmin/DeleteOrg'
import EditOrg from '../pages/systemAdmin/EditOrganization'
import AddOrgAdmin from '../pages/systemAdmin/AddOrgAdmin'
import SystemAdminReport from '../pages/systemAdmin/SystemAdminReport'

// Org Admin Pages
import OrgAdminDashboard from '../pages/orgAdmin/Dashboard'
import OrgAdminLogin from '../pages/orgAdmin/Login'
import RegisterEmployee from '../pages/orgAdmin/RegisterEmployee'
import OrganizationInfo from '../pages/orgAdmin/OrganizationDetail'
import EmployeeList from '../pages/orgAdmin/EmployeeList'
import Statistics from '../pages/orgAdmin/Statistics'
import OrgLoginForm from '../pages/orgAdmin/LoginForm'
import EmployeeProfilePage from '../pages/orgAdmin/EmployeeProfilePage';
import EngineerProfilePage from '../pages/orgAdmin/EngineerProfilePage';


export const routes = [
  // System Admin Public
  {
    path: '/system-admin/login',
    element: <SystemAdminLogin />,
  },
  {
    path: '/system-admin/signup',
    element: <SystemAdminSignUp />,
  },

  // System Admin Protected
  {
    path: '/system-admin',
    element: <SystemAdminLayout />,
    children: [
      { path: 'dashboard', element: <SystemAdminDashboard /> },
    { path: 'profile', element: <SystemAdminProfile /> },

    // Байгууллага
    { path: 'organization', element: <Organization /> },
    { path: 'organization/add', element: <AddOrganization /> },
    { path: 'organization/:id', element: <OrganizationDetail /> },
    { path: 'organization/:id/edit', element: <EditOrg /> },
    { path: 'organization/:id/delete', element: <DeleteOrg /> },
    { path: 'organization/:id/report', element: <SystemAdminReport /> },

    // Байгууллагын админ
    { path: 'organization/:id/admin/add', element: <AddOrgAdmin /> },
    ],
    },
    

  
  // Org Admin Public
  {
    path: '/org-admin/login',
    element: <OrgAdminLogin />,
  },
  {
    path:'/org-admin/login-form' ,
    element: < OrgLoginForm/>,
  },

  // Org Admin Protected
  {
    path: '/org-admin',
    element: <OrgAdminLayout />,
    children: [
      { path: 'dashboard', element: <OrgAdminDashboard /> },
      { path: 'register-employee', element: <RegisterEmployee /> },
      { path: 'organization', element: <OrganizationInfo /> },
      { path: 'employees', element: <EmployeeList /> },
      { path: 'statistics', element: <Statistics /> },
      { path: 'employee-profile/:id', element: <EmployeeProfilePage /> },
      { path: 'engineer-profile/:id', element: <EngineerProfilePage /> },
      
    ],
  }, 

  // Default fallback
  {
    path: '*',
    element: <Navigate to="/system-admin/login" />,
  },
]
