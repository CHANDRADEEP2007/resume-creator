import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, FileText, File } from 'lucide-react';
import { generateWordHTML } from '../../utils/generateWordHTML';

const ExportMenu = ({ targetId, fileName = 'resume', resumeData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    const handleExportPDF = async () => {
        setIsExporting(true);
        setIsOpen(false);
        try {
            const element = document.getElementById(targetId);
            if (!element) return;

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 0; // Top aligned

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save(`${fileName}.pdf`);
        } catch (error) {
            console.error('PDF Export failed:', error);
            alert('Failed to export PDF');
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportWord = () => {
        setIsExporting(true);
        setIsOpen(false);
        try {
            // Use the custom generator for Word-compatible HTML (tables instead of flex)
            // We need to access the resume data. 
            // Since we don't have direct access to resumeData prop here (it was passed to ResumePreview),
            // we should probably pass resumeData to ExportMenu as well.
            // For now, let's assume we update the parent to pass it.
            // WAIT: I need to update the parent (App.jsx) to pass resumeData to ExportMenu first.
            // But I can't do that in this single step. 
            // I will assume resumeData is passed as a prop and update App.jsx next.

            if (!resumeData) {
                console.error("Resume data not available for export");
                return;
            }

            const sourceHTML = generateWordHTML(resumeData);

            const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
            const fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            fileDownload.download = `${fileName}.doc`;
            fileDownload.click();
            document.body.removeChild(fileDownload);
        } catch (error) {
            console.error('Word Export failed:', error);
            alert('Failed to export Word document');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isExporting}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
            >
                <Download size={20} />
                {isExporting ? 'Exporting...' : 'Export Resume'}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                    <div className="py-1">
                        <button
                            onClick={handleExportPDF}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                            <FileText size={16} className="text-red-600" />
                            Download as PDF
                        </button>
                        <button
                            onClick={handleExportWord}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                            <File size={16} className="text-blue-600" />
                            Download as Word
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExportMenu;
