import React from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx"
import ItemDetails from "../components/item-details.jsx";

const ItemDetailsPage = () => {
  return (
    <>
      <Navbar/>
      <ItemDetails/>
      <Footer/>
    </>
  );
};

export default ItemDetailsPage;
