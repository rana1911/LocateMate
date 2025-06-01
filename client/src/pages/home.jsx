import React from "react";
import Navbar from "../components/navbar.jsx";
// import FlashMessages from "../partials/FlashMessages";
import HowItWorks from "../components/how-it-works.jsx";
import Footer from "../components/footer.jsx"
import LostFoundSection from "../components/info.jsx";

const HomePage = () => {
  return (
    <>
      <Navbar/>
      <LostFoundSection/>
      <HowItWorks/>
      <Footer/>
    </>
  );
};

export default HomePage;
