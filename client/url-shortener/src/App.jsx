import { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [expiry, setExpiry] = useState(10);
  const [shortened, setShortened] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getToken = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3000/api/auth', { method: 'POST' });
      const data = await res.json();
      if (data.access_token) {
        setToken(data.access_token);
      } else {
        setError('Failed to get token');
      }
    } catch {
      setError('Error fetching token');
    }
    setLoading(false);
  };

  const handleShorten = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortened('');
    try {
      const res = await fetch('http://localhost:3000/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ url, expiryMinutes: expiry })
      });
      const data = await res.json();
      if (data.shortenedUrl) {
        setShortened(data.shortenedUrl);
      } else {
        setError(data.error || 'Failed to shorten URL');
      }
    } catch {
      setError('Error shortening URL');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">🔗 URL Shortener</h1>

        {!token ? (
          <button
            onClick={getToken}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Getting Token...' : 'Get Auth Token'}
          </button>
        ) : (
          <form onSubmit={handleShorten} className="space-y-4">
            <input
              type="text"
              placeholder="Enter full URL"
              value={url}
              onChange={e => setUrl(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              min={1}
              placeholder="Expiry (minutes)"
              value={expiry}
              onChange={e => setExpiry(Number(e.target.value))}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Shortening...' : 'Shorten URL'}
            </button>
          </form>
        )}

        {shortened && (
          <div className="text-center bg-gray-100 p-4 rounded-md border border-gray-300">
            <p className="text-gray-700">Shortened URL:</p>
            <a
              href={shortened}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium break-all underline"
            >
              {shortened}
            </a>
          </div>
        )}

        {error && (
          <p className="text-red-600 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}

export default App;
