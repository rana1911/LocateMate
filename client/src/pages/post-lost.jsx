import React from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx"
import PostLostItem from "../components/post-lost-item.jsx";

const PostLostPage = () => {
    return (
      <>
        <Navbar/>
        <PostLostItem/>
        <Footer/>
      </>
    );
  };
  
  export default PostLostPage;