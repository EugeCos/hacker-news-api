import React, { Component } from "react";
import "./ViewContainer.less";

// ------------COMPONENTS------------
import Story from "./Story/Story";

export default class ViewContainer extends Component {
  render() {
    const { stories } = this.props;
    const utc = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "/");
    return (
      <div className="view-container">
        <h3>Top stories for {utc}</h3>
        <Story stories={stories} />
        <div className="btn-custom">Next 10 stories</div>
      </div>
    );
  }
}
