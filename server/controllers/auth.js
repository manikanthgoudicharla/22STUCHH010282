const fetch = require('node-fetch');

async function getToken(credentials) {
  try {
    const response = await fetch('http://20.244.56.144/evaluation-service/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch token:', error);
    return null;
  }
}

async function auth(req, res) {
  const credentials = {
    email: "gmanikanth.22@ifheindia.org",
    name: "goudicharla manikanth",
    rollNo: "22stuchh010282",
    accessCode: "bCuCFT",
    clientID: "7b52ba52-8822-46b9-90c6-dd761f50f678",
    clientSecret: "zSRatzAAXFWjAVte"
  };

  const tokenResponse = await getToken(credentials);

  if (!tokenResponse || !tokenResponse.access_token) {
    return res.status(500).json({ error: 'Failed to generate token' });
  }

  res.json(tokenResponse);
}

module.exports = auth;
