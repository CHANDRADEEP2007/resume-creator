import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Loader2 } from 'lucide-react';

const PDFExportButton = ({ targetId, fileName }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownload = async () => {
        const element = document.getElementById(targetId);
        if (!element) return;

        setIsGenerating(true);
        try {
            // Wait for images/fonts to load if necessary (though we use system fonts mostly)
            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(element, {
                scale: 2, // Higher scale for better quality
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

            // Calculate dimensions to fit A4 width (or height if it's very long, but usually width is the constraint)
            const imgX = 0;
            const imgY = 0;
            const imgFinalWidth = pdfWidth;
            const imgFinalHeight = (canvas.height * pdfWidth) / canvas.width;

            // If content is longer than one page, we might need multi-page support. 
            // For this MVP, we'll scale to fit or just let it cut off/add pages if needed.
            // Simple approach: Add image. If it's too long, we might need to slice it.
            // For a single page resume, this is fine.

            if (imgFinalHeight > pdfHeight) {
                // Multi-page logic could go here, but for now let's just add the image
                // and let the user know they should keep it to one page or we can implement simple paging.
                // A better approach for text-heavy resumes is usually just one long page or standard paging.
                // Let's stick to single page scaling for simplicity or standard A4 addImage.

                let heightLeft = imgFinalHeight;
                let position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, imgFinalWidth, imgFinalHeight);
                heightLeft -= pdfHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgFinalHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgFinalWidth, imgFinalHeight);
                    heightLeft -= pdfHeight;
                }
            } else {
                pdf.addImage(imgData, 'PNG', 0, 0, imgFinalWidth, imgFinalHeight);
            }

            pdf.save(fileName);
        } catch (error) {
            console.error('PDF Generation Error:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-medium"
        >
            {isGenerating ? <Loader2 className="animate-spin w-4 h-4" /> : <Download className="w-4 h-4" />}
            {isGenerating ? 'Generating...' : 'Download PDF'}
        </button>
    );
};

export default PDFExportButton;
