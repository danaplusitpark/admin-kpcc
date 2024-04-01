"use client";
import SERVER_URL from "@/configure/SERVER_URL";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AllBlog() {
  const [category, setCategory] = useState("");
  
  const [blog, setBlog] = useState([]);
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
//   useEffect(() => {
//     axios.get((SERVER_URL + "/admin/get-bearers"),
//       {
//         headers: {
//           "x-access-token": localStorage.getItem("token")
//         }
//       }).then((res) => {
//         setBearer(res.data.bearers);
//       });
//   }, [state]);


  
const handleSubmit = () => {
    const token = localStorage.getItem("token");
  
    axios.get(`${SERVER_URL}/admin/get-blogs?category=${category}`,  {
      headers: {
        'x-access-token': token
      }
    }).then((res) => {
        setBlog(res.data.blogs);
      }).catch((err) => {
      console.log(err)
    })
  }
  
  const handleDelete = (id: string) => {
    axios
      .post(
        `${SERVER_URL}/admin/delete-blogs/${id}`,
        {},
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("blog deleted successfully");
          setBlog(blog.filter((item:any) => item._id !== id));
        }
      });
  };
  
  return (
    <Sidebar>
      <div>
        <h1 className="text-3xl font-bold mx-auto">All Blog</h1>

        <div className="max-w-sm mx-auto mt-14 ">
          
          {/* category field */}
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category
          </label>
          <input
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            id="category"
            value={category}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Category"
          />

          
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
                  Title
                </th>
                <th>
                  Link
                </th>
                <th>
                  Author
                </th>
                <th>
                  Image
                </th>
                <th>
                  Category
                </th>
                <th>
                  Date
                </th>
                <th>
                  Slug
                </th>
                <th>
                  Description
                </th>
                
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {blog?.map((item: any) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{item?.title}</td>
                  <td className="px-6 py-4">{item?.link}</td>
                  <td className="px-6 py-4">{item?.author}</td>
                  <td className="px-6 py-4" width={"150px"}><img src={item?.image} /></td>
                  <td className="px-6 py-4">{item?.category}</td>
                  <td className="px-6 py-4">{item?.date}</td>
                  <td className="px-6 py-4">{item?.slug}</td>
                  <td className="px-6 py-4">{item?.description}</td>
                  
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

export default AllBlog;

