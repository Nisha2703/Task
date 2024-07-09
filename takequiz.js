import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TakeQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await axios.get('/api/quizzes');
      setQuizzes(res.data);
    };
    fetchQuizzes();
  }, []);

  const handleQuizSelect = async (quizId) => {
    const res = await axios.get(`/api/quizzes/${quizId}`);
    setSelectedQuiz(res.data);
    setAnswers({});
    setScore(null);
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    selectedQuiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score++;
      }
    });
    setScore(score);
  };

  return (
    <div>
      <h2>Take Quiz</h2>
      <select onChange={e => handleQuizSelect(e.target.value)}>
        <option value="">Select a quiz</option>
        {quizzes.map(quiz => (
          <option key={quiz._id} value={quiz._id}>{quiz.title}</option>
        ))}
      </select>
      {selectedQuiz && (
        <form onSubmit={handleSubmit}>
          {selectedQuiz.questions.map((question, index) => (
            <div key={index}>
              <p>{question.question}</p>
              {question.options.map(option => (
                <div key={option}>
                  <input type="radio" name={`question-${index}`} value={option} onChange={e => handleAnswerChange(index, e.target.value)} /> {option}
                </div>
              ))}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      )}
      {score !== null && <p>Your score: {score}/{selectedQuiz.questions.length}</p>}
    </div>
  );
};

export default TakeQuiz;
