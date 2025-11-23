import { render, screen } from '@testing-library/react'
import ResumePreview from '../components/Preview/ResumePreview'
import { initialResumeState } from '../data/initialState'

describe('ResumePreview', () => {
    it('renders personal info correctly', () => {
        render(<ResumePreview resumeData={initialResumeState} />)

        expect(screen.getByText(initialResumeState.personalInfo.fullName)).toBeInTheDocument()
        expect(screen.getByText(initialResumeState.personalInfo.email)).toBeInTheDocument()
    })

    it('renders experience items', () => {
        render(<ResumePreview resumeData={initialResumeState} />)

        expect(screen.getByText(new RegExp(initialResumeState.experience[0].company, 'i'))).toBeInTheDocument()
        expect(screen.getByText(new RegExp(initialResumeState.experience[0].role, 'i'))).toBeInTheDocument()
    })
})
