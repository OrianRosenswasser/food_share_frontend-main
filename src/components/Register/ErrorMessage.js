import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message" id="error-message">
      {message}
    </div>
  );
};

export default ErrorMessage;
