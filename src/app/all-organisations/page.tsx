"use client";
import SERVER_URL from "@/configure/SERVER_URL";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function GetOrganisation() {
  const [category, setCategory] = useState("");
  
  const [organisations, setOrganisation] = useState([]);
  const [state, setState] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    axios
      .get(`${SERVER_URL}/admin/protected`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => { })
      .catch((err) => {
        router.push("/login");
        localStorage.removeItem("token");
      });
  }, []);
  useEffect(() => {
    axios.get((SERVER_URL + "/admin/get-organizations"),
      {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      }).then((res) => {
        setOrganisation(res.data.organizations);
      });
  }, [state]);

const handleCategory = (e: any) => {
    const selectedCategory = e.target.value; // Get the selected district from the event

    setCategory(selectedCategory); // Update the district state with the selected district

    axios
      .get(
        `${SERVER_URL}/admin/get-organizations?category=${selectedCategory}`,
        {
          // Use the updated district value
          headers: { "x-access-token": localStorage.getItem("token") },
        }
      )
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  
const handleSubmit = () => {
    const token = localStorage.getItem("token");
  
    axios.get(`${SERVER_URL}/admin/get-organizations?category=${category}`,  {
      headers: {
        'x-access-token': token
      }
    }).then((res) => {
        setOrganisation(res.data.organizations);
      }).catch((err) => {
      console.log(err)
    })
  }
  
  const handleDelete = (id: string) => {
    axios
      .post(
        `${SERVER_URL}/admin/delete-organizations/${id}`,
        {},
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Organisation deleted successfully");
          setOrganisation(organisations.filter((item:any) => item._id !== id));
        }
      });
  };
  
  return (
    <Sidebar>
      <div>
        <h1 className="text-3xl font-bold mx-auto">All Organisations</h1>

        <div className="max-w-sm mx-auto mt-14 ">
          
          {/* category field */}
          <div className="max-w-sm mx-auto">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Select Category
                </label>
                <select
                  id="category"
                  onChange={(e) => handleCategory(e)}
                  className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-900 focus:border-blue-900 block w-full p-3 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-800 dark:focus:border-blue-900"
                >
                  <option>Select an option</option>
                  {organisations.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
          
        </div>
        
        
        <div className="max-w-sm mx-auto my-5">
          <button
            className="bg-primary text-white w-full py-3 rounded-lg bg-blue-500"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="table-list-group my-20">
        <div className="relative overflow-x-auto rounded-xl">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white rounded-xl">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
              <tr>
                <th className="pl-5">
                  Name
                </th>
                <th>
                  Link
                </th>
                <th>
                  Position
                </th>
                <th>
                  Image
                </th>
                <th>
                  Category
                </th>
                <th>
                  Phone
                </th>
                <th>
                  Email
                </th>
                <th>
                  Description
                </th>
                <th>
                  IndexNo
                </th>
                <th>
                  Instagram
                </th>
                <th>
                  Facebook
                </th>
                <th>
                  Youtube
                </th>
                <th>
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {organisations?.map((item: any) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{item?.name}</td>
                  <td className="px-6 py-4">{item?.link}</td>
                  <td className="px-6 py-4">{item?.postion}</td>
                  <td className="px-6 py-4" width={"150px"}><img src={item?.image} /></td>
                  <td className="px-6 py-4">{item?.category}</td>
                  <td className="px-6 py-4">{item?.phone}</td>
                  <td className="px-6 py-4">{item?.email}</td>
                  <td className="px-6 py-4">{item?.description}</td>
                  <td className="px-6 py-4">{item?.indexNo}</td>
                  <td className="px-6 py-4">{item?.instagram}</td>
                  <td className="px-6 py-4">{item?.facebook}</td>
                  <td className="px-6 py-4">{item?.youtube}</td>
                  <td className="px-6 py-4">{item?.address}</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-red-700 "
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Sidebar>

  );
}

export default GetOrganisation;

