import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IndexPage, { getStaticProps } from '../index';
import * as fetchModule from '../../lib/fetchData';

afterEach(() => {
  jest.resetAllMocks();
  cleanup();
});

describe('IndexPage Component', () => {
  test('renders the main heading with the correct text', () => {
    render(<IndexPage title="Home" items={[]} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Home');
  });

  test('displays a list of items passed as props', () => {
    const items = ['First', 'Second', 'Third'];
    render(<IndexPage title="Test" items={items} />);
    items.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test('renders fallback UI when items prop is undefined', () => {
    render(<IndexPage title="Test" items={undefined as any} />);
    expect(screen.getByText(/no items available/i)).toBeInTheDocument();
  });

  test('calls onClick handler when button is clicked', () => {
    const handleClick = jest.fn();
    render(<IndexPage title="Test" items={[]} onClick={handleClick} />);
    userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('getStaticProps', () => {
  test('returns props with title and items on successful fetch', async () => {
    jest.spyOn(fetchModule, 'fetchItems').mockResolvedValue(['A', 'B']);
    const result = await getStaticProps();
    expect(fetchModule.fetchItems).toHaveBeenCalled();
    expect(result).toEqual({
      props: {
        title: 'Home',
        items: ['A', 'B'],
      },
    });
  });

  test('handles fetch errors in getStaticProps gracefully', async () => {
    jest.spyOn(fetchModule, 'fetchItems').mockRejectedValue(new Error('Network fail'));
    const result = await getStaticProps();
    expect(result).toEqual({
      props: {
        title: 'Home',
        items: [],
      },
    });
  });
});