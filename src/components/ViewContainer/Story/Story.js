import React, { Component } from "react";
import "./Story.less";
import moment from "moment";

export default class Story extends Component {
  render() {
    const { stories } = this.props;
    let storyJSX = stories.map(story => {
      console.log(story.time);
      return (
        <div className="story-container d-flex" key={story.internalId}>
          {/* Story number  */}
          <div className="story-number">{story.internalId}</div>

          {/* Story title, date and source */}
          <div className="story-title-wrapper">
            <div className="story-title">{story.title}</div>
            <div className="story-date-and-source">
              <p>posted {moment.unix(story.time).fromNow()}</p>
              <p>{story["url"] ? new URL(story.url).host.substring(4) : ""}</p>
            </div>
          </div>

          {/* Story comments */}
          <div className="story-comments">
            {story["comments"] ? story.comments.length : 0} comments
          </div>
        </div>
      );
    });
    return <div>{storyJSX}</div>;
  }
}
