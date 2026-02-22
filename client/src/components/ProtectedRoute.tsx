'use client';

import { useAuth } from '@/lib/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg)',
                color: 'var(--primary)'
            }}>
                <div className="fade-in">Loading...</div>
            </div>
        );
    }

    return <>{children}</>;
}
