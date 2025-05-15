import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import supabase from '../supabase';
import '../styles/Signup.css';
import FormInput from './FormInput';
import Button from './Button';
import CardContainer from './CardContainer';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Validate name fields - only allow alphabetical characters and spaces
  const validateName = (value) => {
    if (!value) return '';
    
    // Check if input contains only letters and spaces
    if (!/^[A-Za-z\s]+$/.test(value)) {
      return 'Only alphabetical characters are allowed';
    }
    return '';
  };

  // Password validation
  const validatePassword = (value) => {
    if (!value) return '';
    
    if (value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Final validation check before submission
    const nameError = validateName(firstName) || validateName(lastName);
    const passwordError = validatePassword(password);
    
    if (nameError) {
      setError(nameError);
      return;
    }
    
    if (passwordError) {
      setError(passwordError);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Sign-up successful! Please check your email to verify your account.');
      setTimeout(() => navigate('/login'), 3000);
    }
  };

  const footerContent = (
    <Link to="/login">
      <Button variant="text" size="small">Already have an account? Login</Button>
    </Link>
  );

  return (
    <div className="signup-wrapper">
      <CardContainer 
        title="Sign Up" 
        footerContent={footerContent}
        className="signup-card"
      >
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <FormInput
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="Enter your first name"
            validateInput={validateName}
            errorMessage="Only alphabetical characters are allowed"
          />
          
          <FormInput
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Enter your last name"
            validateInput={validateName}
            errorMessage="Only alphabetical characters are allowed"
          />
          
          <FormInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          
          <FormInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create a password"
            validateInput={validatePassword}
          />
          
          <p className="password-hint">Password must be at least 6 characters</p>
          
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth
          >
            Sign Up
          </Button>
        </form>
      </CardContainer>
    </div>
  );
}

export default SignUp;