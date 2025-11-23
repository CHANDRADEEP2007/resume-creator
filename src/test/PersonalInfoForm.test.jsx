import { render, screen, fireEvent } from '@testing-library/react'
import PersonalInfoForm from '../components/Editor/PersonalInfoForm'
import { vi } from 'vitest'

describe('PersonalInfoForm', () => {
    const mockData = {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        roleName: 'Developer',
        expertises: ['React', 'Node']
    }
    const mockUpdate = vi.fn()

    it('renders input fields with correct values', () => {
        render(<PersonalInfoForm data={mockData} update={mockUpdate} />)

        expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
        expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument()
    })

    it('calls update when input changes', () => {
        render(<PersonalInfoForm data={mockData} update={mockUpdate} />)

        const nameInput = screen.getByDisplayValue('John Doe')
        fireEvent.change(nameInput, { target: { value: 'Jane Doe', name: 'fullName' } })

        expect(mockUpdate).toHaveBeenCalledWith({ ...mockData, fullName: 'Jane Doe' })
    })
})
