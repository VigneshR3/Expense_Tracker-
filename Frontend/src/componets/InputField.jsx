import React from "react";

const InputField = ({ field, TextHandle, value }) => {
  const { name, type, list } = field;
   
  return (
    //Custom Input element
    <div className="form-group" style={{ margin: 10 }}>
      {name !== "Category" ? (
        <>
          <label
            htmlFor={name}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            {name}
          </label>
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={TextHandle}
            className="form-control"
            required
          />
        </>
      ) : (
        <>
          <label
            htmlFor={name}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            {name}
          </label>
          <select
            className="form-select"
            id={name}
            name={name}
            value={value}
            onChange={TextHandle}
            required
          >
            {list.map((item, i) => {
              return (
                <option key={i} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </>
      )}
    </div>
  );
};

export default InputField;
