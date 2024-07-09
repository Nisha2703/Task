import React, { useState } from 'react';
import axios from 'axios';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/quizzes', { title, questions }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Quiz created');
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleQuestionChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index][e.target.name] = e.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (index, optionIndex, e) => {
    const newQuestions = [...questions];
    newQuestions[index].options[optionIndex] = e.target.value;
    setQuestions(newQuestions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Quiz</h2>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      {questions.map((question, index) => (
        <div key={index}>
          <input type="text" placeholder="Question" name="question" value={question.question} onChange={e => handleQuestionChange(index, e)} required />
          {question.options.map((option, optionIndex) => (
            <input key={optionIndex} type="text" placeholder={`Option ${optionIndex + 1}`} value={option} onChange={e => handleOptionChange(index, optionIndex, e)} required />
          ))}
          <input type="text" placeholder="Correct Answer" name="correctAnswer" value={question.correctAnswer} onChange={e => handleQuestionChange(index, e)} required />
        </div>
      ))}
      <button type="button" onClick={addQuestion}>Add Question</button>
      <button type="submit">Create Quiz</button>
    </form>
  );
};

export default CreateQuiz;
