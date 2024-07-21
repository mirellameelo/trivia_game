import React, { useState } from 'react';
import './Question.css';

const Question = ({ questionData, onMenu, onConfirmChoice }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleConfirmChoice = () => {
    setShowResult(true);
    onConfirmChoice();
  };

  return (
    <div>
      <h2>{questionData.question}</h2>
      {[questionData.right_answer, ...questionData.wrong_answers].map((answer) => (
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
