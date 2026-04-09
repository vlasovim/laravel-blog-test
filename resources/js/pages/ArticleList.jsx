import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../api';

export default function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getArticles()
            .then(({ data }) => setArticles(data.data))
            .catch(() => setError('Failed to load articles.'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1 style={styles.heading}>Articles</h1>
            {articles.length === 0 && <p>No articles yet.</p>}
            {articles.map((article) => (
                <article key={article.id} style={styles.card}>
                    <h2 style={styles.title}>
                        <Link to={`/articles/${article.id}`} style={styles.titleLink}>
                            {article.title}
                        </Link>
                    </h2>
                    <p style={styles.meta}>{new Date(article.created_at).toLocaleDateString()}</p>
                    <p style={styles.excerpt}>
                        {article.content.length > 200
                            ? article.content.slice(0, 200) + '…'
                            : article.content}
                    </p>
                    <Link to={`/articles/${article.id}`} style={styles.readMore}>Read more →</Link>
                </article>
            ))}
        </div>
    );
}

const styles = {
    heading: { fontSize: '1.75rem', marginBottom: '1.5rem', color: '#1e293b' },
    card: { background: '#fff', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,.08)' },
    title: { margin: '0 0 .25rem', fontSize: '1.25rem' },
    titleLink: { color: '#1e293b', textDecoration: 'none' },
    meta: { color: '#64748b', fontSize: '.85rem', margin: '0 0 .75rem' },
    excerpt: { color: '#475569', lineHeight: 1.6, margin: '0 0 1rem' },
    readMore: { color: '#3b82f6', fontSize: '.9rem', textDecoration: 'none' },
};