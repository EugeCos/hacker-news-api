import axios from "axios";

const topStoriesUrl = "https://hacker-news.firebaseio.com/v0/topstories.json";

export default {
  fetchTopStories: () => axios.get(topStoriesUrl),
  fetchIndividualStory: url => axios.get(url)
};
