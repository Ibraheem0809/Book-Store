import React, { useEffect, useState } from "react";
import { bookBaseUrl } from "../axiosInstance";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

const Home = () => {
  const [bookForm, setBookForm] = useState({
    BookName: "",
    BookTitle: "",
    AuthorName: "",
    SellingPrice: "",
    PublishDate: "",
    Id: "",
  });

  const [booklist, setbooklist] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");

  const getAllbookList = async () => {
    try {
      const { data } = await bookBaseUrl.get("booklists");
      setbooklist(data?.BookList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllbookList();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!isUpdating) {
        if (
          !bookForm?.BookName ||
          !bookForm?.BookTitle ||
          !bookForm?.AuthorName ||
          !bookForm.SellingPrice
        ) {
          alert("All fields are required!");
        }

        const { data } = await bookBaseUrl.post("/addbook", bookForm);
        if (data?.Success) {
          alert(data?.Message);
          setBookForm({
            BookName: "",
            BookTitle: "",
            AuthorName: "",
            SellingPrice: "",
            PublishDate: "",
            Id: "",
          });
        }
        getAllbookList();
      } else {
        const { data } = await bookBaseUrl.put("/updatebook", bookForm);
        if (data?.Success) {
          alert(data?.Message);
          setBookForm({
            BookName: "",
            BookTitle: "",
            AuthorName: "",
            SellingPrice: "",
            PublishDate: "",
            Id: "",
          });
          setIsUpdating(false);
        }
        getAllbookList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await bookBaseUrl.post("deletebook", {
        id: id,
      });
      if (data?.Success) {
        alert(data?.Message);
        getAllbookList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (data) => {
    setBookForm({
      BookName: data?.BookName,
      BookTitle: data?.BookTitle,
      AuthorName: data?.AuthorName,
      SellingPrice: data?.SellingPrice,
      PublishDate: data?.PublishDate,
      Id: data?._id,
    });
    setIsUpdating(true);
  };

  const handleSearch = async () => {
    try {
      const { data } = await bookBaseUrl.get(`/searchbook?query=${searchTerm}`);
      if (data?.Success) {
        setbooklist(data.BookList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center px-4 py-2 bg-white shadow-sm">
        {/* Quote */}
        <div className="text-sm italic text-gray-700">
          "There is no friend as loyal as a book"
        </div>

        {/* Search Input */}
        <div className="flex">
          <input
            type="text"
            placeholder="Find your book"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
          />
          <button
            className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md transition duration-200"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="w-full px-4 md:px-8 py-6 min-h-screen bg-gray-50">
        {/* Form Section */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {[
            { label: "Book Name", name: "BookName", type: "text" },
            { label: "Book Title", name: "BookTitle", type: "text" },
            { label: "Author Name", name: "AuthorName", type: "text" },
            { label: "Selling Price", name: "SellingPrice", type: "text" },
            { label: "Publish Date", name: "PublishDate", type: "date" },
          ].map((field, i) => (
            <div key={i} className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">{field.label}</label>
              <input
                type={field.type}
                placeholder={field.label}
                name={field.name}
                value={bookForm[field.name]}
                onChange={handleFormChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mb-8">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200"
            onClick={handleSubmit}
          >
            {isUpdating ? "UPDATE" : "SUBMIT"}
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto shadow-sm rounded-md">
          <table className="min-w-full text-sm bg-white divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-medium">
              <tr>
                {[
                  "Book Name",
                  "Book Title",
                  "Author Name",
                  "Selling Price",
                  "Publish Date",
                  "Action",
                ].map((heading, i) => (
                  <th key={i} className="px-4 py-3 text-left">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {booklist?.map((book, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-4 py-3">{book?.BookName}</td>
                  <td className="px-4 py-3">{book?.BookTitle}</td>
                  <td className="px-4 py-3">{book?.AuthorName}</td>
                  <td className="px-4 py-3">{book?.SellingPrice}</td>
                  <td className="px-4 py-3">{book?.PublishDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleUpdate(book)}
                        className="p-2 bg-green-100 text-green-600 hover:bg-green-200 rounded-md"
                      >
                        <FaPen />
                      </button>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-md"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
