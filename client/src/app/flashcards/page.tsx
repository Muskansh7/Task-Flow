'use client';

import React, { useState, useEffect } from 'react';
import { taskService } from '@/services/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Plus, Trash2, Brain } from 'lucide-react';

interface Flashcard {
    _id: string;
    question: string;
    answer: string;
}

const FlashcardsPage = () => {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [newCard, setNewCard] = useState({ question: '', answer: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFlashcards();
    }, []);

    const fetchFlashcards = async () => {
        try {
            const res = await taskService.getFlashcards();
            setFlashcards(res.data);
        } catch (err) {
            console.error('Failed to fetch flashcards');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await taskService.createFlashcard(newCard);
            setFlashcards([...flashcards, res.data]);
            setNewCard({ question: '', answer: '' });
        } catch (err) {
            console.error('Failed to create flashcard');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await taskService.deleteFlashcard(id);
            setFlashcards(flashcards.filter(f => f._id !== id));
        } catch (err) {
            console.error('Failed to delete flashcard');
        }
    };

    return (
        <ProtectedRoute>
            <div className="container" style={{ padding: '4rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <Brain size={40} className="gradient-text" />
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Brain Flashcards</h1>
                </div>

                {/* Create Card Form */}
                <form onSubmit={handleCreate} className="glass" style={{ padding: '2rem', borderRadius: '24px', marginBottom: '4rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Question / Front</label>
                        <input
                            type="text"
                            className="input-field"
                            value={newCard.question}
                            onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
                            required
                            placeholder="e.g. What is React?"
                        />
                    </div>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Answer / Back</label>
                        <input
                            type="text"
                            className="input-field"
                            value={newCard.answer}
                            onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
                            required
                            placeholder="e.g. A JS library for building UIs"
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ height: '50px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Plus size={20} /> Add Card
                    </button>
                </form>

                {/* Flashcards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {flashcards.map((card) => (
                        <div key={card._id} className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front glass">
                                    <h3 style={{ textAlign: 'center', padding: '1rem', fontSize: '1.2rem' }}>{card.question}</h3>
                                    <span style={{ position: 'absolute', bottom: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Click to flip</span>
                                </div>
                                <div className="flip-card-back glass" style={{ borderColor: 'var(--primary)' }}>
                                    <p style={{ textAlign: 'center', padding: '1.5rem', fontSize: '1.1rem' }}>{card.answer}</p>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete(card._id); }}
                                        style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer' }}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {flashcards.length === 0 && !loading && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        <p>No flashcards yet. Create your first card above!</p>
                    </div>
                )}
            </div>

            <style jsx>{`
                .flip-card {
                    background-color: transparent;
                    width: 100%;
                    height: 200px;
                    perspective: 1000px;
                    cursor: pointer;
                }

                .flip-card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    transform-style: preserve-3d;
                }

                .flip-card:active .flip-card-inner,
                .flip-card:focus .flip-card-inner,
                .flip-card.flipped .flip-card-inner {
                    transform: rotateY(180deg);
                }
                
                /* We'll use a CSS class for toggling flip on click since :hover is annoying for flashcards */
                .flip-card:hover .flip-card-inner {
                    transform: rotateY(180deg);
                }

                .flip-card-front, .flip-card-back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    border-radius: 24px;
                }

                .flip-card-back {
                    transform: rotateY(180deg);
                    background: rgba(99, 102, 241, 0.1);
                }

                .input-field {
                    width: 100%;
                    padding: 0.8rem 1rem;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    color: white;
                    outline: none;
                }
                .input-field:focus {
                    border-color: var(--primary);
                }
            `}</style>
        </ProtectedRoute>
    );
};

export default FlashcardsPage;
