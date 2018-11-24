import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "./StoryList.less";
import moment from "moment";

// ------------COMPONENTS------------
import Story from "./Story/Story";
import ButtonsContainer from "./ButtonsContainer/ButtonsContainer";

// -------------MATERIAL UI--------------
import CircularProgress from "material-ui/CircularProgress";

export default class StoryList extends Component {
  componentDidMount() {
    // Scroll to top on component render
    window.scrollTo(0, 0);
  }

  render() {
    const { stories, pageNumber, loading, navigateToAnotherPage } = this.props;

    return (
      <Fragment>
        <div className="d-flex storylist-header">
          <h3>Top 50 stories for {moment().format("LL")}</h3>
          <div className="btn-container d-flex">
            <ButtonsContainer
              pageNumber={pageNumber}
              navigateToAnotherPage={navigateToAnotherPage}
            />
          </div>
        </div>

        {/* If waiting for API response, display Spinner */}
        {loading ? (
          <div className="loading-container d-flex">
            <CircularProgress size={60} thickness={5} color={"#f05f57"} />
          </div>
        ) : (
          <Story stories={stories} />
        )}
      </Fragment>
    );
  }
}

StoryList.propTypes = {
  stories: PropTypes.array.isRequired,
  navigateToAnotherPage: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired
};
