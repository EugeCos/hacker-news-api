import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./SelectedStory.less";
import moment from "moment";

// -----------FRONT-END API-----------
import api from "../../api";

// ----------REACT-CSS-TRANSITION-GROUP-----------
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

// ----------UTILITY FUNCITONS-----------
import { parseUrl } from "../../utils/utils";

export default class SelectedStory extends Component {
  constructor() {
    super();
    this.state = {
      story: {},
      comments: []
    };
  }

  //Populating component state with Story data
  componentDidMount() {
    const storyId = this.props.match.params.storyId;

    // If user navigated to story from Home page
    if (this.props.stories.length > 0) {
      // Extracting selected story from Stories, based on URL
      const story = this.props.stories.find(item => {
        return item.apiId === Number(storyId);
      });

      this.setState(
        {
          story
        },
        () => this.fetchComments()
      );
    }
    // If user refreshed the page or manually typed in the address in the URL
    else {
      api
        .fetchIndividualStory(
          `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
        )
        .then(res => {
          const story = res.data;

          // Creating an object for each story
          let storyObject = {};

          storyObject.apiId = story.id;
          storyObject.comments = story.kids;
          storyObject.time = story.time;
          storyObject.title = story.title;
          storyObject.url = story.url;
          storyObject.user = story.by;

          // Populating component state with selected story
          this.setState(
            {
              story: storyObject
            },
            () => this.fetchComments()
          );
        });
    }

    // Scroll to top on component render
    window.scrollTo(0, 0);
  }

  // Fetching first 20 comments based on Story ID
  fetchComments = () => {
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
          })
          .catch(err => console.log(err));
      });
    }
  };

  render() {
    const { story, comments } = this.state;

    // Transition group effects
    const transitionOptions = {
      transitionName: "fade-effect",
      transitionAppear: true,
      transitionAppearTimeout: 300,
      transitionEnterTimeout: 300,
      transitionLeaveTimeout: 300
    };

    let commentsJSX = comments.map(comment => {
      return (
        <ReactCSSTransitionGroup {...transitionOptions} key={comment.apiId}>
          <div className="comment-container">
            <p className="comment-header">
              {comment.user}, {moment.unix(comment.time).fromNow()}
            </p>
            <p
              className="comment-body"
              dangerouslySetInnerHTML={{ __html: comment.text }}
            />
          </div>
        </ReactCSSTransitionGroup>
      );
    });

    return (
      <div className="selected-story-wrapper">
        {/* Story header */}
        <section className="selected-story-header">
          {/* Only show link if screen width is > 640px */}
          <Link to="/">
            <div className="btn-custom btn-return-desktop">Return</div>
          </Link>
          <h2 onClick={() => window.open(story.url, "_blank")}>
            {story.title}
          </h2>
          <p
            className="story-website"
            onClick={() =>
              window.open(
                story["url"] ? `https://${parseUrl(story.url)}` : "",
                "_blank"
              )
            }
          >
            {story["url"] ? parseUrl(story.url) : ""}
          </p>
          <p className="story-details">
            by {story.user} {moment.unix(story.time).fromNow()} &nbsp;|&nbsp;{" "}
            {story["comments"] ? story.comments.length : 0} comments
          </p>

          {/* Only show link if screen width is < 640px */}
          <Link to="/">
            <div className="btn-custom btn-return-mobile">Return</div>
          </Link>
        </section>
        <hr className="hr-styled" />

        {/* Comments */}
        <section className="selected-story-comments-wrapper">
          {story.comments !== undefined
            ? commentsJSX
            : "No comments here bro :("}
        </section>
      </div>
    );
  }
}

SelectedStory.propTypes = {
  stories: PropTypes.array.isRequired
};
