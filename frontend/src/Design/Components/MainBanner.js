import React from "react";

const MainBanner = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card p-5">
            <div className="card-body">Item 1</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">Item 1</div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">Item 2</div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">Item 3</div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">Item 4</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
