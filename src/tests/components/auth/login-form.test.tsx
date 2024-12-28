import { render, screen, fireEvent } from '@testing-library/react'
import { LoginForm } from '@/components/auth/login-form'

describe('LoginForm', () => {
  it('renders login form', () => {
    render(<LoginForm />)
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /connexion/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    render(<LoginForm />)
    
    const submitButton = screen.getByRole('button', { name: /connexion/i })
    fireEvent.click(submitButton)
    
    expect(await screen.findByText(/email est requis/i)).toBeInTheDocument()
    expect(await screen.findByText(/mot de passe est requis/i)).toBeInTheDocument()
  })

  it('shows validation error for invalid email', async () => {
    render(<LoginForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    
    const submitButton = screen.getByRole('button', { name: /connexion/i })
    fireEvent.click(submitButton)
    
    expect(await screen.findByText(/email invalide/i)).toBeInTheDocument()
  })
})
