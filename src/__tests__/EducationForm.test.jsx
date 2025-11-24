import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EducationForm from '../components/Editor/EducationForm';

describe('EducationForm', () => {
    const mockEducation = [
        { id: 1, degree: 'BS CS', school: 'University', year: 'May 2020' }
    ];
    const mockCertifications = ['AWS Certified'];

    const mockUpdateEdu = vi.fn();
    const mockUpdateCert = vi.fn();

    beforeEach(() => {
        mockUpdateEdu.mockClear();
        mockUpdateCert.mockClear();
    });

    it('renders education and certifications', () => {
        render(
            <EducationForm
                education={mockEducation}
                certifications={mockCertifications}
                updateEducation={mockUpdateEdu}
                updateCertifications={mockUpdateCert}
            />
        );

        expect(screen.getByDisplayValue('BS CS')).toBeInTheDocument();
        expect(screen.getByDisplayValue('University')).toBeInTheDocument();
        expect(screen.getByDisplayValue('AWS Certified')).toBeInTheDocument();
    });

    it('updates education degree', () => {
        render(
            <EducationForm
                education={mockEducation}
                certifications={mockCertifications}
                updateEducation={mockUpdateEdu}
                updateCertifications={mockUpdateCert}
            />
        );

        const degreeInput = screen.getByDisplayValue('BS CS');
        fireEvent.change(degreeInput, { target: { value: 'MS CS' } });

        const expectedEdu = [{ ...mockEducation[0], degree: 'MS CS' }];
        expect(mockUpdateEdu).toHaveBeenCalledWith(expectedEdu);
    });

    it('updates certifications', () => {
        render(
            <EducationForm
                education={mockEducation}
                certifications={mockCertifications}
                updateEducation={mockUpdateEdu}
                updateCertifications={mockUpdateCert}
            />
        );

        const certInput = screen.getByDisplayValue('AWS Certified');
        fireEvent.change(certInput, { target: { value: 'AWS Certified\nGoogle Certified' } });

        expect(mockUpdateCert).toHaveBeenCalledWith(['AWS Certified', 'Google Certified']);
    });

    it('adds new education', () => {
        render(
            <EducationForm
                education={mockEducation}
                certifications={mockCertifications}
                updateEducation={mockUpdateEdu}
                updateCertifications={mockUpdateCert}
            />
        );

        const addBtn = screen.getByText('+ Add Education');
        fireEvent.click(addBtn);

        expect(mockUpdateEdu).toHaveBeenCalled();
        const args = mockUpdateEdu.mock.calls[0][0];
        expect(args).toHaveLength(2);
    });
});
