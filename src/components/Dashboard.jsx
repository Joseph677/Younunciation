import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import fetchVideo from '../fetchVideo';
import VideoFrame from './VideoFrame';
import Button from './Button';
import FormInput from './FormInput';
import CardContainer from './CardContainer';

// Accent selector component
const AccentSelector = ({ value, onChange }) => {
  return (
    <div className="accent-selector">
      <label>Select Accent:</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="us">US Accent</option>
        <option value="uk">UK Accent</option>
        <option value="all">All English</option>
      </select>
    </div>
  );
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [accent, setAccent] = useState('all');
  const [ygWidget, setYgWidget] = useState(null);
  const [keywordDetected, setKeywordDetected] = useState(null);
  const [searchError, setSearchError] = useState('');

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

  // Validate keyword - only allow alphabetical characters
  const validateKeyword = (value) => {
    if (!value) return '';

    // Check if input contains only letters
    if (!/^[A-Za-z]+$/.test(value)) {
      return 'Only alphabetical characters are allowed';
    }
    return '';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchError('');

    // Final validation
    const error = validateKeyword(keyword);
    if (error) {
      setSearchError(error);
      return;
    }

    if (ygWidget && keyword.trim()) {
      ygWidget.fetch(keyword, accent);
    }
  };

  const handleSearchOriginal = async (e) => {
    e.preventDefault();
    setSearchError('');

    // Final validation
    const error = validateKeyword(keyword);
    if (error) {
      setSearchError(error);
      return;
    }

    let url = await fetchVideo(keyword, accent);
    if (url) {
      setKeywordDetected(url);
    } else {
      setSearchError('No results found for this word');
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

  const headerRight = (
    <Button
      variant="danger"
      size="small"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );

  return (
    <div className="dashboard-wrapper">
      <CardContainer
        title="Younunciation"
        headerRight={headerRight}
        className="dashboard-card"
      >
        <p className="welcome-message">
          Welcome <strong>{user?.email?.split('@')[0]}</strong>! Search for a word to hear its pronunciation.
        </p>

        <form onSubmit={handleSearch} className="search-form">
          <div className="search-fields">
            <div className="form-group">
              <label htmlFor="keyword">Word to search</label>
              <input
                type="text"
                id="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter a word..."
              />
            </div>

            <AccentSelector
              value={accent}
              onChange={setAccent}
            />
          </div>

          {searchError && <p className="error-message">{searchError}</p>}

          <div className="search-buttons">
            <Button type="submit" variant="primary">
              Search with YouGlish
            </Button>

            <Button type="button" variant="secondary" onClick={handleSearchOriginal}>
              Search using original method
            </Button>
          </div>
        </form>


        {keywordDetected && (
          <div className="video-result">
            <h3>Found "{keyword}" in video:</h3>
            <VideoFrame url={keywordDetected} />
          </div>
        )}

        <div id="widget-container" className="widget-box"></div>
      </CardContainer>
    </div>
  );
}