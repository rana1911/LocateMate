import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import BrowseLostItems from "../components/browse-lost-items";

const LostItemsPage = () => {
    return (
        <>
            <Navbar/>
            <BrowseLostItems/>
            <Footer/>
        </>
    );
};

export default LostItemsPage;