const express = require('express');
const { createQuestion, getQuestions, getRandomQuestions } = require('../controllers/questionController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createQuestion);
router.get('/', getQuestions);
router.get('/random', getRandomQuestions);

const Attempt = require('../models/Attempt');
router.post('/attempt', auth, async (req, res) => {
    try {
        const attempt = new Attempt({ ...req.body, userId: req.user.id });
        await attempt.save();
        res.status(201).json(attempt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
