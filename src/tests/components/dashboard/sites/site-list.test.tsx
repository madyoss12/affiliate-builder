import { render, screen, fireEvent } from '@testing-library/react'
import { SiteList } from '@/components/dashboard/sites/site-list'

const mockSites = [
  {
    id: '1',
    name: 'Test Site 1',
    domain: { name: 'test1', customDomain: null },
    statistics: {
      visitors: 1000,
      pageviews: 2000,
      conversions: 50,
      revenue: 500
    }
  },
  {
    id: '2',
    name: 'Test Site 2',
    domain: { name: 'test2', customDomain: 'test2.com' },
    statistics: {
      visitors: 2000,
      pageviews: 4000,
      conversions: 100,
      revenue: 1000
    }
  }
]

describe('SiteList', () => {
  it('renders site list with data', () => {
    render(<SiteList sites={mockSites} />)
    
    expect(screen.getByText('Test Site 1')).toBeInTheDocument()
    expect(screen.getByText('Test Site 2')).toBeInTheDocument()
  })

  it('shows site details', () => {
    render(<SiteList sites={mockSites} />)
    
    expect(screen.getByText('1,000')).toBeInTheDocument() // visitors
    expect(screen.getByText('500€')).toBeInTheDocument() // revenue
  })

  it('handles empty sites array', () => {
    render(<SiteList sites={[]} />)
    
    expect(screen.getByText(/aucun site/i)).toBeInTheDocument()
  })

  it('shows correct domain information', () => {
    render(<SiteList sites={mockSites} />)
    
    expect(screen.getByText('test1.affiliate-builder.com')).toBeInTheDocument()
    expect(screen.getByText('test2.com')).toBeInTheDocument()
  })
})
