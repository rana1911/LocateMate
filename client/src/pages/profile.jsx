import React from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import Profile from "../components/profile.jsx";
import "../components/styles/profile.css"

const ProfilePage = () => {
    return (
        <>
            <Navbar /> 
            <Profile />
            <Footer /> 
        </>
    );
};

export default ProfilePage;
