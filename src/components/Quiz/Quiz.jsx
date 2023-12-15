import React, { useState, useRef, useEffect } from 'react';
import './Quiz.css';

// let apiEndPoint = 'https://quizapi.io/api/v1/questions';
let apiKey = "10unkoNvjk2MbxMrl2Znui7tlqMZ74ZkKe3pfQe2";


const Quiz = () => {
  let [data, setData] = useState(null);
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(null);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [reloadQuiz, setReloadQuiz] = useState(false);

  let options = Array.from({ length: 4 }, () => useRef(null));

  const isCorrect = (el, ans) => {
    if (lock == false) {
      if (question.correct_answer === ans) {
        el.target.classList.add('correct');
        setScore(++score);
        setLock(true);
      } else {
        el.target.classList.add('wrong');
        setLock(true);
        options[0].current.classList.add('correct');
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

  const newQuiz = () => {
    setData(null);
    setReloadQuiz(prev => !prev);
    reset();
  }

  useEffect(() => {
    fetch(`https://quizapi.io/api/v1/questions?apiKey=${apiKey}&limit=${10}`)
      .then(res => res.json())
      .then(res_data => {
        setData(res_data);
        setQuestion(res_data[index]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [reloadQuiz]);

  return (
    <div className='container'>
      <h1>BitWise</h1>
      <hr /> 
      {data && (result == true ? <>
        <h2>You scored {score} out of {data.length}</h2>
        <button onClick={newQuiz}>New</button>
        <button onClick={reset}>Reset</button>
      </> : <>
        <h2>{index + 1}. {question.question}</h2>
        <ul>
          <li ref={options[0]} onClick={(el) => isCorrect(el, "answer_a")}>{question.answers.answer_a || "none"}</li>
          <li ref={options[1]} onClick={(el) => isCorrect(el, "answer_b")}>{question.answers.answer_b || "none"}</li>
          <li ref={options[2]} onClick={(el) => isCorrect(el, "answer_c")}>{question.answers.answer_c || "none"}</li>
          <li ref={options[3]} onClick={(el) => isCorrect(el, "answer_d")}>{question.answers.answer_d || "none"}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className="index">
          {index + 1} of {data.length} questions
        </div></>)}
    </div>
  );
}

export default Quiz;