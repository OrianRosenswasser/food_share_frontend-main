// export default RequestsPage;
import React, {useState, useEffect} from 'react';
import {useAuth} from '../AuthContext';
import {useNavigate} from 'react-router-dom';
import apiService from '../services';
import RequestCard from './RequestCard'

const RequestsPage = () => {
    const [activeTab, setActiveTab] = useState('received');
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [madeRequests, setMadeRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {user, accessToken} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }
        loadRequests();
    }, [user, accessToken]);

    const loadRequests = async () => {
        try {
            const response = await apiService.getFoodRequests(accessToken);
            if (!Array.isArray(response)) {
                throw new Error('Expected array of requests from API');
            }

            const received = response.filter(req => req?.food_post?.posted_by?.id === user?.id);
            const made = response.filter(req => req?.requested_by?.id === user?.id);

            setReceivedRequests(received);
            setMadeRequests(made);
        } catch (error) {
            console.error("Error loading requests:", error);
            setError("Failed to load requests. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelRequest = async (requestId) => {
        if (window.confirm("Are you sure you want to cancel this request?")) {
            try {
                await apiService.deleteFoodRequest(requestId, accessToken);
                loadRequests();
            } catch (error) {
                console.error("Error canceling request:", error);
                setError("Failed to cancel request. Please try again later.");
            }
        }
    };

    if (loading) {
        return <div className="loading-message">Loading requests...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (!user) {
        return (
            <div className="no-user-message">
                <p>Please log in to view requests.</p>
                <button onClick={() => navigate('/login-page')}>Go to Login</button>
            </div>
        );
    }



    return (
        <div className="container">
            <h1 className="page-title">Food Requests</h1>
            <div className="tab-buttons">
                <button
                    className={`tab-button ${activeTab === 'received' ? 'active' : ''}`}
                    onClick={() => setActiveTab('received')}
                >
                    Received Requests ({receivedRequests.length})
                </button>
                <button
                    className={`tab-button ${activeTab === 'made' ? 'active' : ''}`}
                    onClick={() => setActiveTab('made')}
                >
                    My Requests ({madeRequests.length})
                </button>
            </div>
            <div className="request-list">
                {activeTab === 'received' ? (
                    receivedRequests.length === 0 ? (
                        <p className="no-requests-message">No requests received yet.</p>
                    ) : (
                        receivedRequests.map(request => (
                            <RequestCard
                                key={request.id}
                                request={request}
                                isMadeRequest={false}
                                onCancelRequest={handleCancelRequest}
                            />
                        ))
                    )
                ) : activeTab === 'made' ? (
                    madeRequests.length === 0 ? (
                        <p className="no-requests-message">You haven't made any requests yet.</p>
                    ) : (
                        madeRequests.map(request => (
                            <RequestCard
                                key={request.id}
                                request={request}
                                isMadeRequest={true}
                                onCancelRequest={handleCancelRequest}
                            />
                        ))
                    )
                ) : null} {}
            </div>
            {}

            <style jsx>{`
              .container {
                width: 80%;
                max-width: 800px;
                margin: 20px auto;
                padding: 20px;
              }

              .page-title {
                font-size: 2em;
                margin-bottom: 20px;
                text-align: center; /* Center the title */
              }

              .tab-buttons {
                display: flex;
                margin-bottom: 20px;
                border-bottom: 2px solid #ddd; /* Add a subtle bottom border */
              }

              .tab-button {
                flex: 1;
                padding: 10px 15px; /* Add some horizontal padding */
                border: none;
                background-color: #f8f8f8; /* Slightly darker background for inactive tabs */
                color: #555; /* Slightly darker text color for inactive tabs */
                cursor: pointer;
                border-bottom: 2px solid transparent;
                transition: background-color 0.3s, color 0.3s;
                text-align: center; /* Center the text within the button */
                font-weight: 500; /* Slightly bolder font */
              }

              .tab-button:hover {
                background-color: #eee;
              }

              .tab-button.active {
                background-color: #4CAF50;
                color: white;
                border-bottom-color: #4CAF50;
              }

              .food-post {
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                padding: 20px;
                margin-bottom: 20px;
                border: 1px solid #eee; /* Add a subtle border to the cards */
              }

              .whatsapp-link {
                color: #4CAF50;
                text-decoration: none;
              }

              .cancel-button {
                background-color: #dc3545;
                color: white;
                padding: 8px 16px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 10px;
              }

              .loading-message, .error-message, .no-user-message, .no-requests-message {
                text-align: center;
                margin-top: 20px;
                color: #777;
              }

              button {
                background-color: #4CAF50;
                color: white;
                padding: 8px 16px;
                border: none;
                border-radius: 5px;
                margin: 5px;
                cursor: pointer;
                transition: background-color 0.3s;
              }

              button:hover {
                background-color: #45a049;
              }
           .food-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 10px;
            margin: 10px 0;
          }

            `}</style>
        </div>
    );
};

export default RequestsPage;