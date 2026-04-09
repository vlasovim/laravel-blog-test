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
            <h1 className="page-title">New Article</h1>
            <form onSubmit={handleSubmit} className="card">
                <div className="form-field">
                    <label className="form-label">Title</label>
                    <input
                        className="form-input"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="Article title"
                    />
                    {errors.title && <span className="form-error">{errors.title[0]}</span>}
                </div>
                <div className="form-field">
                    <label className="form-label">Content</label>
                    <textarea
                        className="form-input form-textarea form-textarea-lg"
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        placeholder="Write your article..."
                    />
                    {errors.content && <span className="form-error">{errors.content[0]}</span>}
                </div>
                <button type="submit" disabled={submitting} className="btn">
                    {submitting ? 'Publishing…' : 'Publish article'}
                </button>
            </form>
        </div>
    );
}