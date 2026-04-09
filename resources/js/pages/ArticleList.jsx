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
    if (error) return <p className="error-text">{error}</p>;

    return (
        <div>
            <h1 className="page-title">Articles</h1>
            {articles.length === 0 && <p>No articles yet.</p>}
            {articles.map((article) => (
                <article key={article.id} className="card">
                    <h2 className="article-title">
                        <Link to={`/articles/${article.id}`} className="article-title-link">
                            {article.title}
                        </Link>
                    </h2>
                    <p className="meta">{new Date(article.created_at).toLocaleDateString()}</p>
                    <p className="article-excerpt">
                        {article.content.length > 200
                            ? article.content.slice(0, 200) + '…'
                            : article.content}
                    </p>
                    <Link to={`/articles/${article.id}`} className="read-more">Read more →</Link>
                </article>
            ))}
        </div>
    );
}