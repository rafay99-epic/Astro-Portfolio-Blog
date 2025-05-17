import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import BlogPost from '../BlogPost'

// Mock external date formatter
jest.mock('date-fns', () => ({
  format: () => 'Formatted Date',
}))

afterEach(() => {
  cleanup()
})

const baseProps = {
  title: 'Sample Title',
  author: 'Author Name',
  date: '2025-05-01',
  content: '<p>Hello <strong>World</strong></p>',
  tags: ['testing', 'react'],
  imageUrl: 'http://example.com/img.png',
  summary: 'Short summary',
}

describe('BlogPost', () => {
  it('renders happy path correctly', () => {
    const { container } = render(<BlogPost {...baseProps} />)
    expect(screen.getByRole('heading', { name: /Sample Title/i })).toBeInTheDocument()
    expect(screen.getByText(/Author Name/i)).toBeInTheDocument()
    expect(screen.getByText(/Formatted Date/i)).toBeInTheDocument()
    expect(container.innerHTML).toContain('<strong>World</strong>')
    baseProps.tags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument()
    })
    expect(screen.getByRole('img')).toHaveAttribute('src', baseProps.imageUrl)
    expect(screen.getByText(baseProps.summary)).toBeInTheDocument()
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<BlogPost {...baseProps} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('does not render tags section when tags is empty', () => {
    render(<BlogPost {...baseProps} tags={[]} />)
    expect(screen.queryByTestId('tags-container')).toBeNull()
  })

  it('renders fallback message when content is empty', () => {
    render(<BlogPost {...baseProps} content="" />)
    expect(screen.getByText(/No content available/i)).toBeInTheDocument()
  })

  it('omits image and summary when optional props are missing', () => {
    const { queryByRole, queryByText } = render(
      <BlogPost
        title={baseProps.title}
        author={baseProps.author}
        date={baseProps.date}
        content={baseProps.content}
        tags={baseProps.tags}
      />
    )
    expect(queryByRole('img')).toBeNull()
    expect(queryByText(baseProps.summary)).toBeNull()
  })

  it('formats the date using mocked date-fns', () => {
    render(<BlogPost {...baseProps} />)
    expect(screen.getByText(/Formatted Date/i)).toBeInTheDocument()
  })

  it('throws if title prop is missing', () => {
    // @ts-expect-error
    expect(() => render(<BlogPost {...{ ...baseProps, title: undefined }} />)).toThrow()
  })
})