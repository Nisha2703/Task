const express = require('express');
const router = express.Router();
const Quiz = require('./models/Quiz');
const jwt = require('jsonwebtoken');

// Middleware to authenticate user
const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied');

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

// Create a quiz
router.post('/', authenticate, async (req, res) => {
  const { title, questions } = req.body;
  try {
    const quiz = new Quiz({ title, questions, createdBy: req.user.id });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('createdBy', 'username');
    res.json(quizzes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
