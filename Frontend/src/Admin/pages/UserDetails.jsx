import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { BaseApi } from "../../baseApi";

const UserDetails = () => {
  const { search } = useLocation(); // search is like '?6874b00c87b6bf1264a23611'
  const id = search.replace("?", "");
  console.log(typeof id);
  const [TableData, setTableData] = useState([]);
  const FetchOneUserDetail = () => {};
  useEffect(() => {
    axios
      .post(`${BaseApi}/expense/getexpense`, { params: id })
      .then((resp) => {
        console.log(resp);
        setTableData(resp.data.data);
      })
      .catch((e) => console.log(e));
  }, []);
  //   category
  // :
  // "Trip"
  // date
  // :
  // "2025-07-16T00:00:00.000Z"
  // description
  // :
  // "FrontEnd( React Framework & library)"
  // name
  // :
  // "vicky23444"
  // userId
  // :
  // "6874b00c87b6bf1264a23611"
  // __v
  // :
  // 0
  // _id
  // :
  // "687648bb3cfec9743d348045"
  return (
    <div>
      UserDetails
      {/* table content */}
      <div className="styled-table-container">
        <table className="styled-table">
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
          {TableData?.length === 0 && <h6 style={{display:"flex",justifyContent:'center',alignItems:"center"}}>Empty table</h6>}
    </div>
  );
};

export default UserDetails;
