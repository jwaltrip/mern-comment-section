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
      numLikes: 0,
      dropdownOpen: false,
      isEditing: false,
      editedText: '',
      error: null
    };

    this.toggleRetweetIcon = this.toggleRetweetIcon.bind(this);
    this.toggleLikeIcon = this.toggleLikeIcon.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.updateEditText = this.updateEditText.bind(this);
    this.submitEditText = this.submitEditText.bind(this);
    this.onSubmitDelete = this.onSubmitDelete.bind(this);
  }

  componentDidMount() {
    fetch(`/comments/${this.props.id}`)
      .then(res => res.json())
      .then(comment => {
        this.setState({ numLikes: comment.numLikes });
      });
  }

  toggleRetweetIcon() {
    const retweetClicked = !this.state.retweetClicked;
    if (this.state.retweetClicked) this.setState({ retweetClicked: retweetClicked, numRetweets: this.state.numRetweets-1 });
    else this.setState({ retweetClicked: retweetClicked, numRetweets: this.state.numRetweets+1 });

  }

  toggleLikeIcon() {
    const likedClicked = !this.state.likeClicked;

    // increment numLikes in DB +1 if NOT likeClicked
    if (this.state.likeClicked) {
      fetch(`/comments/${this.props.id}/like`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.props.id,
          numLikes: -1
        })
      })
        .then(res => res.json())
        .then(res => {
          if (!res.success) this.setState({ error: res.error });
          else this.setState({ likeClicked: likedClicked, numLikes: this.state.numLikes-1, error: null });
        });
    } else {

      fetch(`/comments/${this.props.id}/like`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.props.id,
          numLikes: 1
        })
      })
        .then(res => res.json())
        .then(res => {
          if (!res.success) this.setState({ error: res.error });
          else this.setState({ likeClicked: likedClicked, numLikes: this.state.numLikes+1, error: null });
        });
    }

  }

  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  toggleEditForm() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  updateEditText(e) {
    e.preventDefault();
    this.setState({ editedText: e.target.value });
  }

  submitEditText(e) {
    e.preventDefault();

    fetch(`/comments/${this.props.id}/update`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.props.id,
        commentText: this.state.editedText,
        timestamp: Date.now()
      })
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ editedText: '', isEditing: false, error: null });
      });
  }

  onSubmitDelete(e) {
    e.preventDefault();

    fetch(`/comments/${this.props.id}/delete`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.props.id
      })
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ error: null });
      });
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
                          <form onSubmit={this.submitEditText}>
                            <input
                              type="text"
                              placeholder={this.props.commentText}
                              value={this.state.editedText}
                              onChange={this.updateEditText}
                            />
                            <button type="submit">Edit</button>
                          </form>
                          <i className="fa fa-window-close" aria-hidden="true" onClick={this.toggleEditForm}> </i>
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
                <span className="username-timestamp">@{this.props.author.trim().toLowerCase()} - {timestamp}</span>
              </div>
              <div className="header-right">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} size="sm">
                  <DropdownToggle
                    tag="span"
                    onClick={this.toggle}
                    data-toggle="dropdown"
                    aria-expanded={this.state.dropdownOpen}
                  >
                    <i className="fas fa-angle-down edit-menu"> </i>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.toggleEditForm}>Edit</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.onSubmitDelete}>Delete</DropdownItem>
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
                {this.props.numLikes}
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