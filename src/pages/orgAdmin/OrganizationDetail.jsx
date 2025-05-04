import React, { useState } from 'react';
import GroupList from './GroupList';
import EmployeeList from './EmployeeList';
import DateFilter from './DateFilter';

const DashboardContainer = () => {
  const [startDate, setStartDate] = useState('2025-03-01');
  const [endDate, setEndDate] = useState('2025-03-30');
  const [selectedGroupId, setSelectedGroupId] = useState(1);

  const groups = [
    { id: 1, name: 'Astralink', createdBy: 'Ariunaa tuguldur', viewed: 8, total: 10 },
    { id: 2, name: 'AstraBuilding', createdBy: 'Ariunaa tuguldur', viewed: 14, total: 14 },
    { id: 3, name: 'OyuBuild', createdBy: 'Ariunaa tuguldur', viewed: 7, total: 8 },
  ];

  const employees = {
    1: [
      { name: 'Andrew', email: 'andrew@gmail.com', viewedAt: '2025-03-10' },
      { name: 'Mike', email: 'mike@gmail.com', viewedAt: '2025-03-29' },
      { name: 'Gerelsukh', email: 'gerel@gmail.com', viewedAt: null },
    ],
    2: [
      { name: 'Tuguldur', email: 'tuguldur@gmail.com', viewedAt: '2025-03-15' },
      { name: 'Bataa', email: 'bataa@gmail.com', viewedAt: null },
    ],
    3: [
      { name: 'Otgoo', email: 'otgoo@gmail.com', viewedAt: null },
      { name: 'Munhuu', email: 'munhuu@gmail.com', viewedAt: '2025-03-08' },
    ],
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen grid grid-cols-1 md:grid-cols-3 gap-6">
      <GroupList
        groups={groups}
        selectedGroupId={selectedGroupId}
        onSelect={setSelectedGroupId}
      />
      <EmployeeList
        employees={employees[selectedGroupId] || []}
        startDate={startDate}
        endDate={endDate}
      />
      <DateFilter
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    </div>
  );
};

export default DashboardContainer;
