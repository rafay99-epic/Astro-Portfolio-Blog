// Tests use Jest and React Testing Library
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PostComment from '../PostComment'

describe('PostComment component', () => {
  it('submits trimmed comment when valid text is entered', async () => {
    const mockOnSubmit = jest.fn().mockResolvedValue(undefined)
    render(<PostComment postId="post-1" onSubmit={mockOnSubmit} />)
    const textarea = screen.getByPlaceholderText(/add a comment/i)
    await userEvent.type(textarea, '   Hello World!   ')
    const button = screen.getByRole('button', { name: /post comment/i })
    userEvent.click(button)
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      expect(mockOnSubmit).toHaveBeenCalledWith('post-1', 'Hello World!')
    })
  })

  it('shows validation error and does not submit when input is empty', async () => {
    const mockOnSubmit = jest.fn()
    render(<PostComment postId="post-1" onSubmit={mockOnSubmit} />)
    const button = screen.getByRole('button', { name: /post comment/i })
    userEvent.click(button)
    expect(await screen.findByText(/comment cannot be empty/i)).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('prevents submission when comment exceeds maximum length', async () => {
    const longComment = 'a'.repeat(1001)
    const mockOnSubmit = jest.fn()
    render(<PostComment postId="post-1" onSubmit={mockOnSubmit} />)
    const textarea = screen.getByPlaceholderText(/add a comment/i)
    await userEvent.type(textarea, longComment)
    const button = screen.getByRole('button', { name: /post comment/i })
    userEvent.click(button)
    expect(await screen.findByText(/comment is too long/i)).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('disables submit button when loading is true', () => {
    const mockOnSubmit = jest.fn()
    render(<PostComment postId="post-1" onSubmit={mockOnSubmit} loading={true} />)
    const button = screen.getByRole('button', { name: /post comment/i })
    expect(button).toBeDisabled()
  })

  it('displays an error when submission fails', async () => {
    const mockOnSubmit = jest.fn().mockRejectedValue(new Error('Network error'))
    render(<PostComment postId="post-1" onSubmit={mockOnSubmit} />)
    const textarea = screen.getByPlaceholderText(/add a comment/i)
    await userEvent.type(textarea, 'Test comment')
    const button = screen.getByRole('button', { name: /post comment/i })
    userEvent.click(button)
    expect(await screen.findByText(/failed to post comment/i)).toBeInTheDocument()
  })

  it('clears the input after successful submission', async () => {
    const mockOnSubmit = jest.fn().mockResolvedValue(undefined)
    render(<PostComment postId="post-1" onSubmit={mockOnSubmit} />)
    const textarea = screen.getByPlaceholderText(/add a comment/i)
    await userEvent.type(textarea, 'Clear me')
    const button = screen.getByRole('button', { name: /post comment/i })
    userEvent.click(button)
    await waitFor(() => {
      expect(textarea).toHaveValue('')
    })
  })
})