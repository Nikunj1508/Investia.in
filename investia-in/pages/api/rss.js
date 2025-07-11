import Parser from 'rss-parser';

const parser = new Parser();

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing RSS feed URL' });
  }

  try {
    const feed = await parser.parseURL(url);
    const items = feed.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      summary: item.contentSnippet || item.content || '',
      description: item.contentSnippet || item.content || '',
    }));

    res.status(200).json({ items });
  } catch (error) {
    console.error('Failed to fetch RSS feed:', error);
    res.status(500).json({ error: 'Failed to fetch RSS feed' });
  }
}
