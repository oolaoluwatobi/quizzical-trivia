import React from 'react'

function Start(props) {
  // console.log(props.event)
  return (
    <div className='container' >
      <img src="/blob-top.png" className='blob--top' alt="blob--img" />
      <div className='start--text' >
        <h1>Quizzical</h1>
        <p className='description' >Start the quiz to test yourself </p>
        <button onClick={event => props.startQuiz(event) } className='btn--start' >Start quiz</button>
      </div>
      <img src="/blob-bottom.png" className='blob--bottom' alt="blob--img" />
    </div>
  )
}

export default Start