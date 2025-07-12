import React, { useEffect, useState } from "react";
import InputField from "../componets/InputField";
import axios from "axios";
import { BaseApi } from "../baseApi";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [isShow, setIsShow] = useState(true);
  const isShowHandle = () => {
    setIsShow(false);
  };
  const notify = (e) => toast(e);
  const FormFields = [
    { type: "text", name: "Name" },
    { type: "text", name: "Description" },
    { type: "text", name: "Category" },
    { type: "date", name: "Date" },
  ];
  const [Expence, setExpence] = useState({
    name: "",
    description: "",
    category: "",
    date: "",
    email: "vicky@gmail.com",
  });
  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log("values", Expence);
    await axios
      .post(`${BaseApi}/expense/create`, Expence)
      .then((resp) => {
        console.log("Form response", resp);
        notify(resp.data.message);
        FetchDate();
      })
      .catch((e) => {
        console.log("Form error", e);
      });
  };
  const UserEmail = { email: "vicky@gmail.com" };
  const [TableData, setTableData] = useState([]);
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
    console.log(e.target.name);
    const { name, value } = e.target;
    setExpence((state) => ({
      ...state,
      [name.toLowerCase()]: value,
    }));
  };

  return (
    <div>
      <ToastContainer />
      <h5 style={{ display: "flex", justifyContent: "center" }}>
        Expense Tracker
      </h5>
      {isShow && (
        <button
          className="btn-custom"
          style={{ margin: 5 }}
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
                return (
                  <InputField key={i} field={field} TextHandle={TextHandle} />
                );
              })}
              <button
                className="btn-custom"
                onClick={HandleSubmit}
                style={{ margin: 5 }}
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </center>
      {/* table content */}
      <div class="styled-table-container">
        <table class="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Categories</th>
              <th>Date</th>
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
