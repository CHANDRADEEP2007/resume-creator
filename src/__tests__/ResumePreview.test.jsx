import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ResumePreview from '../components/Preview/ResumePreview';

describe('ResumePreview', () => {
    const mockData = {
        personalInfo: {
            fullName: 'John Doe',
            email: 'john@example.com',
            phone: '1234567890',
            roleName: 'Software Engineer',
            expertises: ['React', 'Node'],
            linkType: 'portfolio',
            linkUrl: 'myportfolio.com',
        },
        summary: 'Experienced developer.',
        coreStrengths: ['Coding', 'Debugging'],
        techFluency: [{ category: 'Frontend', skills: ['React'] }],
        experience: [
            {
                id: 1,
                company: 'Tech Corp',
                role: 'Dev',
                startDate: 'Jan 2020',
                endDate: 'Present',
                highlights: ['Did stuff']
            }
        ],
        education: [{ degree: 'BS', school: 'Uni', year: '2020' }],
        certifications: ['Certified']
    };

    it('renders personal info correctly', () => {
        render(<ResumePreview resumeData={mockData} />);

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Software Engineer — React • Node')).toBeInTheDocument();
        expect(screen.getByText('Phone: 1234567890')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    it('renders portfolio link correctly', () => {
        render(<ResumePreview resumeData={mockData} />);

        const link = screen.getByTitle('myportfolio.com');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://myportfolio.com');

        expect(screen.getByText('PROFESSIONAL SUMMARY:')).toBeInTheDocument();
        expect(screen.getByText('Experienced developer.')).toBeInTheDocument();
        expect(screen.getByText('Core Strengths:')).toBeInTheDocument();
        expect(screen.getByText('Coding • Debugging')).toBeInTheDocument();
        expect(screen.getByText('Tech Fluency:')).toBeInTheDocument();
        expect(screen.getByText('Frontend: React')).toBeInTheDocument();
    });
});
