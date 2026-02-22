'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { taskService } from '@/services/api';
import { Plus, Trash2, Edit2, X } from 'lucide-react';

const LOCAL_KEY = 'taskflow_local_tasks';

function getLocalTasks() {
    if (typeof window === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]'); } catch { return []; }
}
function saveLocalTasks(tasks: any[]) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(tasks));
}

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
        if (user) {
            fetchServerTasks();
        } else {
            setTasks(getLocalTasks());
        }
    }, [user]);

    const fetchServerTasks = async () => {
        setLoading(true);
        try {
            const res = await taskService.getTasks({});
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const resetForm = () => {
        setShowTaskForm(false);
        setCurrentTask(null);
        setFormData({ title: '', description: '', status: 'pending', priority: 'medium' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
            // Authenticated: use server
            try {
                if (currentTask) {
                    await taskService.updateTask(currentTask._id, formData);
                } else {
                    await taskService.createTask(formData);
                }
                resetForm();
                fetchServerTasks();
            } catch (err) { console.error(err); }
        } else {
            // Guest: use localStorage
            const localTasks = getLocalTasks();
            if (currentTask) {
                const updated = localTasks.map((t: any) =>
                    t._id === currentTask._id ? { ...t, ...formData } : t
                );
                saveLocalTasks(updated);
                setTasks(updated);
            } else {
                const newTask = { ...formData, _id: Date.now().toString(), createdAt: new Date().toISOString() };
                const updated = [...localTasks, newTask];
                saveLocalTasks(updated);
                setTasks(updated);
            }
            resetForm();
        }
    };

    const handleDelete = async (id: string) => {
        if (user) {
            try { await taskService.deleteTask(id); fetchServerTasks(); } catch (err) { console.error(err); }
        } else {
            const updated = getLocalTasks().filter((t: any) => t._id !== id);
            saveLocalTasks(updated);
            setTasks(updated);
        }
    };

    const priorityColor: Record<string, string> = {
        high: 'rgba(239,68,68,0.15)',
        medium: 'rgba(99,102,241,0.1)',
        low: 'rgba(34,197,94,0.1)',
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <main className="container" style={{ padding: '2rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem' }}>
                        {user ? `${user.name}'s Tasks` : 'Your Tasks'}
                    </h2>
                    {!user && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'rgba(99,102,241,0.1)', padding: '0.3rem 0.8rem', borderRadius: '20px', border: '1px solid rgba(99,102,241,0.2)' }}>
                            Guest mode · Tasks saved locally
                        </span>
                    )}
                </div>

                <button
                    onClick={() => { setCurrentTask(null); setShowTaskForm(true); }}
                    style={{
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '0.7rem 1.5rem',
                        borderRadius: '8px',
                        marginBottom: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    <Plus size={18} /> Add Task
                </button>

                {loading ? (
                    <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
                ) : tasks.length === 0 ? (
                    <div className="glass" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <p style={{ fontSize: '1.1rem' }}>No tasks yet. Click <strong>Add Task</strong> to get started!</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {tasks.map((task) => (
                            <div key={task._id} className="glass" style={{ padding: '1.5rem', borderRadius: '16px', background: priorityColor[task.priority] || 'transparent', borderLeft: `3px solid var(--primary)` }}>
                                <h3 style={{ marginBottom: '0.5rem', fontWeight: 700 }}>{task.title}</h3>
                                {task.description && <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{task.description}</p>}
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>{task.status}</span>
                                    <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>{task.priority}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.8rem' }}>
                                    <button onClick={() => { setCurrentTask(task); setFormData({ title: task.title, description: task.description, status: task.status, priority: task.priority }); setShowTaskForm(true); }}
                                        style={{ color: 'var(--primary)', background: 'rgba(99,102,241,0.1)', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        <Edit2 size={14} /> Edit
                                    </button>
                                    <button onClick={() => handleDelete(task._id)}
                                        style={{ color: '#ff4d4d', background: 'rgba(239,68,68,0.1)', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {showTaskForm && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
                        <form onSubmit={handleSubmit} className="glass" style={{ padding: '2rem', width: '100%', maxWidth: '420px', borderRadius: '20px', position: 'relative' }}>
                            <button type="button" onClick={resetForm} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                <X size={20} />
                            </button>
                            <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>{currentTask ? 'Edit Task' : 'New Task'}</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input type="text" placeholder="Task title" required value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="glass" style={{ padding: '0.8rem', borderRadius: '8px', color: 'white', border: '1px solid var(--border)', width: '100%' }} />

                                <textarea placeholder="Description (optional)" value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="glass" style={{ padding: '0.8rem', borderRadius: '8px', color: 'white', border: '1px solid var(--border)', width: '100%', minHeight: '80px', resize: 'vertical' }} />

                                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="glass" style={{ padding: '0.8rem', borderRadius: '8px', color: 'white', border: '1px solid var(--border)', width: '100%' }}>
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>

                                <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="glass" style={{ padding: '0.8rem', borderRadius: '8px', color: 'white', border: '1px solid var(--border)', width: '100%' }}>
                                    <option value="low">Low Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="high">High Priority</option>
                                </select>

                                <button type="submit" style={{ background: 'var(--primary)', color: 'white', padding: '0.9rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', marginTop: '0.5rem' }}>
                                    {currentTask ? 'Update Task' : 'Create Task'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
}