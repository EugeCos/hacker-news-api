import React, { Component } from "react";
import "./Navbar.less";

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <h1>
          HackerNews <span>light</span>
        </h1>
      </div>
    );
  }
}
