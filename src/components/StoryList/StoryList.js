import React, { Component, Fragment } from "react";
import "./StoryList.less";
import moment from "moment";

// ------------COMPONENTS------------
import Story from "./Story/Story";
import ButtonsContainer from "./ButtonsContainer/ButtonsContainer";

// -------------MATERIAL UI--------------
import CircularProgress from "material-ui/CircularProgress";

export default class StoryList extends Component {
  render() {
    const { stories, pageNumber, loading, navigateToAnotherPage } = this.props;

    return (
      <Fragment>
        <div className="d-flex storylist-header">
          <h3>Top stories for {moment().format("LL")}</h3>
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
