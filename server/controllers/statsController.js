const Attempt = require('../models/Attempt');
const Question = require('../models/Question');

const getDailyStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const attempts = await Attempt.find({
            userId,
            timestamp: { $gte: today }
        });

        const total = attempts.length;
        const correct = attempts.filter(a => a.isCorrect).length;
        const wrong = total - correct;
        const accuracy = total > 0 ? (correct / total) * 100 : 0;

        res.status(200).json({
            date: today,
            attempted: total,
            correct,
            wrong,
            accuracy: accuracy.toFixed(2)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSubjectStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await Attempt.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: 'questions',
                    localField: 'questionId',
                    foreignField: '_id',
                    as: 'question'
                }
            },
            { $unwind: '$question' },
            {
                $group: {
                    _id: '$question.subject',
                    attempted: { $sum: 1 },
                    correct: { $sum: { $cond: ['$isCorrect', 1, 0] } }
                }
            }
        ]);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDailyStats, getSubjectStats };
