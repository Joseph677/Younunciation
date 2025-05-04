import { Link } from 'react-router';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to Younunciation – your pronunciation practice app!</p>
      <Link to="/login">Go to Login</Link>
      <br />
      <Link to="/signup">Create an Account</Link>

    </div>
  );
}

export default Home;
