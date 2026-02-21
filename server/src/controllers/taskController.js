const Task = require('../models/Task');
const mockDb = require('../utils/mockDb');
const mongoose = require('mongoose');

const useMock = () => mongoose.connection.readyState !== 1;

// Get all tasks for user (with search and filter)
exports.getTasks = async (req, res) => {
    try {
        const { search, status, priority, sortBy } = req.query;
        let query = { userId: req.user.id };

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }
        if (status) {
            query.status = status;
        }
        if (priority) {
            query.priority = priority;
        }

        let tasks;
        if (useMock()) {
            tasks = (await mockDb.tasks.find(query)).sort();
        } else {
            let sort = {};
            if (sortBy) {
                const parts = sortBy.split(':');
                sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
            } else {
                sort.createdAt = -1;
            }
            tasks = await Task.find(query).sort(sort);
        }
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Create a task
exports.createTask = async (req, res) => {
    const { title, description, status, priority } = req.body;

    try {
        let task;
        if (useMock()) {
            task = await mockDb.tasks.create({
                title,
                description,
                status,
                priority,
                userId: req.user.id
            });
        } else {
            const newTask = new Task({
                title,
                description,
                status,
                priority,
                userId: req.user.id
            });
            task = await newTask.save();
        }
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    const { title, description, status, priority } = req.body;

    try {
        let task;
        if (useMock()) {
            task = await mockDb.tasks.findById(req.params.id);
        } else {
            task = await Task.findById(req.params.id);
        }

        if (!task) return res.status(404).json({ msg: 'Task not found' });

        // Make sure user owns task
        if (task.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const taskFields = {};
        if (title) taskFields.title = title;
        if (description) taskFields.description = description;
        if (status) taskFields.status = status;
        if (priority) taskFields.priority = priority;

        if (useMock()) {
            task = await mockDb.tasks.findByIdAndUpdate(req.params.id, taskFields);
        } else {
            task = await Task.findByIdAndUpdate(
                req.params.id,
                { $set: taskFields },
                { new: true }
            );
        }

        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        let task;
        if (useMock()) {
            task = await mockDb.tasks.findById(req.params.id);
        } else {
            task = await Task.findById(req.params.id);
        }

        if (!task) return res.status(404).json({ msg: 'Task not found' });

        // Make sure user owns task
        if (task.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        if (useMock()) {
            await mockDb.tasks.findByIdAndDelete(req.params.id);
        } else {
            await Task.findByIdAndDelete(req.params.id);
        }
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
