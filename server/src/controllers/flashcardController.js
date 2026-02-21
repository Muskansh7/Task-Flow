const mockDb = require('../utils/mockDb');

const useMock = () => true; // Flashcards only in mock for now

exports.getFlashcards = async (req, res) => {
    try {
        const userId = req.user.id;
        const flashcards = mockDb.flashcards ? mockDb.flashcards.filter(f => f.userId === userId) : [];
        res.json(flashcards);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createFlashcard = async (req, res) => {
    const { question, answer } = req.body;
    try {
        const newFlashcard = {
            _id: Math.random().toString(36).substr(2, 9),
            userId: req.user.id,
            question,
            answer,
            createdAt: new Date()
        };
        if (!mockDb.flashcards) mockDb.flashcards = [];
        mockDb.flashcards.push(newFlashcard);
        res.json(newFlashcard);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteFlashcard = async (req, res) => {
    try {
        const index = mockDb.flashcards.findIndex(f => f._id === req.params.id && f.userId === req.user.id);
        if (index === -1) return res.status(404).json({ msg: 'Flashcard not found' });

        mockDb.flashcards.splice(index, 1);
        res.json({ msg: 'Flashcard removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
