import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

test('successful login shows the confirmation before opening the workspace', () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText(/enter username or cnic/i), {
    target: { value: 'admin' },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter password/i), {
    target: { value: 'password123' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'SIGN IN' }));
  expect(screen.getByRole('status')).toHaveTextContent(/login successful/i);
  expect(screen.getByText(/your hcm workspace is ready/i)).toBeInTheDocument();
  expect(localStorage.getItem('token')).toBe('mock_jwt_token_123456');
});
