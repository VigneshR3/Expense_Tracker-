import React from "react";

const Avatar = ({ initials , size = 40 }) => {
  initials = initials?.charAt(0)
   
  return (
    <div
      style={{
        border: "2px solid white",
        width: size,
        height: size,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ccc",
        fontSize: size / 2,
        color: "#000",
        
      }}
    >
      <span>{initials}</span>
    </div>
  );
};

export default Avatar;
