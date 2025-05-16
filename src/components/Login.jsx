import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import "../styles/Login.css";
import FormInput from './FormInput';
import Button from './Button';
import CardContainer from './CardContainer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to login');
    }
  }

  const footerContent = (
    <Link className="back-home" to="/">
      <Button variant="text" size="small">← Back to Home</Button>
    </Link>
  );

  return (
    <div className="login-wrapper">
      <CardContainer 
        title="Login" 
        footerContent={footerContent}
        className="login-card"
      >
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <FormInput className="form-group"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />

          <FormInput className="form-group"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />

          <Button 
            type="submit" 
            variant="primary" 
            fullWidth
          >
            Login
          </Button>
        </form>

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Create an Account</Link>
        </p>
      </CardContainer>
    </div>
  );
}