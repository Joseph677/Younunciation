import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [accent, setAccent] = useState('english'); // you can change to 'us' or 'uk'
  const [ygWidget, setYgWidget] = useState(null);

  useEffect(() => {
    // Load YouGlish widget script
    const script = document.createElement('script');
    script.src = 'https://youglish.com/public/emb/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Define global init function
    window.onYouglishAPIReady = () => {
      const widget = new window.YG.Widget('widget-container', {
        width: 640,
        components: 9,
        events: {
          onFetchDone: (e) => {
            if (e.totalResult === 0) alert('No result found');
          }
        }
      });
      setYgWidget(widget);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (ygWidget && keyword.trim()) {
      ygWidget.fetch(keyword, accent);
    }
  };

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch {
      console.error('Failed to logout');
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user.email}</p>
      <h2>Welcome to Younunciation</h2>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter a word..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select value={accent} onChange={(e) => setAccent(e.target.value)}>
          <option value="us">US Accent</option>
          <option value="uk">UK Accent</option>
          <option value="english">All English</option>
        </select>
        <button type="submit">Search</button>
      </form>

      <div id="widget-container" style={{ marginTop: '20px' }}></div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
