import React, { Component } from "react";
import "./Joke.css";

class Joke extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    const { joke, toVote, idx, vote } = this.props
    return (
      <div className='Joke'>
        {joke}
        <span>{vote}</span>
        <button onClick={() => toVote('up', idx)}>Upvote</button>
        <button onClick={() => toVote('down', idx)}>Downvote</button>
      </div>
    );
  }
}
export default Joke;
