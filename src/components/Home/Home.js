import React from "react";
import VideoPlayer from "./VideoPlayer";

const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome to Food Share!</h1>
      <p>
        🍽️ Join our community and connect with people through food sharing 🍽️
      </p>
      <VideoPlayer src="/static/videos/food_share.mp4" width="640" height="360" />
    </div>
  );
};

export default Home;
