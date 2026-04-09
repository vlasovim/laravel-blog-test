import React from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children }) {
    return (
        <div style={styles.wrapper}>
            <header style={styles.header}>
                <nav style={styles.nav}>
                    <Link to="/" style={styles.brand}>Laravel Blog</Link>
                    <Link to="/articles/create" style={styles.link}>+ New Article</Link>
                </nav>
            </header>
            <main style={styles.main}>{children}</main>
        </div>
    );
}

const styles = {
    wrapper: { fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#f8fafc' },
    header: { background: '#1e293b', padding: '0 2rem' },
    nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px', maxWidth: '800px', margin: '0 auto' },
    brand: { color: '#f1f5f9', textDecoration: 'none', fontWeight: 700, fontSize: '1.2rem' },
    link: { color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem' },
    main: { maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' },
};