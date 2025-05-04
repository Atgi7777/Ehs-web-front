//components/systemAdmin/OrganizationDetails.jsx
import React from 'react';

const OrganizationDetails = ({ orgData }) => {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">📄 Байгууллагын мэдээлэл</h2>
      <div className="space-y-2 text-sm">
        
        <p><strong>Нэр:</strong> {orgData.name}</p>
        <p><strong>Код:</strong> {orgData.code}</p>
        <p><strong>Хаяг:</strong> {orgData.address}</p>
        <p> 
          <strong>Утас:</strong> {orgData.phone ? orgData.phone : '(Утасны дугаар оруулаагүй)'}
        </p>
        <p><strong>Үйл ажиллагааны төрөл:</strong> {orgData.activity_type}</p>
    
                   
     
        <div className="mt-4">
  <p><strong>📁 Профайл зураг:</strong></p>
  {orgData.profileImage ? (
    <div className="w-full max-w-[200px] aspect-square mx-auto mb-4">
      <img
        src={`http://localhost:5050/uploads/${orgData.profileImage}`}
        alt="logo"
        className="w-full h-full rounded-xl object-cover border"
      />
    </div>
  ) : (
    <p className="text-gray-400 text-sm text-center">Зураг оруулаагүй байна</p>
  )}
</div>


      

        <div className="mt-2">
          
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetails;
