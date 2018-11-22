import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.less";
import "./css/global.less";
import "./css/export.less";

// -----------FRONT-END API-----------
import api from "./api";

// -------------COMPONENTS-------------
import Navbar from "./components/Navbar/Navbar";
import ViewContainer from "./components/ViewContainer/ViewContainer";
import Footer from "./components/Footer/Footer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      storiesIdArray: [],
      stories: [],
      pageNumber: 1,
      loading: false
    };
  }

  getTopStories = () => {
    api.fetchTopStories().then(res =>
      // Fetching an array of top story id's and pushing 50 of them to component state (for potential future use)
      this.setState(
        {
          storiesIdArray: res.data.slice(0, 50),
          loading: true
        },
        () => this.getIndividualStories()
      )
    );
  };

  getIndividualStories = () => {
    const { pageNumber } = this.state;
    let storyInternalId = 1,
      sliceStart = 0,
      sliceEnd = 10;

    // Depending on page number, updating stories' ID's and start / end points of Array slice
    if (pageNumber === 2) {
      storyInternalId = 11;
      sliceStart = 10;
      sliceEnd = 20;
    } else if (pageNumber === 3) {
      storyInternalId = 21;
      sliceStart = 20;
      sliceEnd = 30;
    } else if (pageNumber === 4) {
      storyInternalId = 31;
      sliceStart = 30;
      sliceEnd = 40;
    } else if (pageNumber === 5) {
      storyInternalId = 41;
      sliceStart = 40;
      sliceEnd = 50;
    }

    // Fetching individual stories based on id's from this.state.storiesIdArray
    this.state.storiesIdArray
      // Looping through the array and fetching only first 10 stories for page 1
      .slice(sliceStart, sliceEnd)
      .forEach(storyId =>
        api
          .fetchIndividualStory(
            `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
          )
          .then(res => {
            const story = res.data;

            // Creating an object for each story
            let storyObject = {};

            storyObject.apiId = story.id;
            storyObject.internalId = storyInternalId++;
            storyObject.comments = story.kids;
            storyObject.time = story.time;
            storyObject.title = story.title;
            storyObject.url = story.url;

            // Populating component state with Stories array
            this.setState({
              stories: [...this.state.stories, storyObject],
              loading: false
            });
          })
      );
  };

  navigateToAnotherPage = option => {
    // Option represent a Next or Previous page
    switch (option) {
      case "previous":
        this.setState(
          {
            pageNumber: this.state.pageNumber - 1,
            stories: [],
            loading: true
          },
          () => this.getIndividualStories()
        );
        break;
      case "next":
        this.setState(
          {
            pageNumber: this.state.pageNumber + 1,
            stories: [],
            loading: true
          },
          () => this.getIndividualStories()
        );
        break;
      default:
        return;
    }
  };

  componentWillMount() {
    this.getTopStories();
  }

  render() {
    const { stories, pageNumber, loading } = this.state;
    return (
      <div className="App">
        <Navbar />
        <ViewContainer
          stories={stories}
          navigateToAnotherPage={this.navigateToAnotherPage}
          pageNumber={pageNumber}
          loading={loading}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
