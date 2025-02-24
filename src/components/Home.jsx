import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {}
      <video
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        autoPlay
        loop
        muted
      >
        <source src="/food_share.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '3em',
            marginBottom: '10px',
            textShadow: '2px 2px 4px #000000',
          }}
        >
          Welcome to Food Share!
        </h1>
        <p
          style={{
            fontSize: '1.5em',
            marginBottom: '20px',
            textShadow: '2px 2px 4px #000000',
          }}
        >
          🍽️ Join our community and connect with people through food sharing 🍽️
        </p>

        {}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button
            onClick={() => navigate('/login-page')}
            style={{
              backgroundColor: '#ff9800',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              fontSize: '1.2em',
              borderRadius: '5px',
              cursor: 'pointer',
              textShadow: '1px 1px 2px #000000',
            }}
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              fontSize: '1.2em',
              borderRadius: '5px',
              cursor: 'pointer',
              textShadow: '1px 1px 2px #000000',
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
