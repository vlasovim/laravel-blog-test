import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticle, createComment } from '../api';

export default function ArticleShow() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({ author_name: '', content: '' });
    const [submitting, setSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        getArticle(id)
            .then(({ data }) => setArticle(data.data))
            .catch(() => setError('Article not found.'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors({});
        setSubmitting(true);
        try {
            const { data } = await createComment(id, form);
            setArticle((prev) => ({
                ...prev,
                comments: [...(prev.comments ?? []), data.data],
            }));
            setForm({ author_name: '', content: '' });
        } catch (err) {
            if (err.response?.status === 422) {
                setFormErrors(err.response.data.errors ?? {});
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <Link to="/" style={styles.back}>← Back</Link>
            <article style={styles.card}>
                <h1 style={styles.title}>{article.title}</h1>
                <p style={styles.meta}>{new Date(article.created_at).toLocaleDateString()}</p>
                <p style={styles.body}>{article.content}</p>
            </article>

            <section>
                <h2 style={styles.sectionTitle}>
                    Comments ({(article.comments ?? []).length})
                </h2>
                {(article.comments ?? []).length === 0 && <p>No comments yet. Be the first!</p>}
                {(article.comments ?? []).map((comment) => (
                    <div key={comment.id} style={styles.comment}>
                        <p style={styles.commentMeta}>
                            <strong>{comment.author_name}</strong> &middot;{' '}
                            {new Date(comment.created_at).toLocaleDateString()}
                        </p>
                        <p style={styles.commentBody}>{comment.content}</p>
                    </div>
                ))}

                <h3 style={styles.sectionTitle}>Add a comment</h3>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.field}>
                        <label style={styles.label}>Your name</label>
                        <input
                            style={styles.input}
                            value={form.author_name}
                            onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                            placeholder="John Doe"
                        />
                        {formErrors.author_name && <span style={styles.err}>{formErrors.author_name[0]}</span>}
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Comment</label>
                        <textarea
                            style={{ ...styles.input, height: '100px', resize: 'vertical' }}
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            placeholder="Your thoughts..."
                        />
                        {formErrors.content && <span style={styles.err}>{formErrors.content[0]}</span>}
                    </div>
                    <button type="submit" disabled={submitting} style={styles.btn}>
                        {submitting ? 'Posting…' : 'Post comment'}
                    </button>
                </form>
            </section>
        </div>
    );
}

const styles = {
    back: { color: '#3b82f6', textDecoration: 'none', fontSize: '.9rem', display: 'inline-block', marginBottom: '1rem' },
    card: { background: '#fff', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,.08)' },
    title: { fontSize: '1.75rem', margin: '0 0 .25rem', color: '#1e293b' },
    meta: { color: '#64748b', fontSize: '.85rem', margin: '0 0 1.25rem' },
    body: { color: '#334155', lineHeight: 1.7, whiteSpace: 'pre-wrap' },
    sectionTitle: { fontSize: '1.2rem', color: '#1e293b', margin: '0 0 1rem' },
    comment: { background: '#fff', borderRadius: '8px', padding: '1rem', marginBottom: '.75rem', boxShadow: '0 1px 3px rgba(0,0,0,.08)' },
    commentMeta: { margin: '0 0 .5rem', fontSize: '.875rem', color: '#64748b' },
    commentBody: { margin: 0, color: '#334155' },
    form: { background: '#fff', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,.08)' },
    field: { marginBottom: '1rem' },
    label: { display: 'block', marginBottom: '.35rem', fontWeight: 600, fontSize: '.875rem', color: '#374151' },
    input: { width: '100%', padding: '.6rem .75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box' },
    err: { color: '#ef4444', fontSize: '.8rem', marginTop: '.25rem', display: 'block' },
    btn: { background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', padding: '.6rem 1.25rem', cursor: 'pointer', fontSize: '1rem' },
};