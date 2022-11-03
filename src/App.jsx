import { useState, useEffect } from 'react'
import Start from '../components/Start'
import Quizzical from '../components/Quizzical'
import { nanoid } from 'nanoid'
import './App.css'


export default function App() {

  
  const [quizStart, setQuizStart] = useState(false)
  const [quizData, setQuizData] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  const [correctAnswersNo, setCorrectAnswersNo] = useState(0)

  const startQuiz = () => {
    console.log(quizStart)
    setQuizStart(prevState => !prevState)
    setIsChecked(false)
  }
  
  const resetQuiz = () => {
    setQuizStart(prevState => !prevState)
    setIsChecked(false)
    fetchData()
  }
  function fetchData() {
    fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json()
      })
      .then((data) => createQuizObj(data.results)) 
      .then((quizObj) => setQuizData(quizObj))
      .catch((error) => console.log(error))
  }
  
  function createQuizObj(data) {
    return (
      data?.map((item) => {
        return {
          ...item,
          id: nanoid(12),
          answers: shuffleAnsArray([
            ...convertIncorrectAnsToObj(item.incorrect_answers), 
            convertCorrectAnsToObj(item.correct_answer)
          ])
        }
        
      })
      )
    } 
    
    function convertCorrectAnsToObj(ans) {
      return ({
        value: ans,
        isCorrect: true,
        isSelected: false,
        id: nanoid(12)
      })
    }
    
    
  function convertIncorrectAnsToObj(ans) {
    return ans.map((item) => {
      return ({
      value: item,
      isCorrect: false,
      isSelected: false,
      id: nanoid(12)
      })
    })
  }

  function shuffleAnsArray(ans) {
    return(
      ans.sort(function(a, b){return 0.5 - Math.random()})
    )
  }
    
  function toggleSelectAnswers(quizId, answerId) {
    console.log("clicked")
    !isChecked && //so answers cant be changed adter being checked
    setQuizData((prevData) => {
      return prevData.map((quiz) => {
        return quiz.id === quizId 
          ? {
              ...quiz, answers: quiz.answers.map((answer) => {
                return answer.id === answerId 
                  ? {...answer, isSelected: !answer.isSelected} 
                  : {...answer, isSelected: false};
              }) 
             }
          : quiz ;
      })

    })
  }

  function countCorrectAnswers() {
    
    let scoreCount = 0;
    
      for (let quiz of quizData) {
        for (let answer of quiz.answers) {
          // console.log(answer)
          if (answer.isCorrect && answer.isSelected) {
            scoreCount+=1;
          }
        }
      }

    
    console.log(scoreCount)
  
    
    return scoreCount;
  }
  countCorrectAnswers()
  
  
  const quizElements = quizData.map((quiz) => (
    <Quizzical 
      answers={quiz.answers}
      question={quiz.question} 
      key={quiz.id}
      id={quiz.id} 
      resetQuiz={resetQuiz} 
      toggleSelectAnswers={toggleSelectAnswers}
      isChecked={isChecked}
    />))
  
  // console.log(quizData)


    
    useEffect(() => {
      fetchData()
      
    }, [])
    

    return (
      <main className='app' >
  
      {
        quizStart
        ? 
        <div>
          {quizData && quizElements}
          {
            isChecked
            ?
            <div className='results--page' >
              <p>You scored {countCorrectAnswers()}/{quizData.length} correct answers </p>
              <button className='btn--play-again' onClick={() => resetQuiz()} >Play again</button>
            </div>
            :
            <button className='btn--check-answers' onClick={() => setIsChecked(prevState => !prevState)} >Check answers</button>
          }
          
        </div>
        : 
        <Start startQuiz={startQuiz} onClick={startQuiz} /> 
      }
        
      </main>
    )

}


