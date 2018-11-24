import React from "react";
import "./Footer.less";

export default function Footer() {
  return (
    <div
      className="footer"
      onClick={() => window.open("https://eugeville.com", "_blank")}
    >
      <span>Eugene Costov&nbsp;</span>&copy; 2018
    </div>
  );
}
