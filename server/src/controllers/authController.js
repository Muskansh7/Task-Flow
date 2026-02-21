const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mockDb = require('../utils/mockDb');
const mongoose = require('mongoose');

const useMock = () => mongoose.connection.readyState !== 1;

// Register User
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user;
        if (useMock()) {
            user = await mockDb.users.findOne({ email });
        } else {
            user = await User.findOne({ email });
        }

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        if (useMock()) {
            user = await mockDb.users.create({ name, email, password });
        } else {
            user = new User({ name, email, password });
            await user.save();
        }

        const payload = {
            user: { id: user.id || user._id }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id || user._id, name: user.name, email: user.email } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user;
        if (useMock()) {
            user = await mockDb.users.findOne({ email });
        } else {
            user = await User.findOne({ email });
        }

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        let isMatch;
        if (useMock()) {
            isMatch = await mockDb.users.comparePassword(password, user.password);
        } else {
            isMatch = await user.comparePassword(password);
        }

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: { id: user.id || user._id }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id || user._id, name: user.name, email: user.email } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get current user profile
exports.getProfile = async (req, res) => {
    try {
        let user;
        if (useMock()) {
            user = await mockDb.users.findById(req.user.id);
            if (user) delete user.password;
        } else {
            user = await User.findById(req.user.id).select('-password');
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
