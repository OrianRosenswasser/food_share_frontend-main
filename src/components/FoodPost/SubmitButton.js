import React from "react";

const SubmitButton = ({ onClick, children }) => {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default SubmitButton;
