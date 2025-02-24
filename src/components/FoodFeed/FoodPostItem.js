import React from "react";
import PostActions from "./PostActions";

const FoodPostItem = ({ post, loggedInUserId, onRefresh }) => {
  return (
    <div className="food-post">
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      {post.photo ? (
        <img src={post.photo} alt="Food" className="food-image" />
      ) : (
        <p>No image available</p>
      )}
      <p className="expiration-date">
        Expiration Date: {new Date(post.expiration_date).toLocaleDateString()}
      </p>
      <p>
        Contact: <a href={`https://wa.me/${post.whatsapp_link}`}>WhatsApp</a>
      </p>
      <p>Collection Point: {post.collection_point}</p>
      <PostActions
        post={post}
        loggedInUserId={loggedInUserId}
        onRefresh={onRefresh}
      />
    </div>
  );
};

export default FoodPostItem;
