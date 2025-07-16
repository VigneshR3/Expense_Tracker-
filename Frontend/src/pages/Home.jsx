import React, { useContext, useEffect, useState } from "react";
import InputField from "../componets/InputField";
import axios from "axios";
import { BaseApi } from "../baseApi";
import { MdOutlineEditCalendar } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";

import "../../node_modules/react-datepicker/dist/react-datepicker.css";
import Mycontext from "../Mycontext";

const Home = () => {
  const User = useContext(Mycontext);
  const [isShow, setIsShow] = useState(true);
  const [CategoryList, setCategoryList] = useState([]);

  const isShowHandle = () => {
    setIsShow(false);
  };
  const notify = (e) => toast(e);
  const FormFields = [
    { type: "text", name: "Name" },
    { type: "text", name: "Description" },
    {
      type: "text",
      name: "Category",
      list: ["Empty", "Food", "Trip", "Shopping", "Bills", "Other"],
    },
    { type: "date", name: "Date" },
  ];
  const [Expense, setExpense] = useState({
    name: "",
    description: "",
    category: "",
    date: "",
  });

  const HandleSubmit = async (e) => {
    const { email, ...formFields } = Expense;
    const isEmpty = Object.values(formFields).every((value) => value === "");

    if (isEmpty) {
      toast.error("please fill the fields");
      return;
    }
    e.preventDefault();
    if (isEdit) {
      await axios
        .patch(`${BaseApi}/expense/update`, Expense)
        .then((resp) => {
          console.log("update respone", resp);
          FetchDate();
          notify(resp.data.message);
        })
        .catch((e) => {
          console.log("error UPdate", e);
          notify(e.response.data.message);
        });
    } else {
      await axios
        .post(`${BaseApi}/expense/create`, Expense)
        .then((resp) => {
          console.log("Form response", resp);
          notify(resp.data.message);
          FetchDate();
          setExpense({
            name: "",
            description: "",
            category: "",
            date: "",
            email: "vicky@gmail.com",
            id: "",
          });
        })
        .catch((e) => {
          console.log("Form error", e);
          notify(e.response.data.message);
        });
    }
  };
  const UserEmail = { email: "vicky@gmail.com" };
  const [TableData, setTableData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const FetchDate = () => {
    axios
      .post(`${BaseApi}/expense/getdata`, UserEmail)
      .then((resp) => {
        console.log("response", resp);
        setTableData(resp.data.data);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  useEffect(() => {
    FetchDate();
  }, []);
  const TextHandle = (e) => {
    const { name, value } = e.target;
    setExpense((state) => ({
      ...state,
      [name.toLowerCase()]: value,
    }));
  };
  //Cancel
  const handleCancel = (e) => {
    e.preventDefault();
    setIsShow(true);
    setExpense({
      name: "",
      description: "",
      category: "",
      date: "",

      id: "",
    });
  };
  // List Editing
  const HandleEdit = (List) => {
    setIsEdit(true);
    setIsShow(false);
    console.log("LIST", List);
    setExpense({
      name: List.name,
      description: List.description,
      category: List.category,
      date: List.date,

      id: List._id,
    });
  };
  // Delete one Expense
  const HandleDelete = async (e) => {
    console.log(e._id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your expense has been deleted.",
          icon: "success",
        });
        await axios
          .get(`${BaseApi}/expense/delete?id=${e._id}`)
          .then((resp) => {
            console.log("respone Delete", resp);
            FetchDate();
          })
          .catch((e) => {
            console.log("Error", e);
          });
      }
    });
  };
  // category list && filter
  const GetCategoryList = () => {
    axios
      .get(`${BaseApi}/expense/getlist`, { params: User })
      .then((res) => {
        console.log(res);
        setCategoryList(res.data.list);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    GetCategoryList();
  }, []);
  const [List, setList] = useState({
    category: [],
    Date: { startDate: "", EndDate: "" },
    user:User.id,
  });
  console.log("list", List);
  const HandleFilter = (e) => {
    const { value, checked } = e.target;
 
    if (checked) {
      setList((state) => ({ ...state, category: [...state.category, value] }));
    } else {
      setList((state) => ({
        ...state,
        category: state.category?.filter((item) => item !== value),
      }));
    }
  };
  const FetchFillterExpense = () => {
    axios
      .post(`${BaseApi}/expense/filter`, List)
      .then((resp) => {
        console.log("filter", resp);
        setTableData(resp.data.data)
      })
      .catch((e) => {
        console.log(e, "Error Filter");
      });
  };
  useEffect(()=>{FetchFillterExpense()},[List])

  return (
    <div>
      <ToastContainer />
      <h5 style={{ display: "flex", justifyContent: "center" }}>
        Expense Tracker
      </h5>
      {isShow && (
        <button
          className="btn-custom"
          style={{ margin: 5, width: 200 }}
          onClick={isShowHandle}
        >
          Add Expenses
        </button>
      )}
      {/* Form */}
      <center>
        {!isShow && (
          <div
            className="card bg-secondary"
            style={{ maxWidth: "350px", boxShadow: "2px 2px 5px ", margin: 5 }}
          >
            <form>
              {FormFields.map((field, i) => {
                const value = Expense[field.name.toLowerCase()];
                return (
                  <InputField
                    key={i}
                    field={field}
                    TextHandle={TextHandle}
                    value={value}
                  />
                );
              })}

              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <button
                  className="btn-custom"
                  onClick={HandleSubmit}
                  style={{ margin: 5 }}
                >
                  {isEdit ? "Update" : "Submit"}
                </button>
                <button
                  className="btn-custom "
                  style={{
                    backgroundColor: "#fff",
                    color: "#fd610d",
                    margin: 5,
                  }}
                  onClick={handleCancel}
                >
                  {" "}
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </center>
      {/* Filter content */}
      {User.isPremium == true && 
      <div>
        <div
          style={{
            maxWidth: 250,
            border: "2px solid red",
            borderRadius: "12px",
            margin: 2,
            padding: 5,
          }}
        >
          <h5>Filter</h5>
          <p>Category</p>
          {CategoryList.map((item, i) => {
            const itemId = `category-${i}`; // Unique ID for accessibility

            return (
              <div key={itemId}>
                <input
                  type="checkbox"
                  id={itemId}
                  style={{ margin: 2 }}
                  name="category"
                  value={item}
                  onChange={HandleFilter}
                  checked={List.category.includes(item)} // Controlled input
                />
                <label htmlFor={itemId}>{item}</label>
              </div>
            );
          })}

          <div className="form-group">
            <label>Date Range</label>
            <DatePicker
              selectsRange
              startDate={List.Date.startDate}
              endDate={List.Date.EndDate}
              onChange={(dates) => {
                const [start, end] = dates;

                setList((prev) => ({
                  ...prev,
                  Date: {
                    startDate: start,
                    EndDate: end,
                  },
                }));
              }}
              dateFormat="dd/MM/yyyy"
              isClearable
            />
          </div>
        </div>
      </div>
      }
      {/* table content */}
      <div className="styled-table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Categories</th>
              <th>Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {TableData &&
              TableData.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.category}</td>
                    <td>{item.date}</td>
                    <td>
                      <MdOutlineEditCalendar
                        size={20}
                        tabIndex={0}
                        style={{ outline: "none" }}
                        onClick={() => {
                          HandleEdit(item);
                        }}
                      />
                    </td>
                    <td>
                      <MdOutlineDeleteOutline
                        onClick={() => HandleDelete(item)}
                        size={20}
                        color="red"
                        style={{ outline: "none" }}
                        tabIndex={0}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
