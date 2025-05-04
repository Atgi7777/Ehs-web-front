import React, { useState } from 'react';
import EmployeeListByRole from '../../components/organizationAdmin/EmployeeList';
import EmployeeForm from '../../components/organizationAdmin/EmployeeForm';
import { createEmployee } from '../../services/employeeService';

const RegisterEmployee = () => {
  const [refresh, setRefresh] = useState(false);

  const handleCreate = async (formData) => {
    try {
      const result = await createEmployee(formData);
      alert(result.message);
      setRefresh(prev => !prev); // 🌀 Refresh trigger
    } catch (err) {
      alert(err.message || 'Бүртгэхэд алдаа гарлаа');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <EmployeeListByRole refresh={refresh} />
        <EmployeeForm onCreate={handleCreate} />
      </div>
    </div>
  );
};

export default RegisterEmployee;
