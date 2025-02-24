import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NotFoundPage = () => {
  return (
    <div>
      <main className="container mt-5">
        <h1>Page Not Found</h1>
      </main>

      <style jsx>{`
        body {
          background-color: #ffebf2;
          font-family: "Comic Sans MS", cursive, sans-serif;
        }
        .navbar-brand {
          font-size: 1.5rem;
          color: #ff6f61 !important;
        }
        .container {
          max-width: 900px;
        }
        .nav-link:hover {
          background-color: #ffccd5;
          color: #ff6f61 !important;
          border-radius: 5px;
          padding: 5px 10px;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
