const express = require('express');
const router = express.Router();
const cors = require('cors');
const { urlshortner, redirectShortUrl } = require('../controllers/urlshortner');
const auth = require('../controllers/auth');
const verifyToken = require('../middleware/verifyToken');

router.use(cors());
router.use(express.json());

router.post('/auth', auth);
router.post('/shorten', verifyToken, urlshortner);
router.get('/short.ly/:shortCode', redirectShortUrl);

router.get('/', (req, res) => {
  res.send('Welcome to the URL Shortener API');
});

module.exports = router;
