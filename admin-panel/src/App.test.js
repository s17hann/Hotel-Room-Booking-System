import { render, screen } from '@testing-library/react';
import App from './App';

test('renders admin panel welcome', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to Beach Resort Admin Panel!/i);
  expect(linkElement).toBeInTheDocument();
});
