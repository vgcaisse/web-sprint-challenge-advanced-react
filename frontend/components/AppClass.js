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
      .finally(res => {
        this.setState({
          ...this.state,
          x: x,
          y: y,
          steps: steps,
          email: ''
        })
      })
  }

  onChange = e => {
    console.log(this.state)
    const { value, id } = e.target
    this.setState({ ...this.state, [id]: value })
  }

  resetBtn = () => {
    console.log(this.state)
    this.setState(this.initialState)
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

  goUp = () => { 
    console.log('y axis should decrease')
    if(this.state.y > 1 ) {
      return(
        this.setState((state) => ({
        ...state,
        steps: this.state.steps + 1,
        y: this.state.y - 1,
        message: ''
      })))
    } else {
      return(
        this.setState({message: 'you cant go up'})
      )
    }      
  }

  goDown = () => { 
    if(this.state.y < 3 ) {
      return(
        this.setState((state) => ({
        ...state,
        steps: this.state.steps + 1,
        y: this.state.y + 1,
        message: ''
      })))
    } else {
      return(
        this.setState({message: 'you cant go down'})
      )
    }      
  }

  goLeft = () => { 
    if(this.state.x > 1 ) {
      return(
        this.setState((state) => ({
        ...state,
        steps: this.state.steps + 1,
        x: this.state.x - 1,
        message: ''
      })))
    } else {
      return(
        this.setState({message: 'you cant go left'})
      )
    }
  }

  goRight = () => { 
    if(this.state.x < 3 ) {
      return(
        this.setState((state) => ({
        ...state,
        steps: this.state.steps + 1,
        x: this.state.x + 1,
        message: ''
      })))
    } else {
      return(
        this.setState({message: 'you cant go right'})
      )
    }
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
        <button id="left" onClick={this.goLeft}>LEFT</button>
          <button id="up" onClick={this.goUp}>UP</button>
          <button id="right" onClick={this.goRight}>RIGHT</button>
          <button id="down" onClick={this.goDown}>DOWN</button>
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
