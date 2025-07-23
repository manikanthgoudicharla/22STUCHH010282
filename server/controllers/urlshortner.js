const crypto = require('crypto');

const urlStore = {};

const urlshortner = (req, res) => {
  const { url, expiryMinutes } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const shortCode = crypto.randomBytes(4).toString('hex');
  const shortenedUrl = `${req.protocol}://${req.get('host')}/api/short.ly/${shortCode}`;
  const expiresAt = Date.now() + expiryMinutes * 60 * 1000;

  urlStore[shortCode] = { url, expiresAt };

  res.json({ shortenedUrl, expiresAt });
};

const redirectShortUrl = (req, res) => {
  const { shortCode } = req.params;
  const entry = urlStore[shortCode];

  if (!entry) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  if (Date.now() > entry.expiresAt) {
    return res.status(410).json({ error: 'Short URL expired' });
  }

  res.redirect(entry.url);
};

module.exports = { urlshortner, redirectShortUrl };
