import React from 'react'

function Questions(props) {

  var answerArray = [].concat.apply([], props.answer); //merge the incorrect and correct answers in an array
  answerArray.sort(function(a, b){return 0.5 - Math.random()}) //shuffle the answers so the correct answer doesnt always come last
  console.log(answerArray)
  
  const answer = answerArray.map(ans => (
    <button className='btn--ans' >{ans}</button>
    ))
    // console.log(answerArray)
    
  return (
    <div className='quiz' >
      <h3 className='quiz--questions' >
      {props.question}
      </h3>
      <p className='quiz--answers' >
      {/* {answerArray} */}
      {answer}
      </p>
      
      <hr />
    </div>

  )

}

export default Questions
