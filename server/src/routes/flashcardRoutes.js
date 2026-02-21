const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const flashcardController = require('../controllers/flashcardController');

// @route   GET api/flashcards
// @desc    Get all flashcards for user
// @access  Private
router.get('/', auth, flashcardController.getFlashcards);

// @route   POST api/flashcards
// @desc    Create a flashcard
// @access  Private
router.post('/', auth, flashcardController.createFlashcard);

// @route   DELETE api/flashcards/:id
// @desc    Delete a flashcard
// @access  Private
router.delete('/:id', auth, flashcardController.deleteFlashcard);

module.exports = router;
