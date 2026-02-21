'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { Layout, User, LogOut, Grid } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            background: 'rgba(10, 10, 12, 0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '1rem 0'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link href="/" style={{
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'white'
                }}>
                    <Layout className="gradient-text" style={{ width: '28px', height: '28px' }} />
                    <span className="gradient-text">TaskFlow</span>
                </Link>

                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link href="/" className="nav-link">Home</Link>
                    {user ? (
                        <>
                            <Link href="/dashboard" className="nav-link">Dashboard</Link>
                            <Link href="/flashcards" className="nav-link">Flashcards</Link>
                            <Link href="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="nav-link">
                                <User size={18} />
                                {user.name}
                            </Link>
                            <button onClick={logout} className="glass" style={{
                                padding: '0.5rem 1.2rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: '#ff4d4d',
                                border: '1px solid rgba(255, 77, 77, 0.2)'
                            }}>
                                <LogOut size={18} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="nav-link">Login</Link>
                            <Link href="/register" className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <style jsx>{`
                .nav-link {
                    color: var(--text-muted);
                    font-weight: 500;
                    transition: color 0.3s;
                }
                .nav-link:hover {
                    color: var(--primary);
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
