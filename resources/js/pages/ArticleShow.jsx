import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticle } from '../api';
import CommentForm from '../components/CommentForm';

export default function ArticleShow() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getArticle(id)
            .then(({ data }) => setArticle(data.data))
            .catch(() => setError('Article not found.'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleCommentAdded = (comment) => {
        setArticle((prev) => ({ ...prev, comments: [...(prev.comments ?? []), comment] }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error-text">{error}</p>;

    return (
        <div>
            <Link to="/" className="back-link">← Back</Link>

            <article className="card">
                <h1 className="page-title">{article.title}</h1>
                <p className="meta">{new Date(article.created_at).toLocaleDateString()}</p>
                <p className="article-body">{article.content}</p>
            </article>

            <section>
                <h2 className="section-title">Comments ({(article.comments ?? []).length})</h2>
                {(article.comments ?? []).length === 0 && <p>No comments yet. Be the first!</p>}
                {(article.comments ?? []).map((comment) => (
                    <div key={comment.id} className="card comment">
                        <p className="comment-meta">
                            <strong>{comment.author_name}</strong> &middot;{' '}
                            {new Date(comment.created_at).toLocaleDateString()}
                        </p>
                        <p className="comment-body">{comment.content}</p>
                    </div>
                ))}

                <h3 className="section-title">Add a comment</h3>
                <CommentForm articleId={id} onCommentAdded={handleCommentAdded} />
            </section>
        </div>
    );
}