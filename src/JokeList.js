import React, { Component } from "react";
import Joke from "./Joke";
import axios from "axios";
import uuid from "uuid/v4";
import "./JokeList.css";

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem('jokes')) || [],
      loading: false
    };

  }

  componentDidMount() {

    if (!window.localStorage.getItem('jokes')) {
      this.jokeFiller()
    }
  }

  jokeFiller = () => {
    for (var i = 0; i < this.props.numJokesToGet; i++) {
      axios.get('https://icanhazdadjoke.com/', {
          headers: {
            Accept: 'application/json '
          }
        })
        .then(res => this.setState(st => ({
          jokes: [...st.jokes,
            {joke: res.data.joke, id: res.data.id, upvote: 0}
          ]
        })))
        .catch(err => console.log(err))
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.length !== this.state.jokes.length) {
      window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    }
  }

  newJokes = () => {
    window.localStorage.removeItem('jokes')
    this.setState({ jokes: []})
    this.jokeFiller()
  }

  toVote = (direction, idx) => {
    const copy = this.state.jokes.slice()

    if (copy.length) {
      if (direction === 'up') {
        copy[idx].upvote++
      } else {
        copy[idx].upvote--
      }

      copy.sort((a, b) => a['upvote'] > b['upvote'] ? -1 : a['upvote'] < b['upvote'] ? 1 : 0)

      this.setState({
        jokes: copy
      })

    }
  }

  render() {
    const { jokes } = this.state
    const storagedJokes = (JSON.parse(window.localStorage.getItem('jokes')))

    if (!storagedJokes || storagedJokes.length === this.props.numJokesToGet.length) {
      return <div>Loading</div>
    }

    return (
      <div className='JokeList'>
        <div className='JokeList-sidebar'>
          hello
        </div>
        <ul>
        <button onClick={() => this.newJokes()}>Click to get new jokes!</button>
        {
            jokes.map((joke, i) => (
              <div className='JokeLi'>
                <Joke
                  joke={joke.joke}
                  vote={joke.upvote}
                  toVote={this.toVote}
                  idx={i}
                />
              </div>
            ))
        }
        </ul>
      </div>
    );
  }
}
export default JokeList;
