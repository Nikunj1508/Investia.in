import React, { useEffect, useState } from "react";

const RSS_FEED_URL = "https://www.moneycontrol.com/rss/MCtopnews.xml";

export default function Investia() {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  const fetchRSSFeed = async () => {
    try {
      const response = await fetch(`/api/rss?url=${encodeURIComponent(RSS_FEED_URL)}`);
      const data = await response.json();
      setArticles(data.items);
    } catch (error) {
      console.error("Error fetching RSS feed:", error);
    }
  };

  useEffect(() => {
    fetchRSSFeed();
  }, []);

  const handleAddArticle = () => {
    if (title && summary) {
      setArticles([{ title, summary, pubDate: new Date().toDateString() }, ...articles]);
      setTitle("");
      setSummary("");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: 'auto' }}>
      <h1 style={{ fontSize: 32, fontWeight: 'bold' }}>Investia - Daily Stock Market Updates</h1>

      <div style={{ marginTop: 30 }}>
        <h2 style={{ fontSize: 24 }}>Post a New Article</h2>
        <input
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <textarea
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <button onClick={handleAddArticle} style={{ padding: 10 }}>Post Article</button>
      </div>

      <div style={{ marginTop: 40 }}>
        {articles.map((article, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: 16, marginBottom: 16 }}>
            <h3 style={{ fontSize: 20 }}>{article.title}</h3>
            {article.pubDate && <p style={{ color: '#888' }}>{new Date(article.pubDate).toDateString()}</p>}
            <p>{article.summary || article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
