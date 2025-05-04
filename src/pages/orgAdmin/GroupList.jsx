import React from 'react';

const GroupList = ({ groups, selectedGroupId, onSelect }) => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-700">Нийт бүлэг</h2>
      {groups.map((group) => (
        <div
          key={group.id}
          onClick={() => onSelect(group.id)}
          className={`border rounded-lg p-4 cursor-pointer ${
            selectedGroupId === group.id ? 'bg-blue-100 border-blue-400' : 'bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{group.name}</p>
              <p className="text-xs text-gray-500">by {group.createdBy}</p>
            </div>
            <p className="text-sm text-gray-700">{group.viewed}/{group.total}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
