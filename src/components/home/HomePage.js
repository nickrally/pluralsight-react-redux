import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="jumbotron">
      <h1>Pluralsight Administration</h1>
      <p>React, Redux and React Router for web app</p>
      <Link to="about" className="btn btn-primary btn-lg">
        Learn more
      </Link>
    </div>
  );
};
export default HomePage;
