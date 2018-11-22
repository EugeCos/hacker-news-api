import React, { Component } from "react";
import "./Story.less";

export default class Story extends Component {
  render() {
    const { stories } = this.props;
    let storyJSX = stories.map(story => {
      return (
        <div className="story-container d-flex" key={story.internalId}>
          {/* Story number  */}
          <div className="story-number">{story.internalId}</div>

          {/* Story title, date and source */}
          <div className="story-title-wrapper">
            <div className="story-title">{story.title}</div>
            <div className="story-date-and-source">
              <p>posted at {story.time}</p>
              <p>{new URL(story.url).host.substring(4)}</p>
            </div>
          </div>

          {/* Story comments */}
          <div className="story-comments">Comments</div>
        </div>
      );
    });
    return <div>{storyJSX}</div>;
  }
}
