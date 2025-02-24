// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import apiService from '../services';
//
// const FoodPost = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     quantity: "",
//     expiration_date: "",
//     whatsapp_link: "",
//     collection_point: "",
//     photo: null,
//   });
//
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//
//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       photo: e.target.files[0],
//     });
//   };
//
//   const submitFoodPost = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//
//     const data = new FormData();
//     Object.keys(formData).forEach(key => {
//       if (formData[key] !== null) {
//         data.append(key, formData[key]);
//       }
//     });
//
//     try {
//       const accessToken = localStorage.getItem('access_token');
//       await apiService.createFoodPost(data, accessToken);
//       navigate('/food-feed');
//     } catch (error) {
//       setError(error.response?.data?.message || "Failed to create food post");
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="card-title text-center mb-4">Share Your Food 🍲</h2>
//               {error && (
//                 <div className="alert alert-danger">{error}</div>
//               )}
//               <form onSubmit={submitFoodPost}>
//                 <div className="mb-3">
//                   <label className="form-label">Title</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Description</label>
//                   <textarea
//                     className="form-control"
//                     name="description"
//                     rows="4"
//                     value={formData.description}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6 mb-3">
//                     <label className="form-label">Quantity</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       name="quantity"
//                       value={formData.quantity}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <label className="form-label">Expiration Date</label>
//                     <input
//                       type="datetime-local"
//                       className="form-control"
//                       name="expiration_date"
//                       value={formData.expiration_date}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">WhatsApp Number</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="whatsapp_link"
//                     value={formData.whatsapp_link}
//                     onChange={handleChange}
//                     placeholder="e.g., 1234567890"
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Collection Point</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="collection_point"
//                     value={formData.collection_point}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Photo</label>
//                   <input
//                     type="file"
//                     className="form-control"
//                     onChange={handleFileChange}
//                     accept="image/*"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="btn btn-success w-100"
//                   disabled={loading}
//                 >
//                   {loading ? 'Posting...' : 'Share Food 🎁'}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default FoodPost;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from '../services';
import {useAuth} from "../AuthContext";

const FoodPost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    expiration_date: "",
    whatsapp_link: "",
    collection_point: "",
    photo: null,
  });

  
  useEffect(() => {
    const loadPostData = async () => {
      if (postId) {
        setLoading(true);
        try {
          
          const post = await apiService.getFoodPost(postId, accessToken);

          
          const date = new Date(post.expiration_date);
          const formattedDate = date.toISOString().slice(0, 16);
          setFormData({
            title: post.title,
            description: post.description,
            quantity: post.quantity,
            expiration_date: formattedDate,
            whatsapp_link: post.whatsapp_link,
            collection_point: post.collection_point,
            photo: null,
          });
        } catch (error) {
          setError("Failed to load post data");
          console.error("Error loading post:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadPostData();
  }, [postId,accessToken]);
  // }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const submitFoodPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      // const accessToken = localStorage.getItem('access_token');

      if (postId) {
        
        await apiService.updateFoodPost(postId, data, accessToken);
      } else {
        
        await apiService.createFoodPost(data, accessToken);
      }
      navigate('/food-feed');
    } catch (error) {
      setError(error.response?.data?.message || `Failed to ${postId ? 'update' : 'create'} food post`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && postId) {
    return <div className="container mt-5">Loading post data...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                {postId ? 'Edit Food Post 📝' : 'Share Your Food 🍲'}
              </h2>
              {error && (
                <div className="alert alert-danger">{error}</div>
              )}
              <form onSubmit={submitFoodPost}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Expiration Date</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="expiration_date"
                      value={formData.expiration_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">WhatsApp Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="whatsapp_link"
                    value={formData.whatsapp_link}
                    onChange={handleChange}
                    placeholder="e.g., 1234567890"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Collection Point</label>
                  <input
                    type="text"
                    className="form-control"
                    name="collection_point"
                    value={formData.collection_point}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Photo</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  {postId && !formData.photo && (
                    <small className="text-muted">
                      Leave empty to keep the current photo
                    </small>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : postId ? 'Update Food Post 📝' : 'Share Food 🎁'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPost;
