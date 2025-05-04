import React from 'react';

const DateFilter = ({ startDate, endDate, setStartDate, setEndDate, onFilter }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow border w-full max-w-xs text-sm">
      <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
        📅 Хугацаа шүүх
      </h2>

      {/* Эхлэх огноо */}
      <div className="mb-2">
        <label className="block text-gray-600 mb-1">Эхлэх огноо</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Дуусах огноо */}
      <div className="mb-5">
        <label className="block text-gray-600 mb-1">Дуусах огноо</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Шүүх товч */}
      <div className="flex justify-center">
        <button
          onClick={onFilter}
          className="bg-[#23476A] text-white text-sm font-medium px-4 py-1.5 rounded"
        >
          Шүүх
        </button>
      </div>
    </div>
  );
};

export default DateFilter;
