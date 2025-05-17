// Testing framework: Jest & React Testing Library
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import BaseHead, { BaseHeadProps } from '../BaseHead';

describe('BaseHead component – additional scenarios', () => {
  afterEach(() => {
    cleanup();
    // Reset html lang to default after each test
    document.documentElement.lang = 'en';
  });

  it('renders the default title when no title prop is provided', () => {
    render(<BaseHead />);
    expect(screen.getByText('My Application')).toBeInTheDocument();
  });

  it('renders a custom title when title prop is provided', () => {
    const customTitle = 'Custom Title';
    render(<BaseHead title={customTitle} />);
    expect(screen.getByText(customTitle)).toBeInTheDocument();
  });

  it('sets the html lang attribute to default when no lang prop is provided', () => {
    render(<BaseHead />);
    expect(document.documentElement.lang).toBe('en');
  });

  it('sets the html lang attribute when lang prop is provided', () => {
    render(<BaseHead lang="fr" />);
    expect(document.documentElement.lang).toBe('fr');
  });

  it('includes a meta description when description prop is provided', () => {
    const desc = 'Test meta description';
    render(<BaseHead description={desc} />);
    const meta = document.head.querySelector('meta[name="description"]');
    expect(meta).toBeInTheDocument();
    expect(meta?.getAttribute('content')).toBe(desc);
  });

  it('omits the meta description when description prop is undefined', () => {
    render(<BaseHead description={undefined} />);
    expect(document.head.querySelector('meta[name="description"]')).toBeNull();
  });

  it('renders any children into the head via Helmet', () => {
    const link = <link rel="icon" href="/favicon.ico" data-testid="favicon" />;
    render(<BaseHead>{link}</BaseHead>);
    expect(document.head.querySelector('[data-testid="favicon"]')).toBeTruthy();
  });

  it('handles an empty string as title (edge case)', () => {
    render(<BaseHead title="" />);
    // When title is empty string, Helmet should still render an empty <title> element
    const titleEl = document.head.querySelector('title');
    expect(titleEl?.textContent).toBe('');
  });
});