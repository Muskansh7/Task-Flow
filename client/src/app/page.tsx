import Link from 'next/link';

export default function Home() {
    return (
        <main style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            textAlign: 'center'
        }}>
            <h1 className="gradient-text" style={{ fontSize: '4rem', fontWeight: 800 }}>
                TaskFlow
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px' }}>
                A powerful, responsive, and secure task management solution built with Next.js and Node.js.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <Link href="/login" className="glass" style={{
                    padding: '0.8rem 2rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    border: '1px solid var(--primary)'
                }}>
                    Login
                </Link>
                <Link href="/register" style={{
                    padding: '0.8rem 2rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    background: 'var(--primary)',
                    color: 'white'
                }}>
                    Get Started
                </Link>
            </div>
        </main>
    );
}
