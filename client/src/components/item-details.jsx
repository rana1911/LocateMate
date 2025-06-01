import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Make sure you import useParams
import "./styles/item-details.css";

const ItemDetails = () => {
  const { itemId } = useParams(); // Get item ID from URL
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/browse-lost-items/${itemId}`, {method: "GET"});
        const data = await response.json();
        setItemData(data.item); // Store the fetched item in state
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching item details:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchItemDetails();
  }, [itemId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!itemData) {
    return <p>Item not found.</p>;
  }

  return (
    <div className="item-details-body">
      <div className="item-details-container">
        <div className="item-details-card">
          {/* Item Image */}
          <img
            src={itemData.imageUrl || "/public/images/default-item.jpg"}
            alt={itemData.itemName}
          />

          {/* Item Details */}
          <div className="card-body">
            <h3 className="card-title">{itemData.itemName}</h3>
            <p className="card-text">
              <strong>Lost At:</strong> {itemData.location}
            </p>
            <p className="card-text">
              <strong>Date Lost:</strong> {new Date(itemData.date).toDateString()}
            </p>
            <p className="card-text">
              <strong>Description:</strong>
              <br />
              {itemData.description}
            </p>
            <hr />
            {/* Contact Information */}
            <h5 className="item-details-contact-heading">Contact Information</h5>
            <p>
              <strong>Name:</strong> {itemData.contactName || "Anonymous"}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${itemData.contactEmail}`}>{itemData.contactEmail}</a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a href={`tel:${itemData.contactPhone}`}>{itemData.contactPhone}</a>
            </p>
          </div>
        </div>
      </div>
      <footer className="item-details-footer">
        <p>&copy; 2025 LocateMate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ItemDetails;
