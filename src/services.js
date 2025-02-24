import axios from 'axios';
//const API_BASE_URL = 'http://127.0.0.1:8000/api'
const API_BASE_URL = 'https://food-share-backend-main-1.onrender.com/api';

const apiService = {
    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login/`, {
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },


    register: async (formData) => {
        try {
            // const csrfToken = document.cookie
            //     .split('; ')
            //     .find(row => row.startsWith('csrftoken='))
            //     ?.split('=')[1];
            const response = await axios.post(`${API_BASE_URL}/register/`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-CSRFToken': csrfToken,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getFoodPosts: async (accessToken) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/food-feed/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },


    getFoodPost: async (postId, accessToken) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/food-posts/${postId}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },


    createFoodPost: async (data, accessToken) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/post-food/`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteFoodPost: async (postId, accessToken) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/food-posts/${postId}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    updateFoodPost: async (postId, data, accessToken) => {
        try {
            const response = await axios.patch(`${API_BASE_URL}/food-posts/${postId}/`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createFoodRequest: async (postId, accessToken) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/food-requests/`, {
                food_post: postId,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },


    getUserStats: async (accessToken) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/user-stats/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching user stats:', error);
            throw error;
        }
    },
    

    getFoodRequests: async (accessToken) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/food-requests/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const requests = response.data;
            if (!requests) return [];
            return Promise.all(requests.map(async (request) => {
                try {
                    const foodPostResponse = await axios.get(`${API_BASE_URL}/food-posts/${request.food_post}/`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    });
                    return { ...request, food_post: foodPostResponse.data };
                } catch (foodPostError) {
                    console.error(`Error fetching food post ${request.food_post}:`, foodPostError);
                    return { ...request, food_post: null };
                }
            }));
        } catch (error) {
            console.error("Error fetching requests:", error);
            throw error;
        }
    },
};

export default apiService;
