import React from 'react';
import DashboardChart from './DashboardChart'; 

const DashboardContent = () => {
  const stats = {
    employees: 87,
    reports: 43,
    incidents: 5,
  };

  const incidents = [
    { date: '2021.03.16', employee: 'Баг-Эрдэнэ', description: 'Ажлын байрны осол' },
    { date: '2021.03.16' , employee: 'Сарангэрэл', description: 'Хальтиргаа унаа' },
    { date: '2021.03.16', employee: 'Баг-Эрдэнэ', description: 'Ажлын байрны осол' },
    { date: '2021.03.16', employee: 'Сарангэрэл', description: 'Хальтиргаа унаа' },
    { date: '2021.03.16', employee: 'Баг-Эрдэнэ', description: 'Ажлын байрны осол' },
    { date: '2021.03.16', employee: 'Сарангэрэл', description: 'Хальтиргаа унаа' },
  ];

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
              {incidents.map((incident, index) => (
                <tr key={index} className="bg-gray-50 rounded">
                  <td className="py-2">{incident.date || '-'}</td>
                  <td>{incident.employee}</td>
                  <td>{incident.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
