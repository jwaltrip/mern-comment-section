import React, { Component } from 'react';
import './App.css';
import CommentList from "./components/CommentSection/CommentList";
import SocialCard from "./components/CommentSection/SocialCard";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<CommentList/>*/}
        <SocialCard />
      </div>
    );
  }
}

export default App;
