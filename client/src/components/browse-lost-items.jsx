import React, { useEffect, useState } from "react";
import "./styles/browse-lost-items.css"; // Import the CSS file

const BrowseLostItems = () => {
    const [lostItems, setLostItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/browse-lost-items", {
            method: "GET",
        }) // Replace with your API endpoint
            .then((res) => res.json())
            .then((data) => setLostItems(data))
            .catch((error) => console.error("Error fetching lost items:", error));
    }, []);
    
    return (
        <div className="bli-container py-5">
            <div className="row">
                {lostItems.length > 0 ? (
                    lostItems.map((item) => (
                        <div className="col-sm-12 col-md-4 col-lg-3 mb-4" key={item._id}>
                            <div className="bli-card shadow">
                                <img
                                    src={item.imageUrl || "/public/images/default-item.jpg"}
                                    className="bli-card-img-top"
                                    alt={item.itemName}
                                />
                                <div className="bli-card-body">
                                    <h5 className="bli-card-title">{item.itemName}</h5>
                                    <p className="bli-card-text">
                                        <strong>Lost At:</strong> {item.location}
                                    </p>
                                    <p className="bli-card-text">
                                        <strong>Date:</strong> {new Date(item.date).toDateString()}
                                    </p>
                                    <p className="bli-card-text"><strong>Description:</strong> {item.description}</p>
                                    <a href={`/browse-lost-items/${item._id}`} className="btn btn-primary">
                                        View Details
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p className="text-center text-muted">No lost items found. Be the first to report!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowseLostItems;