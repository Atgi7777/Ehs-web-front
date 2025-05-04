import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmployeeListByRole = ({ refresh }) => {
  const [employees, setEmployees] = useState([]);
  const [engineers, setEngineers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("orgAdminToken");

      const res = await axios.get(
        "http://localhost:5050/api/orgadmin/employees",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmployees(res.data.employees || []);
      setEngineers(res.data.engineers || []);
    } catch (err) {
      console.error("Алдаа:", err);
      setError("Ажилчдын мэдээлэл авч чадсангүй.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const handleEdit = (id, role) => {
    navigate(`/org-admin/${role}-profile/${id}`);
  };

  const renderList = (list, role) => (
    <ul className="space-y-2">
      {list.map((emp) => (
        <li
          key={emp.id}
          className="flex items-center justify-between border rounded p-2"
        >
          <div className="flex items-center gap-3">
            <img
              src={
                emp?.profile?.image
                  ? `http://localhost:5050/uploads/${emp.profile.image}`
                  : "/default-profile.png"
              }
              alt={emp.name}
              className="w-10 h-10 rounded-full object-cover border"
            />

            <div
           
            >
              <p className="font-medium">{emp.name}</p>
              <p className="text-sm text-gray-500">{emp.email}</p>
            </div>
          </div>
          <button
            onClick={() => handleEdit(emp.id, role)}
            className="text-[#314F7B] hover:text-[#1a293f]"
          >
            <Pencil size={20} />
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Байгууллагын ажилчид
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Уншиж байна...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          {/* ХАБ инженерүүд */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#314F7B] mb-2">
              ХАБ инженерүүд
            </h3>
            {engineers.length > 0 ? (
              renderList(engineers, "engineer")
            ) : (
              <p className="text-sm text-gray-500">
                ХАБ инженер бүртгэгдээгүй байна.
              </p>
            )}
          </div>

          {/* Энгийн ажилчид */}
          <div>
            <h3 className="text-lg font-semibold text-[#314F7B] mb-2">
              Энгийн ажилчид
            </h3>
            {employees.length > 0 ? (
              renderList(employees, "employee")
            ) : (
              <p className="text-sm text-gray-500">
                Энгийн ажилтан бүртгэгдээгүй байна.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeListByRole;
