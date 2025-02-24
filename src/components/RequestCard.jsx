import React from 'react';


const RequestCard = ({request, isMadeRequest, onCancelRequest}) => {
    if (!request || !request.food_post) {
        return (
            <div className="food-post">
                <p>Request data not available.</p>
            </div>
        );
    }

    const {food_post, requested_by} = request;
    console.log(request)
    const {
        title = 'No title',
        description = 'No description',
        collection_point = 'No collection point',
        whatsapp_link,
        posted_by,
        photo
    } = food_post;

    const posterName = posted_by?.firstname && posted_by?.lastname
        ? `${posted_by.firstname} ${posted_by.lastname}`
        : 'Unknown';

    const requesterName = requested_by?.firstname && requested_by?.lastname
        ? `${requested_by.firstname} ${requested_by.lastname}`
        : 'Unknown';

    const handleCancel = () => {
        if (onCancelRequest && request.id) {
            onCancelRequest(request.id);
        }
    };

    return (
        <div className="food-post">
              {photo && (
            <img src={photo} alt={title} className="food-image" />
        )}
            <h3>{title}</h3>
            <p>{description}</p>
            <p className="text-sm">
                {isMadeRequest ? `Posted by: ${posterName}` : `Requested by: ${requesterName}`}
            </p>
            <p className="text-sm">Collection point: {collection_point}</p>
            {whatsapp_link && (
                <p className="text-sm">
                    Contact: <a href={`https://wa.me/${whatsapp_link}`} className="whatsapp-link">WhatsApp</a>
                </p>
            )}
            {isMadeRequest && (
                <button onClick={handleCancel} className="cancel-button">
                    Cancel Request
                </button>
            )}
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
export default RequestCard;