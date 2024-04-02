"use client";
import SERVER_URL from "@/configure/SERVER_URL";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AllBearers() {
  const [category, setCategory] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [bearers, setBearers] = useState([]);
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
      .then((res) => {
        axios.get((SERVER_URL + "/admin/get-bearers"),
        {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        }).then((res) => {
          setBearers(res.data.bearers);
          setCategory(res.data.category)
          
        });
       })
      .catch((err) => {
        router.push("/login");
        localStorage.removeItem("token");
      });
  }, [state]);
    // useEffect(() => {
    //   axios.get((SERVER_URL + "/admin/get-organizations"),
    //     {
    //       headers: {
    //         "x-access-token": localStorage.getItem("token")
    //       }
    //     }).then((res) => {
    //       setOrganisation(res.data.organizations);
          
    //     });
    // }, [state]);



    const handleSubmit = (e: any) => {
      e.preventDefault(); // Prevent the default form submission behavior
  
      const token = localStorage.getItem('token'); // Get the token from local storage
  
      // Make the API request
      axios
        .get(`${SERVER_URL}/admin/get-bearers?category=${category}`, {
          headers: {
            'x-access-token': token,
          },
        })
        .then((res) => {
          // Update state with the fetched data
          setBearers(res.data.bearers);
          setIsFormSubmitted(true); 
        })
        .catch((err) => {
          console.error('Error fetching bearers:', err);
        });
    };
  

  const handleDelete = (id: string) => {
    axios
      .post(
        `${SERVER_URL}/admin/delete-bearers/${id}`,
        {},
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Bearer deleted successfully");
          setBearers(bearers.filter((item: any) => item._id !== id));
        }
      });
  };

  return (
    <Sidebar>
      <div>
        <h1 className="text-3xl font-bold mx-auto">All Bearers</h1>

        <div className="max-w-sm mx-auto mt-14 ">

          {/* category field */}
          <div className="max-w-sm mx-auto">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Category
          </label>
          <select
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          
          >
            <option>Select an option</option>
            {bearers.map((category: any) => (
              <option key={category.id} value={category.category}>
                {category.category}
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
            {isFormSubmitted && (
            <tbody>
              {bearers?.map((item: any) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{item?.name}</td>
                  <td className="px-6 py-4">{item?.link}</td>
                  <td className="px-6 py-4">{item?.postion}</td>
                  <td className="px-1 py-1" width={"200px"}><img src={item?.image} /></td>
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
            )}
          </table>
        </div>
      </div>
    </Sidebar>

  );
}

export default AllBearers;

