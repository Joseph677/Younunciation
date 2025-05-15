import { Link } from 'react-router';
import "../styles/Home.css";
import Button from './Button';
import CardContainer from './CardContainer';

function Home() {
  return (
    <div className="home-wrapper">
      <CardContainer
        title="Younunciation"
        className="home-card"
      >
        <div className="app-description">
          <p>Welcome to Younunciation – your pronunciation practice app!</p>
          <p>Learn how to pronounce words correctly with real examples from videos.</p>
        </div>

        <div className="auth-buttons">
          <Link to="/login">
            <Button variant="primary" size="large">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline" size="large">Create an Account</Button>
          </Link>
        </div>
      </CardContainer>
    </div>
  );
}

export default Home;