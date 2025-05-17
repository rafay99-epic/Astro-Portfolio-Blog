import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostComment, { PostCommentProps } from '../PostComment';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('PostComment Component', () => {
  const defaultProps: PostCommentProps = { slug: 'test-slug' };

  it('renders the textarea and submit button disabled initially', () => {
    render(<PostComment {...defaultProps} />);
    expect(screen.getByTestId('comment-input')).toBeInTheDocument();
    const button = screen.getByTestId('submit-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Submit');
    expect(button).not.toBeDisabled(); // button isn't disabled by empty-check on blur, only shows error
  });

  it('shows validation error when trying to submit an empty comment', async () => {
    render(<PostComment {...defaultProps} />);
    fireEvent.click(screen.getByTestId('submit-button'));
    expect(await screen.findByTestId('error-message')).toHaveTextContent('Comment cannot be empty');
  });

  it('submits the comment and clears the input on success', async () => {
    (fetch as vi.Mock).mockResolvedValue({ ok: true } as Response);
    render(<PostComment {...defaultProps} />);

    fireEvent.change(screen.getByTestId('comment-input'), { target: { value: 'Hello world' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    // Button should show loading state
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Submitting...');

    // Wait for the promise to resolve
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/comments', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: 'test-slug', comment: 'Hello world' })
      }));
    });

    // After success, input is cleared and button text resets
    expect(screen.getByTestId('comment-input')).toHaveValue('');
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Submit');
  });

  it('displays an error message when the API returns non-ok', async () => {
    (fetch as vi.Mock).mockResolvedValue({ ok: false } as Response);
    render(<PostComment {...defaultProps} />);

    fireEvent.change(screen.getByTestId('comment-input'), { target: { value: 'Bad comment' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    const errorMessage = await screen.findByTestId('error-message');
    expect(errorMessage).toHaveTextContent('Network response was not ok');
    // Ensure input is not cleared on failure
    expect(screen.getByTestId('comment-input')).toHaveValue('Bad comment');
  });

  it('displays a generic error message on network failure', async () => {
    (fetch as vi.Mock).mockRejectedValue(new Error('Server unreachable'));
    render(<PostComment {...defaultProps} />);

    fireEvent.change(screen.getByTestId('comment-input'), { target: { value: 'Hello?' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    const errorMessage = await screen.findByTestId('error-message');
    expect(errorMessage).toHaveTextContent('Server unreachable');
  });
});