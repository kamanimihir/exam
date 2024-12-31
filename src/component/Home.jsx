import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  // form state
  const [item, setItem] = useState(() => {
    const checked = localStorage.getItem("userdata");
    return checked ? JSON.parse(checked) : [];
  });
  const [userName, setName] = useState({
    firstname: "",
    lastname: "",
    email: "",
    position: "",
    phone: "",
    salary: "",
  });

  // get data User
  const handlData = (e) => {
    const { name, value } = e.target;
    setName({ ...userName, [name]: value });
  };

  // Form submit Button
  const handlsubmite = (e) => {
    e.preventDefault();

    for (const [key, value] of Object.entries(userName)) {
      if (value.trim() === "") {
        toast.error("Field is empty");
        return;
      }
    }

    setItem([...item, userName]);
    setName({
      firstname: "",
      lastname:"",
      email: "",
      position: "",
      phone: "",
      salary: "",
    });

    toast.success("User data submitted successfully!");
  };

  // list page
  const navigate = useNavigate();
  const homepage = () => {
    navigate("/list", { state: { Data: item } });
  };

  // localStorage
  useEffect(() => {
    localStorage.setItem("userdata", JSON.stringify(item));
  }, [item]);

  return (
    <>
      <div className="w-full">
        <button
          className="bg-black text-white p-3 m-10 rounded-lg"
          onClick={homepage}
        >
          Employees List
        </button>
        <div className="text-center">
          <form className="mt-14" onSubmit={handlsubmite}>
            <input
              className="border border-black p-1"
              type="text"
              placeholder="Enter First Name"
              name="firstname"
              value={userName.firstname}
              onChange={handlData}
            />{" "}
            <br />
            <br />
            <input
              className="border border-black p-1"
              type="text"
              placeholder="Enter lastname"
              name="lastname"
              value={userName.lastname}
              onChange={handlData}
            />
            <br />
            <br />
            <input
              className="border border-black p-1"
              type="email"
              placeholder="Enter Email"
              name="email"
              value={userName.email}
              onChange={handlData}
            />
            <br />
            <br />
            <input
              className="border border-black p-1"
              type="text"
              placeholder="Enter position"
              name="position"
              value={userName.position}
              onChange={handlData}
            />
            <br />
            <br />
            <input
              className="border border-black p-1"
              type="text"
              placeholder="Enter phone"
              name="phone"
              value={userName.phone}
              onChange={handlData}
              maxLength="10"
              onKeyPress={(e) => {
                if (!/^\d$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            <br />
            <br />
            <input
              className="border border-black p-1"
              type="number"
              placeholder="Enter salary"
              name="salary"
              value={userName.salary}
              onChange={handlData}
            />
            <br />
            <br />
            <button className="bg-black text-white p-3 rounded-lg">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Toast container to show notifications */}
      <ToastContainer />
    </>
  );
}
