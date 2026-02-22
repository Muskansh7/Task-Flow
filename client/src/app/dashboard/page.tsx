'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { taskService } from '@/services/api';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function Dashboard() {
    const { user } = useAuth();

    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [currentTask, setCurrentTask] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium'
    });

    useEffect(() => {
        if (user) fetchTasks();
    }, [user]);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await taskService.getTasks({});
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            alert("Please login to manage tasks.");
            return;
        }

        try {
            if (currentTask) {
                await taskService.updateTask(currentTask._id, formData);
            } else {
                await taskService.createTask(formData);
            }

            setShowTaskForm(false);
            setCurrentTask(null);
            setFormData({
                title: '',
                description: '',
                status: 'pending',
                priority: 'medium'
            });

            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!user) {
            alert("Please login to delete tasks.");
            return;
        }

        try {
            await taskService.deleteTask(id);
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <main className="container" style={{ padding: '2rem 0' }}>

                <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>
                    {user ? "Your Tasks" : "Task Dashboard Preview 🚀"}
                </h2>

                {!user && (
                    <div className="glass" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
                        <p>Please login to create, edit or delete tasks.</p>
                    </div>
                )}

                {user && (
                    <>
                        <button
                            onClick={() => {
                                setCurrentTask(null);
                                setShowTaskForm(true);
                            }}
                            style={{
                                background: 'var(--primary)',
                                color: 'white',
                                padding: '0.7rem 1.5rem',
                                borderRadius: '8px',
                                marginBottom: '2rem'
                            }}
                        >
                            <Plus size={18} /> Add Task
                        </button>

                        {loading ? (
                            <p>Loading...</p>
                        ) : tasks.length === 0 ? (
                            <div className="glass" style={{ padding: '2rem' }}>
                                No tasks found.
                            </div>
                        ) : (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: '1.5rem'
                            }}>
                                {tasks.map((task) => (
                                    <div key={task._id} className="glass" style={{ padding: '1.5rem' }}>
                                        <h3>{task.title}</h3>
                                        <p>{task.description}</p>

                                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                            <button onClick={() => {
                                                setCurrentTask(task);
                                                setFormData(task);
                                                setShowTaskForm(true);
                                            }}>
                                                <Edit2 size={16} />
                                            </button>

                                            <button onClick={() => handleDelete(task._id)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {showTaskForm && (
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <form onSubmit={handleSubmit} className="glass" style={{
                            padding: '2rem',
                            width: '100%',
                            maxWidth: '400px'
                        }}>
                            <input
                                type="text"
                                placeholder="Title"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                style={{ width: '100%', marginBottom: '1rem' }}
                            />

                            <textarea
                                placeholder="Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                style={{ width: '100%', marginBottom: '1rem' }}
                            />

                            <button type="submit" style={{
                                background: 'var(--primary)',
                                color: 'white',
                                padding: '0.7rem 1.5rem',
                                borderRadius: '8px'
                            }}>
                                {currentTask ? "Update" : "Create"}
                            </button>
                        </form>
                    </div>
                )}

            </main>
        </div>
    );
}