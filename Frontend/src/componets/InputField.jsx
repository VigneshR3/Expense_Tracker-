import React from "react";

const InputField = ({ field, TextHandle }) => {
  const { name, type } = field;
  
  return (
    //Custom Input element
    <div className="form-group" style={{ margin: 10 }}>
      <label
        htmlFor={name}
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        {name}
      </label>
      <input type={type} id={name} name={name} onChange={TextHandle} className="form-control" />
    </div>
  );
};

export default InputField;
