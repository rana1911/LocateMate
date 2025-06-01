import React from 'react';
import "./styles/info.css"

const LostFoundSection = () => {
  return (
    <section 
      className="text-black text-center py-5 w-100" 
      style={{ backgroundColor: 'blueviolet', width: '100%', marginTop: "55px" }}
    >
      <div style={{ color : 'black'}} className="container-fluid">
        <h1  className="display-4 fw-bold mb-3">Lost Something? Found Something?</h1>
        <p className="lead mb-4">
          LocateMate helps you reunite with your belongings. Join the community and make a difference!
        </p>
        <div>
          <a href="/post-lost" className="btn btn-dark text-white me-3">Post a Lost Item</a>
          <a href="/post-found" className="btn btn-dark text-white ">Report a Found Item</a>
        </div>
      </div>
    </section>
  );
};

export default LostFoundSection;
