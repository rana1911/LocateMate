import React from 'react';

const HowItWorks = () => {
  return (
    <>
      <section style={{ backgroundColor: 'blueviolet' }} className="text-black text-center py-3">
        <div className="container">
          <h1 style={{color : 'black'}} className="display-4 fw-bold mb-3">How It Works</h1>
          <p className="lead">Learn how LocateMate helps you find lost items or return found belongings with ease.</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4 text-white">Three Simple Steps</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card shadow border-0">
                <div style={{ backgroundColor: 'blueviolet' }} className="card-body rounded-2 shadow">
                  <i className="fas fa-edit fa-3x text-primary mb-3"></i>
                  <h4 className="fw-bold">Step 1: Post Details</h4>
                  <p>Submit a detailed post about the item you lost or found. Include important details like location, time, and description.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card shadow border-0">
                <div style={{ backgroundColor: 'blueviolet' }} className="card-body rounded-2 shadow">
                  <i className="fas fa-search fa-3x text-primary mb-3"></i>
                  <h4 className="fw-bold">Step 2: Browse Posts</h4>
                  <p>Explore lost and found listings. Use search filters to narrow down your options and locate relevant matches.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card shadow border-0">
                <div style={{ backgroundColor: 'blueviolet' }} className="card-body rounded-2 shadow">
                  <i className="fas fa-handshake fa-3x text-primary mb-3"></i>
                  <h4 className="fw-bold">Step 3: Connect</h4>
                  <p>Communicate securely through the platform to return the item or claim the item and help others in the process.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4 text-white">Ready to Get Started?</h2>
          <p className="lead text-white">Join our community today to help reunite items with their rightful owners.</p>
          <div>
            <a href="/post-lost" className="btn btn-outline-primary">Post a Lost Item</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
