import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import SkillList from './SkillList.jsx'

describe('SkillList', () => {
  test('renders one list item per entry', () => {
    render(<SkillList items={['PyTorch', 'Docker']} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('PyTorch')).toBeInTheDocument()
  })

  test('adds the compact modifier only when asked', () => {
    const { container, rerender } = render(<SkillList items={['A']} />)
    expect(container.querySelector('ul')).toHaveClass('skill-list')
    expect(container.querySelector('ul')).not.toHaveClass('compact')

    rerender(<SkillList items={['A']} compact />)
    expect(container.querySelector('ul')).toHaveClass('compact')
  })

  test('renders nothing for an empty list', () => {
    render(<SkillList items={[]} />)
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })
})
