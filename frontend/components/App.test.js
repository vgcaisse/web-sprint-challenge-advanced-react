// Write your tests here
import React from 'react'
import AppClass from './AppClass'
import { render, userEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

const button = screen.queryByTestId(/submit/i)
beforeEach(() => {
  render(<AppClass />)
})

test('testing the render of the square and square active divs', () => { //--------------passing---------------------
  screen.findByText(/square/i) 
  screen.findByText(/square active/i)
})

// test('submit button is present', ()=>{
//   expect(button).toBeInTheDocument()
// })

// test('button can be clicked', ()=>{
//   userEvent.click(button)
// })


