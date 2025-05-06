import { Link } from 'react-router';
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-wrapper">
      <div className="home-card">
        <h1>Home</h1>
        <p>Welcome to Younunciation – your pronunciation practice app!</p>

        <div className="auth-links">
          <Link to="/login">Go to Login</Link>
          <Link to="/signup">Create an Account</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
