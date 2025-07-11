import React, { useState } from "react";
import InputField from "../componets/InputField";
 

const Home = () => {
  const [isShow, setIsShow] = useState(true);
  const isShowHandle = () => {
    setIsShow(false);
  };
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
  });
  const HandleSubmit = ()=>{
    console.log("values",Expence)
  }
  const [TableData, setTableData] = useState([
    {
      name: "vicky",
      description: "hello",
      category: "food",
      data: "4/07/2025",
    },
    {
      name: "ranjith",
      description: "hello",
      category: "Travel",
      data: "4/07/2025",
    },
    {
      name: "tamil",
      description: "hello",
      category: "Shopping",
      data: "4/07/2025",
    },
  ]);
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
      <h5 style={{ display: "flex", justifyContent: "center" }}>
        Expense Tracker
      </h5>
      {isShow && (
        <button className="btn-custom" onClick={isShowHandle}>
          Add Expenses
        </button>
      )}
      {/* Form */}
      <center>
        {!isShow && (
          <div
            className="card bg-secondary"
            style={{ maxWidth: "350px", boxShadow: "2px 2px 5px " }}
          >
            <form>
              {FormFields.map((field, i) => {
                return (
                  <InputField key={i} field={field} TextHandle={TextHandle} />
                );
              })}
             <button className='btn-custom' onClick={HandleSubmit} style={{margin:5}}>Submit</button>
            </form>
          </div>
        )}
      </center>
      {/* table content */}
      <div>
        <table>
          <th>
            <tr>
              <td>Name</td>
              <td>Description</td>
              <td>Categories</td>
              <td>Date</td>
            </tr>
          </th>
          <tbody>
             {
                TableData && TableData.map( (item , i)=>{
                    return(
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.category}</td>
                            <td>{item.data}</td>
                        </tr>
                    )
                })
             }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
