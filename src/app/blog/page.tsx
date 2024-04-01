"use client";
import SERVER_URL from "@/configure/SERVER_URL";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
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
  useEffect(() => {
    axios.get((SERVER_URL + "/admin/get-blogs"),
      {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      }).then((res) => {
        setBlog(res.data.blogs);
      });
  }, [state]);
  
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
  

  const handleFileChange = (e: any) => {
    const file = e.target.files[0]
    setImage(file)
  }
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    formData.append("image", image);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("date", date);
    formData.append("slug", slug);
    
    formData.append("description", description);
    axios.post(`${SERVER_URL}/admin/add-blogs`, formData, {
      headers: {
        'x-access-token': localStorage.getItem("token")
      }
    }).then((res) => {
      if (res.status === 200 || res.status === 201) {
        setState(!state)
        toast.success("Blog added successfully")
        setTitle("")
        setLink("")
        setAuthor("")
        setImage("")
        setCategory("")
        setDate("")
        setSlug("")
        setDescription("")
        
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  
  return (
    <Sidebar>
      <div>
        <h1 className="text-3xl font-bold mx-auto">Add Blog</h1>

        <div className="max-w-sm mx-auto mt-14 ">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            value={title}
            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title"
          />

          {/* Link field */}
          <label
            htmlFor="link"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Link
          </label>
          <input
            onChange={(e) => setLink(e.target.value)}
            type="text"
            id="link"
            value={link}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Link"
          />

          {/* AUTHOR field */}
          <label
            htmlFor="author"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Author
          </label>
          <input
            onChange={(e) => setAuthor(e.target.value)}
            type="text"
            id="author"
            value={author}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Author"
          />

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

          {/* date field */}
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date
          </label>
          <input
            onChange={(e) => setDate(e.target.value)}
            type="date"
            id="date"
            value={date}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Date"
          />

          {/* slug field */}
          <label
            htmlFor="slug"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Slug
          </label>
          <input
            onChange={(e) => setSlug(e.target.value)}
            type="text"
            id="slug"
            value={slug}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Slug"
          />

          

          {/* Description field */}
          <label
            htmlFor="Description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            id="Description"
            value={description}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description"
          />
          
        </div>
        {/* image upload */}
        <div className="max-w-sm mx-auto my-5">
          <label className='mb-[10px] block text-base font-medium text-dark '>
            Upload Image
          </label>
          <input
            type='file'
            onChange={handleFileChange}

            className='w-full cursor-pointer rounded-md border border-stroke  file:dark:text-white  file:text-gray-500 dark:border-dark-3 text-dark-6 outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke dark:file:border-dark-3 file:bg-gray-200 dark:file:bg-gray-700 file:py-3 file:px-5 file:text-body-color dark:file:text-dark-6 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 '
          />
        </div>
        <div className="max-w-sm mx-auto my-5">
          <button
            className="bg-primary text-white w-full py-3 rounded-lg bg-blue-500"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
      {/* <div className="table-list-group my-20">
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
      </div> */}
    </Sidebar>

  );
}

export default AddBlog;

