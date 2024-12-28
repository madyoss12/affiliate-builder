import { render, screen } from '@testing-library/react'
import { StatsCard } from '@/components/dashboard/analytics/stats-card'

describe('StatsCard', () => {
  const defaultProps = {
    title: 'Visiteurs',
    value: '1,234',
    change: '+12.3%',
    changeType: 'positive' as const,
    icon: () => <svg data-testid="stats-icon" />
  }

  it('renders stats card with all information', () => {
    render(<StatsCard {...defaultProps} />)
    
    expect(screen.getByText('Visiteurs')).toBeInTheDocument()
    expect(screen.getByText('1,234')).toBeInTheDocument()
    expect(screen.getByText('+12.3%')).toBeInTheDocument()
    expect(screen.getByTestId('stats-icon')).toBeInTheDocument()
  })

  it('applies correct color for positive change', () => {
    render(<StatsCard {...defaultProps} />)
    
    const changeElement = screen.getByText('+12.3%')
    expect(changeElement).toHaveClass('text-green-600')
  })

  it('applies correct color for negative change', () => {
    render(
      <StatsCard
        {...defaultProps}
        change="-5.2%"
        changeType="negative"
      />
    )
    
    const changeElement = screen.getByText('-5.2%')
    expect(changeElement).toHaveClass('text-red-600')
  })

  it('handles undefined change value', () => {
    render(
      <StatsCard
        {...defaultProps}
        change={undefined}
      />
    )
    
    expect(screen.queryByText('%')).not.toBeInTheDocument()
  })
})
