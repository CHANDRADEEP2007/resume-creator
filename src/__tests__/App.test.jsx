import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App', () => {
    it('renders the editor and preview sections', () => {
        render(<App />);

        // Check for Editor headers
        expect(screen.getByText('Personal Information')).toBeInTheDocument();
        expect(screen.getByText('Professional Summary')).toBeInTheDocument();

        // Check for Preview headers (initially rendered with default/empty data)
        // Note: The preview might be hidden on mobile but visible on desktop. 
        // Testing library renders the full DOM.
        expect(screen.getByText('PROFESSIONAL SUMMARY:')).toBeInTheDocument();
    });

    it('updates preview when editor changes', () => {
        render(<App />);

        // Find Name input in Editor
        // We need to be specific because both Editor and Preview might display the name
        // The input has a label "Full Name"
        const nameInput = screen.getByLabelText('Full Name');

        fireEvent.change(nameInput, { target: { value: 'New Name Test' } });

        // Check if Preview updates
        // The preview displays the name in a h1
        expect(screen.getByRole('heading', { name: 'New Name Test' })).toBeInTheDocument();
    });
});
