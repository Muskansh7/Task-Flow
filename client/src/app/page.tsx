'use client';

import Link from 'next/link';
import { Activity, Shield, Zap, CheckCircle, Smartphone, Globe } from 'lucide-react';

export default function Home() {
    return (
        <main style={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
            {/* 3D Background Elements (CSS only) */}
            <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
                <div className="blob" style={{ top: '10%', left: '5%', width: '300px', height: '300px', background: 'var(--primary)', opacity: 0.1, filter: 'blur(80px)', animation: 'float 10s infinite' }} />
                <div className="blob" style={{ bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'var(--secondary)', opacity: 0.1, filter: 'blur(100px)', animation: 'float 15s infinite reverse' }} />
            </div>

            {/* Hero Section */}
            <section style={{ height: '95vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 1.5rem' }}>
                <div className="fade-in" style={{ maxWidth: '900px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', padding: '0.5rem 1rem', borderRadius: '50px', border: '1px solid rgba(99, 102, 241, 0.2)', marginBottom: '2rem' }}>
                        <span style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', display: 'block' }} />
                        <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px' }}>NEW VERSION 2.0 IS LIVE</span>
                    </div>
                    <h1 className="gradient-text three-d-heading" style={{
                        fontSize: 'clamp(3rem, 10vw, 6rem)',
                        fontWeight: 900,
                        lineHeight: 1.1,
                        marginBottom: '1.5rem',
                        letterSpacing: '-2px',
                        transformStyle: 'preserve-3d'
                    }}>
                        Master Your Day,<br />One Task at a Time
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', marginBottom: '3rem', maxWidth: '700px', marginInline: 'auto', lineHeight: '1.6' }}>
                        Experience the most beautiful and fluid way to manage your work. TaskFlow combines premium design with powerful performance to keep you ahead.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/register" className="btn-primary">
                            Start Building Now
                        </Link>
                        <Link href="/login" className="btn-secondary glass">
                            Explore Dashboard
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Overlay */}
            <section className="container" style={{ paddingBottom: '10rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {[
                        { icon: <Shield size={28} />, title: "Secure Data", text: "End-to-end encryption for all your tasks and profile information." },
                        { icon: <Zap size={28} />, title: "Blazing Fast", text: "Built on Next.js 14 for lightning-fast responsiveness and global scale." },
                        { icon: <CheckCircle size={28} />, title: "3D Flashcards", text: "Learn and remember things faster with our interactive 3D flip cards." },
                        { icon: <Activity size={28} />, title: "Priority Glow", text: "Never miss critical work with our smart importance highlighting system." }
                    ].map((item, i) => (
                        <div key={i} className="glass card-hover" style={{ padding: '2.5rem', borderRadius: '32px' }}>
                            <div style={{
                                width: '56px',
                                height: '56px',
                                background: 'rgba(99, 102, 241, 0.1)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--primary)',
                                marginBottom: '1.5rem'
                            }}>
                                {item.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700 }}>{item.title}</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <style jsx global>{`
                .btn-primary {
                    background: var(--primary);
                    color: white;
                    padding: 1.2rem 2.8rem;
                    border-radius: 100px;
                    font-weight: 700;
                    font-size: 1.1rem;
                    box-shadow: 0 10px 40px -10px var(--primary);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .btn-primary:hover {
                    transform: translateY(-5px) scale(1.05);
                    box-shadow: 0 20px 50px -10px var(--primary);
                }
                .btn-secondary {
                    padding: 1.2rem 2.8rem;
                    border-radius: 100px;
                    font-weight: 700;
                    font-size: 1.1rem;
                    border: 1px solid var(--border);
                    transition: all 0.4s ease;
                }
                .btn-secondary:hover {
                    border-color: var(--primary);
                    background: rgba(255,255,255,0.05);
                }
                .card-hover {
                    transition: all 0.5s ease;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .card-hover:hover {
                    transform: translateY(-10px);
                    border-color: var(--primary);
                    box-shadow: 0 30px 60px -20px rgba(0,0,0,0.5);
                }
                .blob {
                    position: absolute;
                    border-radius: 50%;
                }
                @keyframes float {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
            `}</style>
        </main>
    );
}
