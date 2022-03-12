import React from 'react'
import axios from 'axios';

const intialState = {
  message: '',
  // axis: { x: 0, y: 0 },
  x: 2,
  y: 2,
  steps: 0,
  email: '',
}

const URL = `http://localhost:9000/api/result`;

export default class AppClass extends React.Component {
  
  state = intialState

  onSubmit = (e) => {
    e.preventDefault();
    const { x, y, steps, email } = this.state
    const payloadToSend = {
      x: x,
      y: y,
      steps: steps,
      email: email
    }
    axios.post(URL, payloadToSend)
      .then(res => {
        console.log('STATE IS ABOUT TO CHANGE')
        this.setState({
          ...this.state, 
          email: res.data.email,
          x: res.data.x,
          y: res.data.y,
          steps: res.data.steps,
          message: res.data.message,
        })
      })
      .catch(err => {
        console.log('err message')
        this.setState({message: 'Ouch: email is required'})
      })
  }

  onChange = e => {
    console.log(this.state)
    const { value, id } = e.target
    this.setState({ ...this.state, [id]: value })
  }

  resetBtn = () => {
    console.log(this.state)
    this.setState({ state: this.intialState })
    // this.setState({ 
    //   ...this.state,
    //   message: '',
    //   // axis: {x: 0, y: 0},
    //   x: 2,
    //   y: 2,
    //   steps: 0,
    //   email: '',
    // })
  }
  
  render() {
    console.log(this.state)
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset" onClick={this.resetBtn}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
