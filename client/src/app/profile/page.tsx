'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';
import { ArrowLeft, User, Mail, Calendar, Shield } from 'lucide-react';

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <ProtectedRoute>
            <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '2rem 1rem' }}>
                <div className="container">
                    <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                        <ArrowLeft size={18} /> Back to Dashboard
                    </Link>

                    <div className="glass fade-in" style={{ maxWidth: '800px', margin: '0 auto', overflow: 'hidden' }}>
                        <div style={{ height: '120px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}></div>
                        <div style={{ padding: '0 2rem 2rem 2rem', position: 'relative', marginTop: '-50px' }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                background: 'var(--card-bg)',
                                border: '4px solid var(--bg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                color: 'var(--primary)'
                            }}>
                                <User size={50} />
                            </div>

                            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{user?.name}</h1>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Manage your account settings and preferences.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                <div className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Mail style={{ color: 'var(--primary)' }} />
                                    <div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email Address</p>
                                        <p>{user?.email}</p>
                                    </div>
                                </div>
                                <div className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Calendar style={{ color: 'var(--primary)' }} />
                                    <div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Member Since</p>
                                        <p>{new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Shield style={{ color: 'var(--primary)' }} />
                                    <div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Account Status</p>
                                        <p style={{ color: 'var(--success)' }}>Verified</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
