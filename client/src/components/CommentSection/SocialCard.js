import React, { Component } from 'react';
import Moment from 'moment';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './SocialCard.css';
import Avatar from "./Avatar";

class SocialCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      retweetClicked: false,
      likeClicked: false,
      numComments: this.getRandomInt(0, 100),
      numRetweets: this.getRandomInt(0, 100),
      numLikes: this.getRandomInt(0, 100),
      dropdownOpen: false,
      isEditing: false,
      editedText: ''
    };

    this.toggleRetweetIcon = this.toggleRetweetIcon.bind(this);
    this.toggleLikeIcon = this.toggleLikeIcon.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this);
  }

  toggleRetweetIcon() {
    const retweetClicked = !this.state.retweetClicked;
    if (this.state.retweetClicked) this.setState({ retweetClicked: retweetClicked, numRetweets: this.state.numRetweets-1 });
    else this.setState({ retweetClicked: retweetClicked, numRetweets: this.state.numRetweets+1 });

  }

  toggleLikeIcon() {
    const likedClicked = !this.state.likeClicked;
    if (this.state.likeClicked) this.setState({ likeClicked: likedClicked, numLikes: this.state.numLikes-1 });
    else this.setState({ likeClicked: likedClicked, numLikes: this.state.numLikes+1 });

  }

  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  toggleEditForm() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  render() {
    // logic to determine classname of retweet and like icon
    let retweetClass;
    let likedClass;
    if (this.state.retweetClicked) retweetClass = ' clicked';
    if (this.state.likeClicked) likedClass = ' clicked';

    // convert timestamp to Moment.fromNow()
    const timestamp = Moment(this.props.timestamp).fromNow();

    // logic to check if comment is being edited
    // if so, show input form, if not, show reg comment text
    let commentTextBody = this.props.commentText;
    if (this.state.isEditing) {
      commentTextBody = <div className="edit-form">
                          <form>
                            <input
                              type="text"
                              placeholder={this.props.commentText}
                              value={this.state.editedText}
                            />
                            <button type="submit">Edit</button>
                          </form>
                        </div>;
    }

    return (
      <div className="card">
        <div className="card-container">
          <div className="card-left">
            <Avatar />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="header-left">
                <span className="author">{this.props.author}</span>
                <span className="username-timestamp">@jwaltrip - {timestamp}</span>
              </div>
              <div className="header-right">
                {/*<i className="fas fa-angle-down fa-2x"> </i>*/}
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} size="sm">
                  <DropdownToggle
                    tag="span"
                    onClick={this.toggle}
                    data-toggle="dropdown"
                    aria-expanded={this.state.dropdownOpen}
                  >
                    <i className="fas fa-angle-down fa-2x"> </i>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.toggleEditForm}>Edit</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

            <div className="card-text">{commentTextBody}</div>

            <div className="card-footer">
              <div className="comments">
                <i className="far fa-comment"> </i>
                {this.state.numComments}
              </div>
              <div className={"retweets" + retweetClass}>
                <i className="fas fa-retweet" onClick={this.toggleRetweetIcon}> </i>
                {this.state.numRetweets}
              </div>
              <div className={"likes" + likedClass}>
                <i className="fas fa-heart" onClick={this.toggleLikeIcon}> </i>
                {this.state.numLikes}
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