import React from 'react'


export default function Answers(props) {
  
  let styles;
    if (!props.isChecked) { //if the answers have not been checked 
      styles = {
        backgroundColor: props.isSelected ? '#D6DBF5' : 'transparent',
        border: props.isSelected ? "1px solid #d6dbf5" : "1px solid #d6dbf5"
      }

    } else {
      if (props.isCorrect) {
        styles = {
          backgroundColor:'#94D7A2' ,
          border: props.isSelected ? "1px solid #d6dbf5" : "1px solid #d6dbf5"
        }
      } else {
        styles = {
          backgroundColor: props.isSelected ? '#F8BCBC' : 'transparent',
          border: props.isSelected ? "1px solid #d6dbf5" : "1px solid #d6dbf5"
        }
      }

    }

  return (
    <div>
      <button
        style={styles}
        onClick={() => props.toggleSelectAnswers(props.quizid, props.id)} 
        className='quiz--answers btn--ans' 
        > 
        <span
         dangerouslySetInnerHTML={{__html: props.answer}}
          />
         {/* {props.answer} */}
      </button>
    </div>
  )
}
