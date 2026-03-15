const Question = require('../models/Question');

const createQuestion = async (req, res) => {
    try {
        const question = new Question({ ...req.body, createdBy: req.user.id });
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getQuestions = async (req, res) => {
    try {
        const { subject, exam, limit = 10, skip = 0 } = req.query;
        const query = {};
        if (subject) query.subject = subject;
        if (exam) query.exam = exam;

        const questions = await Question.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(skip));
        
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRandomQuestions = async (req, res) => {
    try {
        const count = await Question.countDocuments();
        const random = Math.floor(Math.random() * Math.max(0, count - 10));
        const questions = await Question.find().skip(random).limit(10);
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createQuestion, getQuestions, getRandomQuestions };
