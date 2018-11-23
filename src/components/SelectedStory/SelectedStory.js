import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SelectedStory.less";
import moment from "moment";

// -----------FRONT-END API-----------
import api from "../../api";

export default class SelectedStory extends Component {
  constructor() {
    super();
    this.state = {
      story: {},
      comments: []
    };
  }

  //Populating component state with Story data
  componentWillMount() {
    const storyId = this.props.match.params.id;

    // Extracting selected story from Stories, based on URL
    const story = this.props.stories.find(item => {
      return item.internalId == storyId;
    });

    this.setState({
      story
    });
  }

  // Fetching first 20 comments based on Story ID
  componentDidMount() {
    const { story } = this.state;

    if (story.comments) {
      story.comments.slice(0, 20).forEach(commentId => {
        api
          .fetchComments(
            `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
          )
          .then(res => {
            const comment = res.data;

            // Creating an object for each comment
            let commentObject = {};

            commentObject.user = comment.by;
            commentObject.apiId = comment.id;
            commentObject.text = comment.text;
            commentObject.time = comment.time;

            // Populating component state with Comments array
            this.setState({
              comments: [...this.state.comments, commentObject]
            });
          });
      });
    }
  }

  render() {
    const { story, comments } = this.state;

    let commentsJSX = comments.map(comment => {
      return (
        <div className="comment-container" key={comment.apiId}>
          <p className="comment-header">
            {comment.user}, {moment.unix(comment.time).fromNow()}
          </p>
          <p
            className="comment-body"
            dangerouslySetInnerHTML={{ __html: comment.text }}
          />
        </div>
      );
    });

    return (
      <div className="selected-story-wrapper">
        {/* Story header */}
        <section className="selected-story-header">
          <Link to="/">
            <div className="btn-custom">Return</div>
          </Link>
          <h2 onClick={() => window.open(story.url, "_blank")}>
            {story.title}
          </h2>
          <p
            className="story-website"
            onClick={() =>
              window.open(
                story["url"]
                  ? `https://${new URL(story.url).host.substring(4)}`
                  : "",
                "_blank"
              )
            }
          >
            {story["url"] ? new URL(story.url).host.substring(4) : ""}
          </p>
          <p className="story-details">
            by {story.user} {moment.unix(story.time).fromNow()} &nbsp;|&nbsp;{" "}
            {story["comments"] ? story.comments.length : 0} comments
          </p>
        </section>
        <hr className="hr-styled" />

        {/* Comments */}
        <section className="selected-story-comments-wrapper">
          {comments.length ? commentsJSX : "No comments here bro :("}
        </section>
      </div>
    );
  }
}
