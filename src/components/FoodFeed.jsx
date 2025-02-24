// import React, { useEffect, useState } from "react";
// import axios from "axios";
//
// const FoodFeed = () => {
//   const [posts, setPosts] = useState([]);
//   const loggedInUserId = 1; // Replace with actual user ID from context or props
//
//   useEffect(() => {
//     loadFoodPosts();
//   }, []);
//
//   const loadFoodPosts = async () => {
//     try {
//       const response = await axios.get("/food_feed/", {
//         headers: { "X-Requested-With": "XMLHttpRequest" },
//       });
//       setPosts(response.data);
//     } catch (error) {
//       console.error("Error loading food posts:", error);
//     }
//   };
//
//   const handleRequest = (postId) => {
//     window.location.href = `/request_food/${postId}/`;
//   };
//
//   const handleEdit = (postId) => {
//     window.location.href = `/edit_food/${postId}/`;
//   };
//
//   const handleDelete = async (postId) => {
//     try {
//       const response = await axios.delete(`/api/food_feed/${postId}/`);
//       if (response.status === 204) {
//         alert("Post deleted successfully!");
//         loadFoodPosts();
//       }
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };

import React, { useEffect, useState, useCallback } from "react";
import apiService from '../services';
import config from '../config';
import { useNavigate } from "react-router-dom";
import {useAuth} from "../AuthContext";

const FoodFeed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, accessToken } = useAuth();

  const loadFoodPosts = useCallback(async () => {
  setLoading(true);
  setError(null);
  try {
    const data = await apiService.getFoodPosts(accessToken);
    console.log(data);
    setPosts(data);
  } catch (error) {
    console.error("Error loading food posts:", error);
    setError("Failed to load food posts. Please try again later.");
  } finally {
    setLoading(false);
  }
}, [accessToken]);



  useEffect(() => {
     if (!user) {
         setLoading(false);
      return; }
     else {
       loadFoodPosts();
     }
  }, [user, loadFoodPosts]);

  // const loadFoodPosts = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const data = await apiService.getFoodPosts(accessToken); // Use the service
  //     console.log(data)
  //     setPosts(data);
  //   } catch (error) {
  //     console.error("Error loading food posts:", error);
  //     setError("Failed to load food posts. Please try again later.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleRequest = async (postId) => {
  try {
    await apiService.createFoodRequest(postId, accessToken);
    alert("Food request sent successfully!");
  } catch (error) {
    console.error("Error requesting food:", error);
    setError("Failed to send food request.");
  }
};

const handleEdit = (postId) => {
  // navigate(`/edit-food/${postId}`);
  // window.location.href = `/food-post/${postId}`;
    navigate(`/food-post/${postId}`);

};

const handleDelete = async (postId) => {
  if (window.confirm("Are you sure you want to delete this post?")) {
    try {
      await apiService.deleteFoodPost(postId, accessToken);
      loadFoodPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete the post.");
    }
  }
};

  if (loading) {
    return <div>Loading food posts...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>You need to log in to access this page.</p>
        <button
          onClick={() => navigate('/login-page')}
          style={{
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            padding: "10px 20px",
            fontSize: "1em",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Go to Login
        </button>
      </div>
    );
  }


  return (
    <div>
      <h1>Food Feed</h1>
      <div id="food-posts">
        {posts.map((post) => (
          <div key={post.id} className="food-post">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            {post.photo ? (
              // <img src={post.photo} alt="Food" className="food-image" />
             <  img  src={`${config.API_URL}${post.photo}`} alt={post.title || 'Food'}  className="food-image" />
            ) : (
              <p>No image available</p>
            )}
            <p className="expiration-date">
              Expiration Date:{" "}
              {new Date(post.expiration_date).toLocaleDateString()}
            </p>
            <p>
              Contact:{" "}
              <a href={`https://wa.me/${post.whatsapp_link}`}>WhatsApp</a>
            </p>
            <p>Collection Point: {post.collection_point}</p>
            {user && user.id === post.posted_by.id  && (
              <>
                <button onClick={() => handleEdit(post.id)}>Edit</button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </>
            )}
            {user && user.id !== post.posted_by.id &&(
            <button onClick={() => handleRequest(post.id)}>Request</button> )}
          </div>
        ))}
      </div>

      <style>
        {`
          #food-posts {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-top: 20px;
          }

          .food-post {
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 80%;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
            transition: transform 0.3s ease;
          }

          .food-post:hover {
            transform: scale(1.03);
          }

          .food-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 10px;
            margin: 10px 0;
          }

          .expiration-date {
            font-size: 14px;
            color: #777;
            margin-bottom: 10px;
          }

          a {
            color: #4CAF50;
            text-decoration: none;
          }

          a:hover {
            text-decoration: underline;
          }

          h3 {
            font-size: 24px;
            margin-bottom: 10px;
          }

          p {
            font-size: 16px;
            color: #333;
            line-height: 1.5;
            margin-bottom: 10px;
          }

          button {
            background-color: #4CAF50;
            color: white;
            padding: 8px 16px;
            border: none;
            border-radius: 5px;
            margin: 5px;
            cursor: pointer;
          }

          button:hover {
            background-color: #45a049;
          }
        `}
      </style>
    </div>
  );
};

export default FoodFeed;
