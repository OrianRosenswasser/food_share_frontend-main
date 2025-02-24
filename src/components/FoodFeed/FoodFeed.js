import React, { useEffect, useState } from "react";
import axios from "axios";
import FoodPostList from "./FoodPostList";

const FoodFeed = () => {
  const [posts, setPosts] = useState([]);
  const loggedInUserId = 1; // Replace with actual user ID from context or props

  useEffect(() => {
    loadFoodPosts();
  }, []);

  const loadFoodPosts = async () => {
    try {
      const response = await axios.get("/food_feed/", {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error loading food posts:", error);
    }
  };

  return (
    <div>
      <h1>Food Feed</h1>
      <FoodPostList
        posts={posts}
        loggedInUserId={loggedInUserId}
        onRefresh={loadFoodPosts}
      />
    </div>
  );
};

export default FoodFeed;
