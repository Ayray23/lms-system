import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

import { useAuth } from '../../context/AuthContext'
import { LoginPage } from './LoginPage'

describe('LoginPage', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ login: vi.fn(), isFirebaseConfigured: true })
  })

  it('renders the login form and toggles password visibility', async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    )

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument()

    const toggleButton = screen.getByRole('button', { name: /Show/i })
    await userEvent.click(toggleButton)
    expect(screen.getByLabelText(/Password/i)).toHaveAttribute('type', 'text')
  })

  it('displays an error when login fails', async () => {
    const loginMock = vi.fn().mockRejectedValue(new Error('Invalid credentials'))
    useAuth.mockReturnValue({ login: loginMock, isFirebaseConfigured: true })

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    )

    await userEvent.type(screen.getByLabelText(/Email address/i), 'test@school.edu')
    await userEvent.type(screen.getByLabelText(/Password/i), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /Sign in/i }))

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument()
    })
  })
})
