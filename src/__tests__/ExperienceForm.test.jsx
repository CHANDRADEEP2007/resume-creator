import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ExperienceForm from '../components/Editor/ExperienceForm';

describe('ExperienceForm', () => {
    const mockData = {
        experience: [
            {
                id: 1,
                company: 'Tech Corp',
                role: 'Developer',
                startDate: 'Jan 2020',
                endDate: 'Present',
                highlights: ['Built a feature']
            }
        ]
    };

    const mockUpdate = vi.fn();

    beforeEach(() => {
        mockUpdate.mockClear();
    });

    it('renders experience fields', () => {
        render(<ExperienceForm data={mockData} update={mockUpdate} />);

        expect(screen.getByDisplayValue('Tech Corp')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Developer')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Built a feature')).toBeInTheDocument();
        expect(screen.getByLabelText('Present')).toBeChecked();
    });

    it('updates company name', () => {
        render(<ExperienceForm data={mockData} update={mockUpdate} />);

        const companyInput = screen.getByDisplayValue('Tech Corp');
        fireEvent.change(companyInput, { target: { value: 'New Corp' } });

        const expectedExp = [{ ...mockData.experience[0], company: 'New Corp' }];
        expect(mockUpdate).toHaveBeenCalledWith({ ...mockData, experience: expectedExp });
    });

    it('toggles Present checkbox', () => {
        render(<ExperienceForm data={mockData} update={mockUpdate} />);

        const checkbox = screen.getByLabelText('Present');
        fireEvent.click(checkbox); // Uncheck

        const expectedExp = [{ ...mockData.experience[0], endDate: '' }];
        expect(mockUpdate).toHaveBeenCalledWith({ ...mockData, experience: expectedExp });
    });

    it('adds a new highlight', () => {
        render(<ExperienceForm data={mockData} update={mockUpdate} />);

        const addHighlightBtn = screen.getByText('+ Add Highlight');
        fireEvent.click(addHighlightBtn);

        const expectedExp = [{ ...mockData.experience[0], highlights: ['Built a feature', ''] }];
        expect(mockUpdate).toHaveBeenCalledWith({ ...mockData, experience: expectedExp });
    });

    it('adds a new experience', () => {
        render(<ExperienceForm data={mockData} update={mockUpdate} />);

        const addExpBtn = screen.getByText('+ Add Experience');
        fireEvent.click(addExpBtn);

        expect(mockUpdate).toHaveBeenCalled();
        const args = mockUpdate.mock.calls[0][0];
        expect(args.experience).toHaveLength(2);
    });
});
