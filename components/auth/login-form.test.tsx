import { render, screen } from '@testing-library/react'
import { LoginForm } from './login-form'

describe('LoginForm', () => {
  it('renders login form', () => {
    render(<LoginForm />)
    expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument()
  })
})
