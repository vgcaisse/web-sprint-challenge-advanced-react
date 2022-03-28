import React from 'react'
import axios from 'axios'

const initialState = {
  axis: { x: 2, y: 2 },
  steps: 0,
  message: '',
  email: ''
}

const URL = 'http://localhost:9000/api/result'

export default class AppClass extends React.Component {

  state = initialState

  onSubmit = event => {
    event.preventDefault()
    const payloadToSend = {
      x: this.state.axis.x,
      y: this.state.axis.y,
      steps: this.state.steps,
      email: this.state.email
    }
    axios.post(URL, payloadToSend)
      .then(resp => {
        this.setState({ ...this.state, message: resp.data.message })
        this.setState({ ...this.state, email: '' })
      })
      .catch(err => {
        this.setState({ ...this.state, message: err.response.data.message })
      })
  }

  onChange = event => {
    const { value } = event.target
    this.setState({ ...this.state, email: value })

  }

  goUp = () => {
    if (this.state.axis.y > 1) {
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        axis: { ...this.state.axis, y: this.state.axis.y - 1 },
        message: ''
      });

    }
    else {
      this.setState({ ...this.state, message: "You can't go up" })
    }
  }

  goDown = () => {
    if (this.state.axis.y < 3) {
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        axis: { ...this.state.axis, y: this.state.axis.y + 1 },
        message: ''
      });
    }
    else {
      this.setState({ ...this.state, message: "You can't go down" })
    }
  }

  goLeft = () => {
    if (this.state.axis.x > 1) {
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        axis: { ...this.state.axis, x: this.state.axis.x - 1 },
        message: ''
      });
    }
    else {
      this.setState({ ...this.state, message: "You can't go left" })
    }
  }

  goRight = () => {
    if (this.state.axis.x < 3) {
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        axis: { ...this.state.axis, x: this.state.axis.x + 1 },
        message: ''
      });
    }
    else {
      this.setState({ ...this.state, message: "You can't go right" })
    }
  }

  resetBtn = () => {
    this.setState({
      axis: { x: 2, y: 2 },
      steps: 0,
      message: '',
      email: ''
    })
  }

  render() {
    console.log(this.state)
    const { className } = this.props

    const {
      email,
      steps,
      axis,
      message
    } = this.state

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${axis.x}, ${axis.y})`}</h3>
          <h3 id="steps">You moved {steps} {steps > 1 ? 'times' : 'time'} </h3>
        </div>
        <div id="grid">
          <div className={`${axis.x == 1 && axis.y == 1 ? "square active" : "square"}`}>{axis.x === 1 && axis.y === 1 ? "B" : ""}</div>
          <div className={`${axis.x == 2 && axis.y == 1 ? "square active" : "square"}`}>{axis.x === 2 && axis.y === 1 ? "B" : ""}</div>
          <div className={`${axis.x == 3 && axis.y == 1 ? "square active" : "square"}`}>{axis.x === 3 && axis.y === 1 ? "B" : ""}</div>
          <div className={`${axis.x == 1 && axis.y == 2 ? "square active" : "square"}`}>{axis.x === 1 && axis.y === 2 ? "B" : ""}</div>
          <div className={`${axis.x == 2 && axis.y == 2 ? "square active" : "square"}`}>{axis.x === 2 && axis.y === 2 ? "B" : ""}</div>
          <div className={`${axis.x == 3 && axis.y == 2 ? "square active" : "square"}`}>{axis.x === 3 && axis.y === 2 ? "B" : ""}</div>
          <div className={`${axis.x == 1 && axis.y == 3 ? "square active" : "square"}`}>{axis.x === 1 && axis.y === 3 ? "B" : ""}</div>
          <div className={`${axis.x == 2 && axis.y == 3 ? "square active" : "square"}`}>{axis.x === 2 && axis.y === 3 ? "B" : ""}</div>
          <div className={`${axis.x == 3 && axis.y == 3 ? "square active" : "square"}`}>{axis.x === 3 && axis.y === 3 ? "B" : ""}</div>
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.goLeft} id="left">LEFT</button>
          <button onClick={this.goUp} id="up">UP</button>
          <button onClick={this.goRight} id="right">RIGHT</button>
          <button onClick={this.goDown} id="down">DOWN</button>
          <button onClick={this.resetBtn} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} value={email} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}