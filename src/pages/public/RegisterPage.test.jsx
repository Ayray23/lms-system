import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

import { useAuth } from '../../context/AuthContext'
import { RegisterPage } from './RegisterPage'

describe('RegisterPage', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ register: vi.fn(), isFirebaseConfigured: true })
  })

  it('advances to the password step when Continue is clicked', async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Full name/i)).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /Continue/i }))
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Confirm password/i)).toBeInTheDocument()
  })

  it('requires terms acceptance before submitting registration', async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    )

    await userEvent.click(screen.getByRole('button', { name: /Continue/i }))
    await userEvent.type(screen.getByLabelText(/Password/i), 'password123')
    await userEvent.type(screen.getByLabelText(/Confirm password/i), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /Sign up/i }))

    await waitFor(() => {
      expect(screen.getByText(/You must accept the terms to continue/i)).toBeInTheDocument()
    })
  })
})
