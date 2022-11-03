import React from 'react'
import Answers from './Answers'
// import { unEscape } from 'JSONunEs'


export default function Quizzical(props) {

  // const apiQuestions = props.answers
  // props.answers.forEach(item => console.log(item.value))
  // // console.log(apiQuestions)
  // // console.log(props.toggleSelectAnswers)
  
  const answersData = props.answers.map((item) => (
    <Answers 
      answer={item.value} 
      isCorrect={item.isCorrect} 
      isSelected={item.isSelected} 
      key={item.id}
      id={item.id}
      quizid={props.id} 
      toggleSelectAnswers={props.toggleSelectAnswers}
      isChecked={props.isChecked}
    />
    ))

    
  return (
    <div className='quiz' >
      <img src="/blob-top2.png" className='blob--top' alt="blob--img" />
       
      <p className='quiz--questions' 
        dangerouslySetInnerHTML={{__html: props.question}} />
        {/* // {props.question} */}
      <div className='quiz--answers' >
        {answersData}
        
      </div>

      <hr />
      <img src="/blob-bottom2.png" className='blob--bottom' alt="blob--img" />
      
    </div>

  )


  }
