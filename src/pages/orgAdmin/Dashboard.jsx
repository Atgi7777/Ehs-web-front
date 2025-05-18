import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardChart from './DashboardChart'; 

const DashboardContent = () => {
  const [stats, setStats] = useState({
    employees: 0,
    reports: 0,
    incidents: 0,
  });

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    // Dashboard-ын ерөнхий статистик авах
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/system-admin/orgDashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('orgAdminToken')}`, // 🔥 Токен хадгалсан гэж үзэж байна
          }
        });
//нийт ажилчдыг харах код бичих
        const data = response.data;

        setStats({
          employees: data.employees || 0,
          reports: data.reports || 0,
          incidents: data.incidents || 0, 
        });

      } catch (error) {
        console.error('📊 Статистик авахад алдаа:', error);
      }
    };

    // Осол зөрчлийн жагсаалт авах
    const fetchIncidents = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/getIssue', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('orgAdminToken')}`,
          }
        });
        // зааварчилгааны дэлгэрэнгүй хардаг болгоно

        setIncidents(response.data || []);
      } catch (error) {
        console.error('🚨 Осол зөрчлийн мэдээлэл авахад алдаа:', error);
      }
    };

    fetchStats();
    fetchIncidents();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Статистик */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 text-center shadow">
          <p className="text-3xl font-bold">{stats.employees}</p>
          <p className="text-sm text-gray-600">Нийт ажилтнууд</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow">
          <p className="text-3xl font-bold">{stats.reports}</p>
          <p className="text-sm text-gray-600">Тайлан илгээсэн</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow">
          <p className="text-3xl font-bold">{stats.incidents}</p>
          <p className="text-sm text-gray-600">Осол зөрчил</p>
        </div>
      </div>

      {/* График ба осол */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Тайлан илгээсэн график */}
        <DashboardChart />

        {/* Осол зөрчлийн мэдээлэл */}
        <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
          <p className="text-lg font-semibold mb-4">Осол зөрчлийн мэдээлэл</p>
          <table className="w-full text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-gray-600">
                <th>Огноо</th>
                <th>Ажилтан</th>
                <th>Тайлбар</th>
              </tr>
            </thead>
            <tbody>
              {incidents.length > 0 ? (
                incidents.map((incident, index) => (
                  <tr key={index} className="bg-gray-50 rounded">
                    <td className="py-2">{incident.date || '-'}</td>
                    <td>{incident.employee || '-'}</td>
                    <td>{incident.description || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    Мэдээлэл байхгүй байна
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
