import React, { useState } from 'react';
import { createComment } from '../api';

export default function CommentForm({ articleId, onCommentAdded }) {
    const [form, setForm] = useState({ author_name: '', content: '' });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSubmitting(true);
        try {
            const { data } = await createComment(articleId, form);
            onCommentAdded(data.data);
            setForm({ author_name: '', content: '' });
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors ?? {});
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card">
            <div className="form-field">
                <label className="form-label">Your name</label>
                <input
                    className="form-input"
                    value={form.author_name}
                    onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                    placeholder="John Doe"
                />
                {errors.author_name && <span className="form-error">{errors.author_name[0]}</span>}
            </div>
            <div className="form-field">
                <label className="form-label">Comment</label>
                <textarea
                    className="form-input form-textarea"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="Your thoughts..."
                />
                {errors.content && <span className="form-error">{errors.content[0]}</span>}
            </div>
            <button type="submit" disabled={submitting} className="btn">
                {submitting ? 'Posting…' : 'Post comment'}
            </button>
        </form>
    );
}