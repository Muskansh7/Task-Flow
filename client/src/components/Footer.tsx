'use client';

import React from 'react';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            background: 'var(--bg-dark)',
            borderTop: '1px solid var(--border)',
            padding: '5rem 0 2rem',
            marginTop: 'auto'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '4rem',
                    marginBottom: '4rem'
                }}>
                    <div>
                        <h3 className="gradient-text" style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1.5rem' }}>TaskFlow</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '2rem' }}>
                            Redefining productivity through premium design and high-performance engineering. Join the flow today.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="#" className="glass" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}><Twitter size={18} /></a>
                            <a href="#" className="glass" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}><Github size={18} /></a>
                            <a href="#" className="glass" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}><Linkedin size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Features</h4>
                        <ul className="footer-links">
                            <li><a href="#hero">Real-time Sync</a></li>
                            <li><a href="#hero">Glow Highlighting</a></li>
                            <li><a href="/flashcards">3D Flashcards</a></li>
                            <li><a href="#hero">Team Collaboration</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Contact Us</h4>
                        <ul className="footer-links">
                            <li><span style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><Mail size={16} /> support@taskflow.io</span></li>
                            <li><span style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><Phone size={16} /> +1 (555) 000-TASK</span></li>
                            <li><span style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><MapPin size={16} /> Silicon Valley, CA</span></li>
                        </ul>
                    </div>
                </div>

                <div style={{
                    paddingTop: '2rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem'
                }}>
                    © 2026 TaskFlow Inc. Built with passion for excellence.
                </div>
            </div>

            <style jsx>{`
                .footer-links {
                    list-style: none;
                    padding: 0;
                }
                .footer-links li {
                    margin-bottom: 1rem;
                    color: var(--text-muted);
                }
                .footer-links a {
                    color: inherit;
                    transition: color 0.3s;
                }
                .footer-links a:hover {
                    color: var(--primary);
                }
            `}</style>
        </footer>
    );
};

export default Footer;
