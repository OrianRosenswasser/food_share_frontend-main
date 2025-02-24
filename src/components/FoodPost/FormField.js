import React from "react";

const FormField = ({ type, name, placeholder, value, onChange, required, accept }) => {
  if (type === "textarea") {
    return (
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    );
  }
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      accept={accept}
    />
  );
};

export default FormField;
