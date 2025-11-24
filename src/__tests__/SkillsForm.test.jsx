import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SkillsForm from '../components/Editor/SkillsForm';

describe('SkillsForm', () => {
    const mockData = {
        coreStrengths: ['Leadership', 'Communication'],
        techFluency: [
            { category: 'Frontend', skills: ['React', 'CSS'] },
            { category: 'Backend', skills: ['Node', 'SQL'] }
        ]
    };

    const mockUpdate = vi.fn();

    beforeEach(() => {
        mockUpdate.mockClear();
    });

    it('renders core strengths and tech fluency', () => {
        render(<SkillsForm data={mockData} update={mockUpdate} />);

        expect(screen.getByDisplayValue('Leadership • Communication')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Frontend')).toBeInTheDocument();
        expect(screen.getByDisplayValue('React, CSS')).toBeInTheDocument();
    });

    it('updates core strengths', () => {
        render(<SkillsForm data={mockData} update={mockUpdate} />);

        const coreInput = screen.getByDisplayValue('Leadership • Communication');
        fireEvent.change(coreInput, { target: { value: 'Agile • Scrum' } });

        expect(mockUpdate).toHaveBeenCalledWith({ ...mockData, coreStrengths: ['Agile', 'Scrum'] });
    });

    it('updates tech fluency category', () => {
        render(<SkillsForm data={mockData} update={mockUpdate} />);

        const categoryInput = screen.getByDisplayValue('Frontend');
        fireEvent.change(categoryInput, { target: { value: 'UI/UX' } });

        const expectedTech = [
            { category: 'UI/UX', skills: ['React', 'CSS'] },
            { category: 'Backend', skills: ['Node', 'SQL'] }
        ];

        expect(mockUpdate).toHaveBeenCalledWith({ ...mockData, techFluency: expectedTech });
    });

    it('adds a new tech category', () => {
        render(<SkillsForm data={mockData} update={mockUpdate} />);

        const addButton = screen.getByText(/Add Tech Category/i);
        fireEvent.click(addButton);

        const expectedTech = [
            ...mockData.techFluency,
            { category: "", skills: [] }
        ];

        expect(mockUpdate).toHaveBeenCalledWith({ ...mockData, techFluency: expectedTech });
    });

    it('removes a tech category', () => {
        // Need more than 1 category to show remove button based on component logic
        render(<SkillsForm data={mockData} update={mockUpdate} />);

        const removeButtons = screen.getAllByTitle('Remove Category');
        fireEvent.click(removeButtons[0]);

        const expectedTech = [
            { category: 'Backend', skills: ['Node', 'SQL'] }
        ];

        expect(mockUpdate).toHaveBeenCalledWith({ ...mockData, techFluency: expectedTech });
    });
});
