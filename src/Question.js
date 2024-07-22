import React, { useState, useEffect } from 'react';
import './Question.css';

const Question = ({ questionData, onMenu, onConfirmChoice }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    const answers = [questionData.right_answer, ...questionData.wrong_answers];
    setShuffledAnswers(shuffleArray(answers));
  }, [questionData]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleConfirmChoice = () => {
    setShowResult(true);
    onConfirmChoice();
  };

  return (
    <div>
      <h1>{questionData.question}</h1>
      {shuffledAnswers.map((answer) => (
        <button
          key={answer}
          onClick={() => handleAnswerSelect(answer)}
          className={`answer-button ${
            selectedAnswer === answer ? 'selected' : ''
          } ${
            showResult && answer === questionData.right_answer
              ? 'correct'
              : showResult && answer === selectedAnswer
              ? 'wrong'
              : ''
          }`}
          disabled={showResult}
        >
          {answer}
        </button>
      ))}
      {showResult ? (
        <button onClick={onMenu}>MENU</button>
      ) : (
        <button onClick={handleConfirmChoice} disabled={!selectedAnswer}>Confirm Choice</button>
      )}
    </div>
  );
};

export default Question;
