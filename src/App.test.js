import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the GoogleLogin component for App tests
jest.mock('@react-oauth/google', () => ({
  ...jest.requireActual('@react-oauth/google'),
  GoogleOAuthProvider: ({ children }) => children,
  GoogleLogin: () => <button data-testid="google-login-button">Continue with Google</button>,
}));

describe('App Component', () => {
  test('renders login form', () => {
    render(<App />);
    
    // Check that the login form is rendered
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('renders Google login option', () => {
    render(<App />);
    
    // Check that Google login is available
    expect(screen.getByTestId('google-login-button')).toBeInTheDocument();
    expect(screen.getByText('or')).toBeInTheDocument();
  });

  test('renders app container with proper structure', () => {
    render(<App />);
    
    // Check that the app container is rendered
    const appContainer = screen.getByText('Login').closest('.App');
    expect(appContainer).toBeInTheDocument();
  });
});
