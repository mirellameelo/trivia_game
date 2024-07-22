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

  useEffect(() => {
    console.log('Displayed Questions:', displayedQuestions);
  }, [displayedQuestions]);

  const handleMenu = () => {
    setSelectedCategory(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const displayedIndexes = displayedQuestions[category] || [];
    const nextIndex = questions[category].findIndex(
      (_, index) => !displayedIndexes.includes(index)
    );
    setCurrentQuestionIndex(nextIndex !== -1 ? nextIndex : 0); // Fallback to 0 if all questions have been displayed
    setDisplayedQuestions((prev) => ({
      ...prev,
      [category]: displayedIndexes
    }));
  };

  const handleQuestionDisplayed = (index) => {
    setDisplayedQuestions((prev) => ({
      ...prev,
      [selectedCategory]: [...prev[selectedCategory], index]
    }));
  };

  const areAllQuestionsDisplayed = (category) => {
    return (
      questions[category]?.length === (displayedQuestions[category]?.length || 0)
    );
  };

  const currentQuestion = questions[selectedCategory]?.[currentQuestionIndex];

  return (
    <div className="App">
      {!selectedCategory ? (
        <div>
          <h1>Categorias</h1>
          <div className="category-container">
            {categories.map((category) => (
              <button
                key={category}
                className="category-button"
                onClick={() => handleCategorySelect(category)}
                disabled={areAllQuestionsDisplayed(category)}
              >
                {category}
              </button>
            ))}
          </div>
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
