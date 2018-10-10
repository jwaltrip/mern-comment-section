import React, { Component } from 'react';
import './App.css';
import CommentList from "./components/CommentSection/CommentList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <CommentList/>
      </div>
    );
  }
}

export default App;
