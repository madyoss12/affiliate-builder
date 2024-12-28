import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CreateSiteForm } from '@/components/dashboard/sites/create-site-form'

describe('CreateSiteForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('renders create site form', () => {
    render(<CreateSiteForm onSubmit={mockOnSubmit} />)
    
    expect(screen.getByLabelText(/nom du site/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/sous-domaine/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/template/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /créer/i })).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    render(<CreateSiteForm onSubmit={mockOnSubmit} />)
    
    const submitButton = screen.getByRole('button', { name: /créer/i })
    fireEvent.click(submitButton)
    
    expect(await screen.findByText(/nom est requis/i)).toBeInTheDocument()
    expect(await screen.findByText(/sous-domaine est requis/i)).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('validates subdomain format', async () => {
    render(<CreateSiteForm onSubmit={mockOnSubmit} />)
    
    const subdomainInput = screen.getByLabelText(/sous-domaine/i)
    fireEvent.change(subdomainInput, { target: { value: 'invalid domain!' } })
    
    const submitButton = screen.getByRole('button', { name: /créer/i })
    fireEvent.click(submitButton)
    
    expect(await screen.findByText(/sous-domaine invalide/i)).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('submits form with valid data', async () => {
    render(<CreateSiteForm onSubmit={mockOnSubmit} />)
    
    const nameInput = screen.getByLabelText(/nom du site/i)
    const subdomainInput = screen.getByLabelText(/sous-domaine/i)
    const templateSelect = screen.getByLabelText(/template/i)
    
    fireEvent.change(nameInput, { target: { value: 'Mon Site Test' } })
    fireEvent.change(subdomainInput, { target: { value: 'mon-site-test' } })
    fireEvent.change(templateSelect, { target: { value: 'blog' } })
    
    const submitButton = screen.getByRole('button', { name: /créer/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'Mon Site Test',
        subdomain: 'mon-site-test',
        template: 'blog'
      })
    })
  })
})
