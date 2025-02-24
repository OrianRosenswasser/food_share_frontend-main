import React from "react";
import axios from "axios";

const PostActions = ({ post, loggedInUserId, onRefresh }) => {
  const handleRequest = () => {
    window.location.href = `/request_food/${post.id}/`;
  };

  const handleEdit = () => {
    window.location.href = `/edit_food/${post.id}/`;
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/food_feed/${post.id}/`);
      if (response.status === 204) {
        alert("Post deleted successfully!");
        onRefresh();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      {post.posted_by === loggedInUserId && (
        <>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
      <button onClick={handleRequest}>Request</button>
    </div>
  );
};

export default PostActions;
