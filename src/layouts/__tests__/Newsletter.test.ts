import React from 'react'
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import Newsletter, { validateEmail } from '../Newsletter'</newLines>

<rationale>
Added a comprehensive test suite at the end of the file, covering initial render, validation errors, success and error flows for the newsletter subscription, and pure unit tests for the `validateEmail` helper.
</rationale>
<startLine>42</startLine>
<endLine>42</endLine>
<newLines>describe('Newsletter Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  test('renders email input and subscribe button', () => {
    render(<Newsletter />)
    expect(screen.getByPlaceholderText(/enter your email address/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
  })

  test('shows error when submitting empty email', async () => {
    render(<Newsletter />)
    fireEvent.click(screen.getByRole('button', { name: /subscribe/i }))
    expect(await screen.findByText(/please enter a valid email address\./i)).toBeInTheDocument()
  })

  test('shows validation error for invalid email format', async () => {
    render(<Newsletter />)
    fireEvent.change(screen.getByPlaceholderText(/enter your email address/i), { target: { value: 'invalid-email' } })
    fireEvent.click(screen.getByRole('button', { name: /subscribe/i }))
    expect(await screen.findByText(/please enter a valid email address\./i)).toBeInTheDocument()
  })

  test('submits valid email and shows success message', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Subscribed!' })
    } as Response)

    render(<Newsletter />)
    fireEvent.change(screen.getByPlaceholderText(/enter your email address/i), { target: { value: 'user@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /subscribe/i }))

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/newsletter'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(await screen.findByText(/subscribed!/i)).toBeInTheDocument()
  })

  test('shows server error message on failed subscription', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Server error' })
    } as Response)

    render(<Newsletter />)
    fireEvent.change(screen.getByPlaceholderText(/enter your email address/i), { target: { value: 'user@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /subscribe/i }))

    expect(await screen.findByText(/server error/i)).toBeInTheDocument()
  })

  test('shows network error message on fetch failure', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network failure'))

    render(<Newsletter />)
    fireEvent.change(screen.getByPlaceholderText(/enter your email address/i), { target: { value: 'user@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /subscribe/i }))

    expect(await screen.findByText(/network error\. please try again\./i)).toBeInTheDocument()
  })
})

describe('validateEmail helper', () => {
  test('returns true for valid email', () => {
    expect(validateEmail('test@domain.com')).toBe(true)
  })

  test('returns false for missing "@" symbol', () => {
    expect(validateEmail('invalid-email')).toBe(false)
  })
})