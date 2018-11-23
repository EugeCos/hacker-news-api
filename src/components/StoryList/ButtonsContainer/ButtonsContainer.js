import React, { Component, Fragment } from "react";
import "./ButtonsContainer.less";

export default class ButtonsContainer extends Component {
  render() {
    const { pageNumber, navigateToAnotherPage } = this.props;

    switch (pageNumber) {
      case 1:
        return (
          <div
            className="btn-custom"
            onClick={() => navigateToAnotherPage("next")}
          >
            Next 10 stories
          </div>
        );
      case 5:
        return (
          <div
            className="btn-custom"
            onClick={() => navigateToAnotherPage("previous")}
          >
            Previous 10 stories
          </div>
        );
      default:
        return (
          <Fragment>
            <div
              className="btn-custom"
              onClick={() => navigateToAnotherPage("previous")}
            >
              Previous 10 stories
            </div>
            <div
              className="btn-custom"
              onClick={() => navigateToAnotherPage("next")}
            >
              Next 10 stories
            </div>
          </Fragment>
        );
    }
  }
}
