import React, { useState, useEffect } from 'react'
import axios from 'axios'

const initialState = {
    axis: { x: 2, y: 2 },
    steps: 0,
    message: '',
    email: ''
}

const URL = 'http://localhost:9000/api/result'

export function useForm(initialState) {
    // console.log(onChange)
    const [email, setEmail] = useState(initialState)
    const onChange = e => {
        const { value } = e.target
        setEmail(value)
    }
    return [email, onChange]
}
