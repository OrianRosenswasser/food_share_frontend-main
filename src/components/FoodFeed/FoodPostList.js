import React from "react";
import FoodPostItem from "./FoodPostItem";

const FoodPostList = ({ posts, loggedInUserId, onRefresh }) => {
  return (
    <div id="food-posts">
      {posts.map((post) => (
        <FoodPostItem
          key={post.id}
          post={post}
          loggedInUserId={loggedInUserId}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
};

export default FoodPostList;
