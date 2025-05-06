import { Link } from 'react-router';
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-wrapper">
      <div className="home-card">
        <h1>Home</h1>
        <p>Welcome to Younunciation – your pronunciation practice app!</p>

        <div className="auth-buttons">
          <Link to="/login" className="btn">Go to Login</Link>
          <Link to="/signup" className="btn">Create an Account</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
