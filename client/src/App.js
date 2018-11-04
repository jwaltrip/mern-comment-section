import React, { Component } from 'react';
import './App.css';
import CommentList from "./components/CommentSection/CommentList";
// import CommentReply from "./components/CommentSection/CommentReply";

class App extends Component {
  render() {
    return (
      <div className="App">
        <CommentList/>
        {/*<CommentReply />*/}
      </div>
    );
  }
}

export default App;
