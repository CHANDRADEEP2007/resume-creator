import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PersonalInfoForm from '../components/Editor/PersonalInfoForm';

describe('PersonalInfoForm', () => {
    const mockData = {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        roleName: 'Software Engineer',
        expertises: ['React', 'Node'],
        linkType: 'linkedin',
        linkUrl: 'linkedin.com/in/johndoe',
    };

    const mockUpdate = vi.fn();

    beforeEach(() => {
        mockUpdate.mockClear();
    });

    it('renders all fields correctly', () => {
        render(<PersonalInfoForm data={mockData} update={mockUpdate} />);

        expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
        expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
        expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Software Engineer')).toBeInTheDocument();
        expect(screen.getByDisplayValue('React • Node')).toBeInTheDocument();
        expect(screen.getByDisplayValue('linkedin.com/in/johndoe')).toBeInTheDocument();
    });

    it('calls update when fields change', () => {
        render(<PersonalInfoForm data={mockData} update={mockUpdate} />);

        const nameInput = screen.getByDisplayValue('John Doe');
        fireEvent.change(nameInput, { target: { name: 'fullName', value: 'Jane Doe' } });

        expect(mockUpdate).toHaveBeenCalledWith({ ...mockData, fullName: 'Jane Doe' });
    });

    it('validates phone number input (only numbers allowed)', () => {
        render(<PersonalInfoForm data={mockData} update={mockUpdate} />);

        const phoneInput = screen.getByDisplayValue('1234567890');

        // Try adding letters
        fireEvent.change(phoneInput, { target: { name: 'phone', value: '123abc456' } });
        expect(mockUpdate).not.toHaveBeenCalledWith(expect.objectContaining({ phone: '123abc456' }));

        // Try adding numbers
        fireEvent.change(phoneInput, { target: { name: 'phone', value: '0987654321' } });
        expect(mockUpdate).toHaveBeenCalledWith({ ...mockData, phone: '0987654321' });
    });

    it('updates link type and label', () => {
        render(<PersonalInfoForm data={mockData} update={mockUpdate} />);

        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { name: 'linkType', value: 'portfolio' } });

        expect(mockUpdate).toHaveBeenCalledWith({ ...mockData, linkType: 'portfolio' });
    });

    it('handles expertise input with separator', () => {
        render(<PersonalInfoForm data={mockData} update={mockUpdate} />);

        const expertiseInput = screen.getByDisplayValue('React • Node');
        fireEvent.change(expertiseInput, { target: { value: 'Vue • Angular' } });

        expect(mockUpdate).toHaveBeenCalledWith({ ...mockData, expertises: ['Vue', 'Angular'] });
    });
});
