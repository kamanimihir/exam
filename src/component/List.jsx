import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

export default function List() {
  const home = useNavigate();
  const homepage = () => {
    home("/");
  };

  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("userdata");
    return storedData ? JSON.parse(storedData) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editfirstname, setEditfirstname] = useState("");
  const [editlastname, setEditlastname] = useState("");
  const [editposition, setEditposition] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editphone, setEditphone] = useState("");
  const [editsalary, setEditsalary] = useState("");
  const [viewIndex, setViewIndex] = useState(null); // State for viewing details

  // delete
  const delete1 = (index) => {
    const updateData = [...data];
    updateData.splice(index, 1);
    setData(updateData);
    localStorage.setItem("userdata", JSON.stringify(updateData));
    toast.success("Employee deleted successfully!"); // Toast on delete
  };

  // edit
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditfirstname(data[index].firstname);
    setEditlastname(data[index].lastname);
    setEditEmail(data[index].email);
    setEditposition(data[index].position);
    setEditphone(data[index].phone);
    setEditsalary(data[index].salary);
  };

  // Update
  const handleUpdate = (e) => {
    e.preventDefault();
    const updateData = data.map((data, index) =>
      editIndex === index
        ? {
            firstname: editfirstname,
            lastname: editlastname,
            email: editEmail,
            position: editposition,
            phone: editphone,
            salary: editsalary,
          }
        : data
    );
    setData(updateData);
    setEditIndex(null);
    localStorage.setItem("userdata", JSON.stringify(updateData));
    toast.success("Employee updated successfully!"); 
  };

  // Toggle view
  const toggleView = (index) => {
    setViewIndex(viewIndex === index ? null : index);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Employees List</h1>
      <table className="min-w-full border   shadow-md rounded-md bg-gray-200 text-gray-700">
        <thead>
          <tr className="text-sm">
            <th className="py-2 px-4 border-b">Employee First Name</th>
            <th className="py-2 px-4 border-b">Employee Last Name</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ele, index) => (
            <React.Fragment key={index}>
              <tr className="text-center border-b">
                <td className="py-2 px-4">{ele.firstname}</td>
                <td className="py-2 px-4">{ele.lastname}</td>
                <td className="py-2 px-4">{ele.email}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    onClick={() => delete1(index)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
                    onClick={() => toggleView(index)}
                  >
                    View
                  </button>
                </td>
              </tr>
              {viewIndex === index && (
                <tr className="bg-gray-100">
                  <td colSpan="3" className="py-4 px-6 text-left">
                    <p>
                      <strong>Position:</strong> {ele.position}
                    </p>
                    <p>
                      <strong>Phone:</strong> {ele.phone}
                    </p>
                    <p>
                      <strong>Salary:</strong> {ele.salary}
                    </p>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <br />
      {editIndex !== null && (
        <>
          <h2 className="text-xl font-semibold mb-4">Update</h2>
          <form className="space-y-4" onSubmit={handleUpdate}>
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editfirstname}
              onChange={(e) => setEditfirstname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editlastname}
              onChange={(e) => setEditlastname(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Position"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editposition}
              onChange={(e) => setEditposition(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editphone}
              onChange={(e) => setEditphone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Salary"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editsalary}
              onChange={(e) => setEditsalary(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              Update
            </button>
          </form>
        </>
      )}
      <br />
      <button
        onClick={homepage}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Add Employee
      </button>
      <ToastContainer />
    </div>
  );
}
