import React from 'react';

const EmployeeList = ({ employees, startDate, endDate }) => {
//   const toDate = (str) => new Date(str);
  const isInRange = (date) => {
    if (!date) return false;
    const d = new Date(date);
    return d >= new Date(startDate) && d <= new Date(endDate);
  };

  const viewed = employees.filter((e) => isInRange(e.viewedAt));
  const notViewed = employees.filter((e) => !isInRange(e.viewedAt));

  return (
    <div>
      <div className="bg-white rounded-lg p-4 shadow space-y-2">
        <h3 className="font-semibold text-gray-700 mb-2">Зааварчилгаа авсан ажилтнууд</h3>
        {viewed.map((emp, i) => (
          <div key={i} className="flex items-center justify-between border-b py-2">
            <div className="flex items-center gap-3">
              <img src={`https://i.pravatar.cc/40?img=${i + 1}`} alt="avatar" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-medium">{emp.name}</p>
                <p className="text-xs text-gray-500">{emp.email}</p>
              </div>
            </div>
            <span className="text-green-600 text-xl">✔</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg p-4 shadow mt-4 space-y-2">
        <h3 className="font-semibold text-gray-700 mb-2">Зааварчилгаа аваагүй ажилтнууд</h3>
        {notViewed.map((emp, i) => (
          <div key={i} className="flex items-center justify-between border-b py-2">
            <div className="flex items-center gap-3">
              <img src={`https://i.pravatar.cc/40?img=${i + 20}`} alt="avatar" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-medium">{emp.name}</p>
                <p className="text-xs text-gray-500">{emp.email}</p>
              </div>
            </div>
            <span className="text-red-500 text-xl">●</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
