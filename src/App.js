import React, { useState, useEffect } from 'react';
import './App.css';
import Question from './Question';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    fetch('/questions.json')
      .then((response) => response.json())
      .then((data) => {
        setCategories(Object.keys(data));
        setQuestions(data);
      });
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
  };

  const handleMenu = () => {
    setSelectedCategory(null);
  };

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
        <Question
          questionData={questions[selectedCategory][currentQuestionIndex]}
          onMenu={handleMenu}
        />
      )}
    </div>
  );
};

export default App;
