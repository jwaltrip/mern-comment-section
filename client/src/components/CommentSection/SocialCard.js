import React, { Component } from 'react';

import './SocialCard.css';

class SocialCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      retweetClicked: false,
      likeClicked: false
    };

    this.toggleRetweetIcon = this.toggleRetweetIcon.bind(this);
    this.toggleLikeIcon = this.toggleLikeIcon.bind(this);
  }

  toggleRetweetIcon() {
    const retweetClicked = !this.state.retweetClicked;
    this.setState({ retweetClicked: retweetClicked });
  }

  toggleLikeIcon() {
    const likedClicked = !this.state.likeClicked;
    this.setState({ likeClicked: likedClicked });
  }

  render() {
    // logic to determine classname of retweet and like icon
    let retweetClass;
    let likedClass;
    if (this.state.retweetClicked) retweetClass = ' clicked';
    if (this.state.likeClicked) likedClass = ' clicked';


    return (
      <div className="card">
        <h2>Social Card</h2>
        <div className="card-container">
          <div className="card-left">
            <div className="avatar"> </div>
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="header-left">
                <span className="author">Jake Waltrip</span>
                <span className="username-timestamp">@jwaltrip - Oct 17, 2018</span>
              </div>
              <div className="header-right">
                <i className="fas fa-angle-down fa-2x"> </i>
              </div>
            </div>

            <div className="card-text">Test Comment Text</div>

            <div className="card-footer">
              <div className="comments">
                <i className="far fa-comment"> </i>
                2
              </div>
              <div className={"retweets" + retweetClass} onClick={this.toggleRetweetIcon}>
                <i className="fas fa-retweet"> </i>
                49
              </div>
              <div className={"likes" + likedClass} onClick={this.toggleLikeIcon}>
                <i className="fas fa-heart"> </i>
                93
              </div>
              <div className="message">
                <i className="far fa-envelope"> </i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SocialCard;