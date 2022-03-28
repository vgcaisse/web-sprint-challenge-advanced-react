// import { useState } from 'react'
// import axios from 'axios'

// const initialState = {
//     axis: { x: 2, y: 2 },
//     steps: 0,
//     message: '',
//     email: ''
// }

// const URL = 'http://localhost:9000/api/result'

// export function useForm(values) {
//     // console.log(onChange)
//     const [email, setEmail] = useState(values);
//     const onChange = e => {
//         const { value } = e.target
//         setEmail(value)
//     }
//     return [email, onChange]
// }

// export function useSubmit(value) {
//     const [axis, setAxis] = useState({ x: 2, y: 2 })
//     const [message, setMessage] = useState()
//     const [steps, setSteps] = useState(0)
//     const [email, setEmail] = useState('');

//     const onSubmit = (e) => {
//         e.preventDefault()

//         const payloadToSend = {
//             x: axis.x,
//             y: axis.y,
//             steps: steps,
//             email: email
//         }
//         axios.post(URL, payloadToSend)
//             .then(resp => {
//                 setMessage(resp.data.message)
//                 setAxis(value)
//                 setEmail(value)
//                 setSteps(value)
//             })
//             .catch(err => {
//                 setMessage(err.response.message)
//             })
//     }
//     return [message, onSubmit]
// }


// ----------------------- hooks attempt ----------------------
