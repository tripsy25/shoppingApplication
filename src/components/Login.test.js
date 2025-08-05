import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './Login';

// Mock the GoogleLogin component
jest.mock('@react-oauth/google', () => ({
  ...jest.requireActual('@react-oauth/google'),
  GoogleLogin: ({ onSuccess, onError }) => (
    <button 
      data-testid="google-login-button"
      onClick={() => onSuccess({ credential: 'mock-google-token' })}
    >
      Continue with Google
    </button>
  ),
}));

// Wrapper component to provide Google OAuth context
const LoginWithProvider = () => (
  <GoogleOAuthProvider clientId="test-client-id">
    <Login />
  </GoogleOAuthProvider>
);

// Mock console.log and alert
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('Login Component', () => {
  beforeEach(() => {
    mockConsoleLog.mockClear();
    mockAlert.mockClear();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
    mockAlert.mockRestore();
  });

  describe('Rendering', () => {
    test('renders login form with all elements', () => {
      render(<LoginWithProvider />);
      
      // Check for main elements
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
      expect(screen.getByText('or')).toBeInTheDocument();
      expect(screen.getByTestId('google-login-button')).toBeInTheDocument();
    });

    test('renders form with correct input types', () => {
      render(<LoginWithProvider />);
      
      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      
      expect(usernameInput).toHaveAttribute('type', 'text');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('renders required attributes on inputs', () => {
      render(<LoginWithProvider />);
      
      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      
      expect(usernameInput).toHaveAttribute('required');
      expect(passwordInput).toHaveAttribute('required');
    });
  });

  describe('Form Interactions', () => {
    test('updates username input value', async () => {
      const user = userEvent.setup();
      render(<LoginWithProvider />);
      
      const usernameInput = screen.getByPlaceholderText('Username');
      await user.type(usernameInput, 'testuser');
      
      expect(usernameInput).toHaveValue('testuser');
    });

    test('updates password input value', async () => {
      const user = userEvent.setup();
      render(<LoginWithProvider />);
      
      const passwordInput = screen.getByPlaceholderText('Password');
      await user.type(passwordInput, 'testpassword');
      
      expect(passwordInput).toHaveValue('testpassword');
    });

    test('handles form submission with valid data', async () => {
      const user = userEvent.setup();
      render(<LoginWithProvider />);
      
      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /login/i });
      
      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'testpassword');
      await user.click(submitButton);
      
      expect(mockConsoleLog).toHaveBeenCalledWith('Login attempt:', {
        username: 'testuser',
        password: 'testpassword'
      });
      expect(mockAlert).toHaveBeenCalledWith('Login attempt for user: testuser');
    });

    test('handles form submission with empty fields', async () => {
      const user = userEvent.setup();
      render(<LoginWithProvider />);
      
      const submitButton = screen.getByRole('button', { name: /login/i });
      
      // Try to submit without filling fields
      await user.click(submitButton);
      
      // Form should not submit due to required validation
      expect(mockConsoleLog).not.toHaveBeenCalled();
      expect(mockAlert).not.toHaveBeenCalled();
    });

    test('clears form after submission', async () => {
      const user = userEvent.setup();
      render(<LoginWithProvider />);
      
      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /login/i });
      
      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'testpassword');
      await user.click(submitButton);
      
      // Form should be cleared after submission
      expect(usernameInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
    });
  });

  describe('Google Login', () => {
    test('renders Google login button', () => {
      render(<LoginWithProvider />);
      
      const googleButton = screen.getByTestId('google-login-button');
      expect(googleButton).toBeInTheDocument();
      expect(googleButton).toHaveTextContent('Continue with Google');
    });

    test('handles Google login success', async () => {
      const user = userEvent.setup();
      render(<LoginWithProvider />);
      
      const googleButton = screen.getByTestId('google-login-button');
      await user.click(googleButton);
      
      expect(mockConsoleLog).toHaveBeenCalledWith('Google login success:', {
        credential: 'mock-google-token'
      });
      expect(mockAlert).toHaveBeenCalledWith('Google login successful!');
    });
  });

  describe('Accessibility', () => {
    test('has proper form structure', () => {
      render(<LoginWithProvider />);
      
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
    });

    test('inputs have proper labels and IDs', () => {
      render(<LoginWithProvider />);
      
      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      
      expect(usernameInput).toHaveAttribute('id', 'username');
      expect(passwordInput).toHaveAttribute('id', 'password');
    });

    test('submit button is accessible', () => {
      render(<LoginWithProvider />);
      
      const submitButton = screen.getByRole('button', { name: /login/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });

  describe('Styling and CSS Classes', () => {
    test('has correct CSS classes', () => {
      render(<LoginWithProvider />);
      
      expect(screen.getByText('Login').closest('div')).toHaveClass('login-card');
      expect(screen.getByRole('form')).toHaveClass('login-form');
      expect(screen.getByPlaceholderText('Username').closest('div')).toHaveClass('form-group');
      expect(screen.getByPlaceholderText('Password').closest('div')).toHaveClass('form-group');
    });
  });

  describe('Error Handling', () => {
    test('handles special characters in input', async () => {
      const user = userEvent.setup();
      render(<LoginWithProvider />);
      
      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      
      await user.type(usernameInput, 'user@123!');
      await user.type(passwordInput, 'pass@word#123');
      
      expect(usernameInput).toHaveValue('user@123!');
      expect(passwordInput).toHaveValue('pass@word#123');
    });

    test('handles long input values', async () => {
      const user = userEvent.setup();
      render(<LoginWithProvider />);
      
      const usernameInput = screen.getByPlaceholderText('Username');
      const longUsername = 'a'.repeat(100);
      
      await user.type(usernameInput, longUsername);
      expect(usernameInput).toHaveValue(longUsername);
    });
  });
}); 