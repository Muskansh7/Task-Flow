const bcrypt = require('bcryptjs');

// In-memory storage
const store = {
    users: [],
    tasks: [],
    flashcards: []
};

const mockDb = {
    users: {
        findOne: async ({ email }) => store.users.find(u => u.email === email),
        findById: async (id) => store.users.find(u => u._id === id),
        create: async (userData) => {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            const newUser = {
                _id: Math.random().toString(36).substr(2, 9),
                ...userData,
                password: hashedPassword,
                createdAt: new Date()
            };
            store.users.push(newUser);
            return newUser;
        },
        comparePassword: async (candidate, hash) => bcrypt.compare(candidate, hash)
    },
    tasks: {
        find: async (query) => {
            let results = store.tasks.filter(t => t.userId === query.userId);
            if (query.title && query.title.$regex) {
                const regex = new RegExp(query.title.$regex, query.title.$options);
                results = results.filter(t => regex.test(t.title));
            }
            if (query.status) results = results.filter(t => t.status === query.status);
            if (query.priority) results = results.filter(t => t.priority === query.priority);
            return {
                sort: () => results // Simplified sort
            };
        },
        findById: async (id) => store.tasks.find(t => t._id === id),
        create: async (taskData) => {
            const newTask = {
                _id: Math.random().toString(36).substr(2, 9),
                ...taskData,
                createdAt: new Date()
            };
            store.tasks.push(newTask);
            return newTask;
        },
        findByIdAndUpdate: async (id, fields) => {
            const index = store.tasks.findIndex(t => t._id === id);
            if (index !== -1) {
                store.tasks[index] = { ...store.tasks[index], ...fields, updatedAt: new Date() };
                return store.tasks[index];
            }
            return null;
        },
        findByIdAndDelete: async (id) => {
            const index = store.tasks.findIndex(t => t._id === id);
            if (index !== -1) {
                store.tasks.splice(index, 1);
                return true;
            }
            return false;
        }
    }
};

module.exports = mockDb;
