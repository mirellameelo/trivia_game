import React, { useState, useEffect } from 'react';
import './App.css';
import Question from './Question';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [displayedQuestions, setDisplayedQuestions] = useState({});

  useEffect(() => {
    fetch('/questions.json')
      .then((response) => response.json())
      .then((data) => {
        setCategories(Object.keys(data));
        setQuestions(data);
      });
  }, []);

  const handleMenu = () => {
    setSelectedCategory(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
    setDisplayedQuestions((prev) => ({
      ...prev,
      [category]: []
    }));
  };

  const handleQuestionDisplayed = (index) => {
    setDisplayedQuestions((prev) => ({
      ...prev,
      [selectedCategory]: [...prev[selectedCategory], index]
    }));
  };

  const currentQuestion = questions[selectedCategory]?.[currentQuestionIndex];

  return (
    <div className="App">
      {!selectedCategory ? (
        <div>
          <h1>Select a Category</h1>
          {categories.map((category) => (
            <button key={category} onClick={() => handleCategorySelect(category)}>
              {category}
            </button>
          ))}
        </div>
      ) : (
        currentQuestion && (
          <Question
            questionData={currentQuestion}
            onMenu={handleMenu}
            onConfirmChoice={() => handleQuestionDisplayed(currentQuestionIndex)}
          />
        )
      )}
    </div>
  );
};

export default App;
