import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Story.less";
import moment from "moment";

// ----------REACT-CSS-TRANSITION-GROUP-----------
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

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

    // Transition group effects
    const transitionOptions = {
      transitionName: "fade-effect",
      transitionAppear: true,
      transitionAppearTimeout: 300,
      transitionEnterTimeout: 300,
      transitionLeaveTimeout: 300
    };

    let storyJSX = stories.map(story => {
      return (
        <Link
          to={`/story/${story.internalId}`}
          style={{ textDecoration: "none" }}
          key={story.internalId}
        >
          <ReactCSSTransitionGroup {...transitionOptions}>
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
          </ReactCSSTransitionGroup>
        </Link>
      );
    });
    return <div>{storyJSX}</div>;
  }
}

Story.propTypes = {
  stories: PropTypes.array.isRequired
};
