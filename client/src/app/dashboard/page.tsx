'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { taskService } from '@/services/api';
import { Plus, Search, Filter, LogOut, User, Trash2, Edit2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [currentTask, setCurrentTask] = useState<any>(null);
    const [formData, setFormData] = useState({ title: '', description: '', status: 'pending', priority: 'medium' });

    useEffect(() => {
        fetchTasks();
    }, [filterStatus]);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await taskService.getTasks({ search, status: filterStatus });
            setTasks(res.data);
        } catch (err) {
            console.error('Failed to fetch tasks', err);
        }
        setLoading(false);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchTasks();
    };

    const handleCreateOrUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentTask) {
                await taskService.updateTask(currentTask._id, formData);
            } else {
                await taskService.createTask(formData);
            }
            setShowTaskForm(false);
            setCurrentTask(null);
            setFormData({ title: '', description: '', status: 'pending', priority: 'medium' });
            fetchTasks();
        } catch (err) {
            console.error('Failed to save task', err);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskService.deleteTask(id);
                fetchTasks();
            } catch (err) {
                console.error('Failed to delete task', err);
            }
        }
    };

    const openEditForm = (task: any) => {
        setCurrentTask(task);
        setFormData({
            title: task.title,
            description: task.description || '',
            status: task.status,
            priority: task.priority || 'medium'
        });
        setShowTaskForm(true);
    };

    return (
        <ProtectedRoute>
            <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

                <main className="container" style={{ padding: '2rem 0' }}>
                    {/* Header & Controls */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <h2 style={{ fontSize: '1.8rem' }}>Your Tasks</h2>
                        <button
                            onClick={() => { setCurrentTask(null); setFormData({ title: '', description: '', status: 'pending', priority: 'medium' }); setShowTaskForm(true); }}
                            style={{ background: 'var(--primary)', color: 'white', padding: '0.7rem 1.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}
                        >
                            <Plus size={20} /> Add Task
                        </button>
                    </div>

                    {/* Search & Filter */}
                    <div className="glass" style={{ padding: '1rem', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', gap: '0.5rem', minWidth: '250px' }}>
                            <div style={{ position: 'relative', flex: 1 }}>
                                <Search size={18} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    className="glass"
                                    style={{ width: '100%', padding: '0.7rem 0.7rem 0.7rem 2.5rem', borderRadius: '8px', color: 'white', border: '1px solid var(--border)' }}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <button type="submit" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', padding: '0 1rem', borderRadius: '8px', color: 'white' }}>Search</button>
                        </form>

                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <Filter size={18} style={{ color: 'var(--text-muted)' }} />
                            <select
                                className="glass"
                                style={{ padding: '0.7rem', borderRadius: '8px', color: 'white', border: '1px solid var(--border)' }}
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    {/* Task Grid */}
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading tasks...</div>
                    ) : tasks.length === 0 ? (
                        <div className="glass" style={{ textAlign: 'center', padding: '4rem' }}>
                            <p style={{ color: 'var(--text-muted)' }}>No tasks found. Start by creating one!</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {tasks.map((task: any) => (
                                <div
                                    key={task._id}
                                    className={`glass fade-in task-card ${task.priority === 'high' ? 'priority-high' : ''}`}
                                    style={{
                                        padding: '1.5rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1rem',
                                        border: task.priority === 'high' ? '1px solid rgba(255, 77, 77, 0.5)' : task.priority === 'medium' ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid var(--border)',
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{task.title}</h3>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => openEditForm(task)} style={{ color: 'var(--text-muted)' }}><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(task._id)} style={{ color: 'var(--danger)' }}><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', flex: 1, lineHeight: '1.5' }}>{task.description}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            padding: '0.3rem 0.6rem',
                                            borderRadius: '20px',
                                            background: task.status === 'completed' ? 'rgba(16, 185, 129, 0.1)' : task.status === 'in-progress' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(148, 163, 184, 0.1)',
                                            color: task.status === 'completed' ? 'var(--success)' : task.status === 'in-progress' ? 'var(--primary)' : 'var(--text-muted)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.3rem'
                                        }}>
                                            {task.status === 'completed' ? <CheckCircle size={12} /> : task.status === 'in-progress' ? <Clock size={12} /> : <AlertCircle size={12} />}
                                            {task.status}
                                        </span>
                                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                                            {new Date(task.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>

                {/* Task Form Modal */}
                {showTaskForm && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
                        <div className="glass" style={{ padding: '2rem', width: '100%', maxWidth: '500px' }}>
                            <h2 style={{ marginBottom: '1.5rem' }}>{currentTask ? 'Edit Task' : 'New Task'}</h2>
                            <form onSubmit={handleCreateOrUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <label style={{ fontSize: '0.9rem' }}>Title</label>
                                    <input
                                        type="text" required className="glass" style={{ padding: '0.8rem', borderRadius: '8px', color: 'white', border: '1px solid var(--border)' }}
                                        value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <label style={{ fontSize: '0.9rem' }}>Description</label>
                                    <textarea
                                        className="glass" rows={3} style={{ padding: '0.8rem', borderRadius: '8px', color: 'white', border: '1px solid var(--border)', resize: 'none' }}
                                        value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        <label style={{ fontSize: '0.9rem' }}>Status</label>
                                        <select className="glass" style={{ padding: '0.8rem', borderRadius: '8px', color: 'white', border: '1px solid var(--border)' }}
                                            value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        <label style={{ fontSize: '0.9rem' }}>Priority</label>
                                        <select className="glass" style={{ padding: '0.8rem', borderRadius: '8px', color: 'white', border: '1px solid var(--border)' }}
                                            value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button type="button" onClick={() => setShowTaskForm(false)} style={{ flex: 1, border: '1px solid var(--border)', padding: '0.8rem', borderRadius: '8px' }}>Cancel</button>
                                    <button type="submit" style={{ flex: 1, background: 'var(--primary)', padding: '0.8rem', borderRadius: '8px', fontWeight: 600 }}>{currentTask ? 'Update' : 'Create'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <style jsx>{`
                .task-card {
                    transition: all 0.3s ease;
                }
                .task-card:hover {
                    transform: translateY(-5px);
                }
                .priority-high {
                    background: linear-gradient(135deg, rgba(255, 77, 77, 0.05) 0%, rgba(10, 10, 12, 0.8) 100%);
                }
            `}</style>
        </ProtectedRoute>
    );
}
