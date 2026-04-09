import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createArticle } from '../api';

export default function ArticleCreate() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ title: '', content: '' });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSubmitting(true);
        try {
            const { data } = await createArticle(form);
            navigate(`/articles/${data.data.id}`);
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors ?? {});
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h1 style={styles.heading}>New Article</h1>
            <form onSubmit={handleSubmit} style={styles.card}>
                <div style={styles.field}>
                    <label style={styles.label}>Title</label>
                    <input
                        style={styles.input}
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="Article title"
                    />
                    {errors.title && <span style={styles.err}>{errors.title[0]}</span>}
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Content</label>
                    <textarea
                        style={{ ...styles.input, height: '200px', resize: 'vertical' }}
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        placeholder="Write your article..."
                    />
                    {errors.content && <span style={styles.err}>{errors.content[0]}</span>}
                </div>
                <button type="submit" disabled={submitting} style={styles.btn}>
                    {submitting ? 'Publishing…' : 'Publish article'}
                </button>
            </form>
        </div>
    );
}

const styles = {
    heading: { fontSize: '1.75rem', marginBottom: '1.5rem', color: '#1e293b' },
    card: { background: '#fff', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,.08)' },
    field: { marginBottom: '1.25rem' },
    label: { display: 'block', marginBottom: '.35rem', fontWeight: 600, fontSize: '.875rem', color: '#374151' },
    input: { width: '100%', padding: '.6rem .75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box' },
    err: { color: '#ef4444', fontSize: '.8rem', marginTop: '.25rem', display: 'block' },
    btn: { background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', padding: '.6rem 1.25rem', cursor: 'pointer', fontSize: '1rem' },
};