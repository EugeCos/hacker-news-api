import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.less";
import "./css/global.less";
import "./css/export.less";

// -------------COMPONENTS-------------
import Navbar from "./components/Navbar/Navbar";
import ViewContainer from "./components/ViewContainer/ViewContainer";
import Footer from "./components/Footer/Footer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      stories: [
        {
          apiId: 18500075,
          internalId: 1,
          time: 1175714200,
          title: "My YC app: Dropbox - Throw away your USB drive",
          url: "http://www.getdropbox.com/u/2/screencast.html",
          comments: []
        },
        {
          apiId: 18500075,
          internalId: 2,
          time: 1175714200,
          title:
            "Silent and Simple Ion Engine Powers a Plane with No Moving Parts",
          url:
            "https://www.scientificamerican.com/article/silent-and-simple-ion-engine-powers-a-plane-with-no-moving-parts/",
          comments: []
        },
        {
          apiId: 18500075,
          internalId: 3,
          time: 1175714200,
          title:
            "Amazon admits it exposed customer email addresses, but refuses to give details",
          url:
            "https://techcrunch.com/2018/11/21/amazon-admits-it-exposed-customer-email-addresses-doubles-down-on-secrecy/",
          comments: []
        },
        {
          apiId: 18500075,
          internalId: 4,
          time: 1175714200,
          title: "Slow Software",
          url: "https://www.inkandswitch.com/slow-software.html",
          comments: []
        },
        {
          apiId: 18500075,
          internalId: 5,
          time: 1175714200,
          title: "London, city of lost hospitals",
          url: "https://wellcomecollection.org/articles/W6jAXxIAACAAmykv",
          comments: []
        },
        {
          apiId: 18500075,
          internalId: 6,
          time: 1175714200,
          title: "My YC app: Dropbox - Throw away your USB drive",
          url: "http://www.getdropbox.com/u/2/screencast.html",
          comments: []
        },
        {
          apiId: 18500075,
          internalId: 7,
          time: 1175714200,
          title:
            "Silent and Simple Ion Engine Powers a Plane with No Moving Parts",
          url:
            "https://www.scientificamerican.com/article/silent-and-simple-ion-engine-powers-a-plane-with-no-moving-parts/",
          comments: []
        },
        {
          apiId: 18500075,
          internalId: 8,
          time: 1175714200,
          title:
            "Amazon admits it exposed customer email addresses, but refuses to give details",
          url:
            "https://techcrunch.com/2018/11/21/amazon-admits-it-exposed-customer-email-addresses-doubles-down-on-secrecy/",
          comments: []
        },
        {
          apiId: 18500075,
          internalId: 9,
          time: 1175714200,
          title: "Slow Software",
          url: "https://www.inkandswitch.com/slow-software.html",
          comments: []
        },
        {
          apiId: 18500075,
          internalId: 10,
          time: 1175714200,
          title: "London, city of lost hospitals",
          url: "https://wellcomecollection.org/articles/W6jAXxIAACAAmykv",
          comments: []
        }
      ]
    };
  }
  render() {
    const { stories } = this.state;
    return (
      <div className="App">
        <Navbar />
        <ViewContainer stories={stories} />
        <Footer />
      </div>
    );
  }
}

export default App;
