import React, { Component } from 'react';

class Avatar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bg: ''
    }
  }

  componentDidMount() {
    fetch("https://randomuser.me/api/")
      .then(response => response.json())
      .then(user => {
        const newState = {...this.state};
        newState.bg = `url('${user.results[0].picture.large}')`;
        this.setState(newState);
      });
  }

  render() {
    return (
      <div
        style={{
          backgroundImage: this.state.bg,
          borderRadius: '50%',
          width: '75px',
          height: '75px'
        }}>
      </div>
    );
  }
}

export default Avatar;