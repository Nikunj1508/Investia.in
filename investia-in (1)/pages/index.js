import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

export default function Investia() {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  const handleAddArticle = () => {
    if (title && summary) {
      setArticles([{ title, summary, date: new Date().toDateString() }, ...articles]);
      setTitle("");
      setSummary("");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Investia - Daily Stock Market Updates</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Post a New Article</h2>
        <Input
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-2"
        />
        <Textarea
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleAddArticle}>Post Article</Button>
      </div>

      <div className="grid gap-4">
        {articles.map((article, index) => (
          <Card key={index} className="shadow-xl p-4 border">
            <CardContent>
              <h3 className="text-xl font-bold mb-1">{article.title}</h3>
              {article.date && <p className="text-sm text-gray-500 mb-2">{article.date}</p>}
              <p>{article.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
