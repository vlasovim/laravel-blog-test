import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArticleList from './pages/ArticleList';
import ArticleShow from './pages/ArticleShow';
import ArticleCreate from './pages/ArticleCreate';
import Layout from './components/Layout';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<ArticleList />} />
                    <Route path="/articles/create" element={<ArticleCreate />} />
                    <Route path="/articles/:id" element={<ArticleShow />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

createRoot(document.getElementById('app')).render(<App />);