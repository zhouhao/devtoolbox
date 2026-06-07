import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the DevToolbox heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /devtoolbox/i })).toBeInTheDocument();
  });

  it('shows the "it\'s alive" placeholder', () => {
    render(<App />);
    expect(screen.getByText(/it's alive/i)).toBeInTheDocument();
  });
});
