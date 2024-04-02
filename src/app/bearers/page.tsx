"use client";
import SERVER_URL from "@/configure/SERVER_URL";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AddBearer() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [position, setPosition] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [youtube, setYoutube] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [indexNo, setIndexNo] = useState("");
  const [bearers, setBearer] = useState([]);
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
    axios.get((SERVER_URL + "/admin/get-bearers"),
      {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      }).then((res) => {
        setBearer(res.data.bearers);
      });
  }, [state]);

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
          setBearer(bearers.filter((item:any) => item._id !== id));
        }
      });
  };
  
  const handleFileChange = (e: any) => {
    const file = e.target.files[0]
    setImage(file)
  }
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("link", link);
    formData.append("image", image);
    formData.append("postion", position);
    formData.append("category", category);
    formData.append("phone", phone);
    formData.append("instagram", instagram);
    formData.append("facebook", facebook);
    formData.append("youtube", youtube);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("description", description);
    formData.append("indexNo", indexNo);

    axios.post(`${SERVER_URL}/admin/add-bearers`, formData, {
      headers: {
        'x-access-token': localStorage.getItem("token")
      }
    }).then((res) => {
      if (res.status === 200 || res.status === 201) {
        setState(!state)
        toast.success("Bearer added successfully")
        setName("")
        setLink("")
        setPosition("")
        setImage("")
        setCategory("")
        setPhone("")
        setInstagram("")
        setFacebook("")
        setYoutube("")
        setEmail("")
        setAddress("")
        setDescription("")
        setIndexNo("")
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  
  return (
    <Sidebar>
      <div>
        <h1 className="text-3xl font-bold mx-auto">Add Bearer</h1>

        <div className="max-w-sm mx-auto mt-14 ">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            value={name}
            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name"
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

          {/* Type field */}
          <label
            htmlFor="position"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Position
          </label>
          <input
            onChange={(e) => setPosition(e.target.value)}
            type="text"
            id="postion"
            value={position}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Position"
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

          {/* phone field */}
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone
          </label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            id="phone"
            value={phone}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Phone"
          />

          {/* Instagram field */}
          <label
            htmlFor="instagram"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Instagram
          </label>
          <input
            onChange={(e) => setInstagram(e.target.value)}
            type="text"
            id="instagram"
            value={instagram}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Instagram"
          />

          {/* Facebook field */}
          <label
            htmlFor="facebook"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Facebook
          </label>
          <input
            onChange={(e) => setFacebook(e.target.value)}
            type="text"
            id="facebook"
            value={facebook}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Facebook"
          />

          {/* Youtube field */}
          <label
            htmlFor="youtube"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Youtube
          </label>
          <input
            onChange={(e) => setYoutube(e.target.value)}
            type="text"
            id="youtube"
            value={youtube}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Youtube"
          />
          {/* email field */}
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            id="email"
            value={email}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
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
          {/* indexno field */}
          <label
            htmlFor="indexNo"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            IndexNo
          </label>
          <input
            onChange={(e) => setIndexNo(e.target.value)}
            type="text"
            id="indexNo"
            value={indexNo}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="IndexNo"
          />
          {/* address field */}
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Address
          </label>
          <textarea
            onChange={(e) => setAddress(e.target.value)}
            id="address"
            value={address}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Address"
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
              {bearers?.map((item: any) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{item?.name}</td>
                  <td className="px-6 py-4">{item?.link}</td>
                  <td className="px-6 py-4">{item?.postion}</td>
                  <td className="px-6 py-4" width={"200px"}><img src={item?.image} /></td>
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

export default AddBearer;

