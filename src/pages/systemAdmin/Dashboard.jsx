import React, { useEffect, useState } from 'react'

const SystemAdminDashboard = () => {
  const [stats, setStats] = useState({
    organizations: 0,
    employees: 0,
    reports: 0 
  })

  useEffect(() => {
    
    fetch('http://localhost:5050/api/system-admin/dashboard', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('systemAdminToken')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setStats({
          organizations: data.organizations,
          employees: data.employees,
          reports: data.reports
        })
      })
      .catch((err) => console.error('Алдаа:', err))
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-200 p-6 rounded-lg text-center shadow">
          <p className="text-lg font-medium mb-2">Нийт байгууллага</p>
          <p className="text-3xl font-bold">{stats.organizations}</p>
        </div>

        <div className="bg-gray-200 p-6 rounded-lg text-center shadow">
          <p className="text-lg font-medium mb-2">Нийт ажилчид</p>
          <p className="text-3xl font-bold">{stats.employees}</p>
        </div>

        <div className="bg-gray-200 p-6 rounded-lg text-center shadow">
          <p className="text-lg font-medium mb-2">Асуудал</p>
          <p className="text-3xl font-bold">{stats.reports}</p>
        </div>
      </div>
    </div>
  )
}

export default SystemAdminDashboard
