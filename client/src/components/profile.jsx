import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./styles/profile.css";

const Profile = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [user, setUser] = useState(null);

    // Fetch user data from backend
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:3000/profile", {
                    method: "GET",
                    credentials: "include", // Important for session-based authentication
                });

                if (!response.ok) throw new Error("Failed to fetch user");

                const userData = await response.json();
                setUser(userData);

                // Prefill the form with user data
                setValue("username", userData.username);
                setValue("email", userData.email);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [setValue]); // Ensure setValue is a dependency

    // Handle form submission (Update user details)
    const onSubmit = async (data) => {
        try {
            const response = await fetch("http://localhost:3000/update-profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to update profile");

            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile. Please try again.");
        }
    };

    if (!user) return <p className="loading-text">Loading profile...</p>;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2 className="mb-4">Your Profile</h2>
                <div className="user-info">
                    <p><strong>Username:</strong> {user?.username || "N/A"}</p>
                    <p><strong>Email:</strong> {user?.email || "N/A"}</p>
                </div>
                <div className="profile-links">
                    <p><strong>My Listings:</strong></p>
                    <a href="/my-lost-items">My Lost Items</a> | 
                    <a href="/my-found-items"> My Found Items</a>
                </div>
            </div>
        </div>
    );
};

export default Profile;
