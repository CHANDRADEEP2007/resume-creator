import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App Component', () => {
    it('renders the editor and preview sections', () => {
        render(<App />)

        expect(screen.getByText(/Resume Creator/i)).toBeInTheDocument()
        expect(screen.getByText(/Personal Information/i)).toBeInTheDocument()
        expect(screen.getByText(/Live Preview/i)).toBeInTheDocument()
    })
})
