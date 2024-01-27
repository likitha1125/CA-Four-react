import React, { useState, useEffect } from 'react';
import questions from '../questions';
import Result from './Result';
import '../App.css';

import img from '../assets/kalvium.png';
import moonIcon from '../assets/moon.png';
import sunIcon from '../assets/sun.png';

export default function QuestionBox() {
  const [count, setCount] = useState(0);
  const [textColor, setTextColor] = useState('white');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [lightText, setLightText] = useState('Dark mode');

  const increment = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (count < 4) {
      setCount(count + 1);
    } else {
      setShowResult(true);
    }
  };

  const highlight = () => {
    setTextColor('purple');
  };

  const removeHighlight = () => {
    setTextColor('white');
  };

  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (

    <div className='body'>
      <div className='Questionnav'>
      <img className='kalvium' src={img} alt="" />

        <div className='themeButton'>
          <button
            style={{
              border: 'none',
              background: 'none',
              padding: 0,
            }}
            onClick={() => setDarkMode(!darkMode)}
            id='theme'
          >
            <img src={darkMode ? sunIcon : moonIcon} alt="Theme Icon" />
          </button>
        </div>
      </div>
      {showResult ? (
        <Result data={score} />
      ) : (
        <div className='flex'>
          <div className='container'>
            <h2>Question: {count + 1} out of 5</h2>
            <h1 id='ques' style={{ color: textColor }}>
              {questions[count].text}
            </h1>
            <div className='options'>
              {questions[count].options.map((choice, index) => (
                <button key={index} onClick={() => increment(choice.isCorrect)}>
                  {choice.text}
                </button>
              ))}
            </div>
            <div className='highlight'>
              <button onClick={highlight}>Highlight</button>
              <button onClick={removeHighlight}>Remove Highlight</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
