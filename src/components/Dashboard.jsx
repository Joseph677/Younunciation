import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import '../styles/Dashboard.css'; // ✅ make sure you import the new CSS
import fetchVideo from '../fetchVideo';
import VideoFrame from './VideoFrame';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [accent, setAccent] = useState('english');
  const [ygWidget, setYgWidget] = useState(null);
  const [keywordDetected, setKeywordDetected] = useState(null)

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://youglish.com/public/emb/widget.js';
    script.async = true;
    document.body.appendChild(script);

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

  const handleSearchOriginal = async(e) => {
    e.preventDefault();
    let url = await fetchVideo(keyword)
    if(url) {
      setKeywordDetected(url)
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
    <div className="dashboard-wrapper">
      <div className="dashboard-card">
        <h1>Dashboard</h1>
        <p>Welcome <strong>{user.email.split('@')[0]}</strong></p>
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

        <button onClick={handleSearchOriginal}>Search using original method</button>

        {(keywordDetected &&
          <VideoFrame url={keywordDetected}/>
        )}

        <div id="widget-container" className="widget-box"></div>

        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
