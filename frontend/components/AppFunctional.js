import React, { useState } from 'react'
import axios from 'axios'

import { useChange } from './hooks'

const URL = 'http://localhost:9000/api/result'

export default function AppFunctional(props) {
  const [steps, setSteps] = useState(0)
  const [axis, setAxis] = useState({ x: 2, y: 2 })
  const [message, setMessage] = useState('')
  const [email, setEmail] = useChange('')

  const onChange = e => {
    const { value } = e.target
    setEmail(value)
  }

  const onSubmit = e => {
    e.preventDefault()

    const payloadToSend = {
      x: axis.x,
      y: axis.y,
      steps: steps,
      email: email
    }
    axios.post(URL, payloadToSend)
      .then(resp => {
        setMessage(resp.data.message)
        setEmail('')
      })
      .catch(err => {
        setMessage(err.response.data.message)
      })
  }

  const moveUp = () => {
    if (axis.y > 1) {
      setSteps(steps + 1)
      setAxis({ ...axis, y: axis.y - 1 })
      setMessage('');
    }
    else {
      setMessage(`You can't go up`)
    }
  }

  const moveDown = () => {
    if (axis.y < 3) {
      setSteps(steps + 1)
      setAxis({ ...axis, y: axis.y + 1 })
      setMessage('')
    }
    else {
      setMessage(`You can't go down`)
    }
  }

  const moveLeft = () => {
    if (axis.x > 1) {
      setSteps(steps + 1)
      setAxis({ ...axis, x: axis.x - 1 })
      setMessage('');
    }
    else {
      setMessage(`You can't go left`)
    }
  }

  const moveRight = () => {
    if (axis.x < 3) {
      setSteps(steps + 1)
      setAxis({ ...axis, x: axis.x + 1 })
      setMessage('');
    }
    else {
      setMessage(`You can't go right`)
    }
  }

  const resetBtn = () => {
    setSteps(0)
    setAxis({ x: 2, y: 2 })
    setMessage('');
    setEmail('')
  }

  // const initialState = {
  //   axis: {x: 2, y:2}, 
  //   steps: 0, 
  //   message: '', 
  //   email: ''
  // }
  // console.log(initialState)

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({axis.x}, {axis.y})</h3>
        <h3 id="steps" >You moved {steps} times</h3>
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
        <button onClick={moveLeft} id="left">LEFT</button>
        <button onClick={moveUp} id="up">UP</button>
        <button onClick={moveRight} id="right">RIGHT</button>
        <button onClick={moveDown} id="down">DOWN</button>
        <button onClick={resetBtn} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={email} setEmail={setEmail} value={email} id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}