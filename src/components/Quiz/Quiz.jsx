import React, { useState, useRef } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let options = Array.from({ length: 4 }, () => useRef(null));

  const isCorrect = (el, ans) => {
    if (lock == false) {
      if (question.ans === ans) {
        el.target.classList.add('correct');
        setScore(++score);
        setLock(true);
      } else {
        el.target.classList.add('wrong');
        setLock(true);
        options[question.ans - 1].current.classList.add('correct');
      }
    }
  }

  const next = () => {
    if (lock == true) {
      if (index == data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      options.map(el => {
        el.current.classList.remove('correct');
        el.current.classList.remove('wrong');
        return null;
      })
    }
  }

  const reset = () => {
    setIndex(0);
    setQuestion(data[index]);
    setLock(false);
    setScore(0);
    setResult(false);
  }

  return (
    <div className='container'>
      <h1>BitWise</h1>
      <hr />
      {result == true ? <>
        <h2>You scored {score} out of {data.length}</h2>
        <button onClick={reset}>Reset</button>
      </> : <>
        <h2>{index + 1}. {question.question}</h2>
        <ul>
          <li ref={options[0]} onClick={(el) => isCorrect(el, 1)}>{question.option1}</li>
          <li ref={options[1]} onClick={(el) => isCorrect(el, 2)}>{question.option2}</li>
          <li ref={options[2]} onClick={(el) => isCorrect(el, 3)}>{question.option3}</li>
          <li ref={options[3]} onClick={(el) => isCorrect(el, 4)}>{question.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className="index">
          {index + 1} of {data.length} questions
        </div></>}
    </div>
  );
}

export default Quiz;