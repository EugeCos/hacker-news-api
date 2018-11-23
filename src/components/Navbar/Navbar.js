import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.less";

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>
            HackerNews <span>light</span>
          </h1>
        </Link>
      </div>
    );
  }
}
