import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Story.less";
import moment from "moment";

export default class Story extends Component {
  constructor() {
    super();
    this.state = {
      hoveredStory: ""
    };
  }

  handleHover = storyId => {
    this.setState({
      hoveredStory: storyId
    });
  };

  render() {
    const { stories } = this.props;
    let storyJSX = stories.map(story => {
      return (
        <Link
          to={`/story/${story.internalId}`}
          style={{ textDecoration: "none" }}
          key={story.internalId}
        >
          <div
            className="story-container d-flex"
            onMouseEnter={() => this.handleHover(story.internalId)}
            onMouseLeave={() => this.handleHover("")}
          >
            {/* Story number  */}
            <div
              className={`story-number ${
                this.state.hoveredStory === story.internalId ? "active" : ""
              }`}
            >
              {story.internalId}
            </div>

            {/* Story title, date and source */}
            <div className="story-title-wrapper">
              <div className="story-title">{story.title}</div>
              <div className="story-date-and-source">
                <p>posted {moment.unix(story.time).fromNow()}</p>
                <p>
                  {story["url"] ? new URL(story.url).host.substring(4) : ""}
                </p>
              </div>
            </div>

            {/* Story comments */}
            <div className="story-comments">
              {story["comments"] ? story.comments.length : 0} comments
            </div>
          </div>
        </Link>
      );
    });
    return <div>{storyJSX}</div>;
  }
}
