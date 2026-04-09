import React from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children }) {
    return (
        <div className="layout-wrapper">
            <header className="layout-header">
                <nav className="layout-nav">
                    <Link to="/" className="layout-brand">Laravel Blog</Link>
                    <Link to="/articles/create" className="layout-nav-link">+ New Article</Link>
                </nav>
            </header>
            <main className="layout-main">{children}</main>
        </div>
    );
}