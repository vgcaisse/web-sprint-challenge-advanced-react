import React, { useState, useEffect } from 'react'
import axios from 'axios'

const initialState = {
    axis: { x: 2, y: 2 },
    steps: 0,
    message: '',
    email: ''
}

const URL = 'http://localhost:9000/api/result'

export const useChange = (e) => {
    const [email, setEmail] = useState(() => {
        const { value, id } = e.target
        setEmail(value)
    })
    return [email, setEmail]
}
