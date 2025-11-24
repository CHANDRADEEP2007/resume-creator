import React from 'react';
import { Trash2 } from 'lucide-react';

const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const YEARS = Array.from({ length: 50 }, (_, i) => (new Date().getFullYear() - i).toString());

const DateSelect = ({ value, onChange }) => {
    // Parse "MMM YYYY" or empty string
    const [month, year] = value ? value.split(' ') : ['', ''];

    const handleMonthChange = (e) => {
        const newMonth = e.target.value;
        if (newMonth && year) onChange(`${newMonth} ${year}`);
        else if (newMonth) onChange(`${newMonth} ${new Date().getFullYear()}`); // Default to current year if none
        else onChange('');
    };

    const handleYearChange = (e) => {
        const newYear = e.target.value;
        if (month && newYear) onChange(`${month} ${newYear}`);
        else if (newYear) onChange(`${MONTHS[0]} ${newYear}`); // Default to Jan if none
        else onChange('');
    };

    return (
        <div className="flex gap-2">
            <select
                value={month}
                onChange={handleMonthChange}
                className="p-2 border rounded w-20 text-sm bg-white"
            >
                <option value="">Month</option>
                {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select
                value={year}
                onChange={handleYearChange}
                className="p-2 border rounded w-24 text-sm bg-white"
            >
                <option value="">Year</option>
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
        </div>
    );
};

const EducationForm = ({ education, certifications, updateEducation, updateCertifications }) => {

    // Education Handlers
    const addEducation = () => {
        updateEducation([
            ...education,
            { id: Date.now(), degree: "Degree Name", school: "School/University", year: "" }
        ]);
    };

    const removeEducation = (id) => {
        updateEducation(education.filter(edu => edu.id !== id));
    };

    const updateEducationItem = (id, field, value) => {
        updateEducation(education.map(edu => {
            if (edu.id === id) return { ...edu, [field]: value };
            return edu;
        }));
    };

    // Certification Handlers
    const handleCertChange = (e) => {
        updateCertifications(e.target.value.split('\n').filter(c => c.trim() !== ''));
    };

    return (
        <div className="space-y-6">
            {/* Education Section */}
            <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">Education</h3>
                {education.map((edu) => (
                    <div key={edu.id} className="border rounded-lg p-4 bg-gray-50 relative group">
                        <button
                            onClick={() => removeEducation(edu.id)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={18} />
                        </button>
                        <div className="grid grid-cols-1 gap-3">
                            <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => updateEducationItem(edu.id, 'degree', e.target.value)}
                                placeholder="Degree"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                value={edu.school}
                                onChange={(e) => updateEducationItem(edu.id, 'school', e.target.value)}
                                placeholder="School / University"
                                className="w-full p-2 border rounded"
                            />
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Graduation Date</label>
                                <DateSelect
                                    value={edu.year}
                                    onChange={(val) => updateEducationItem(edu.id, 'year', val)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <button
                    onClick={addEducation}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                    + Add Education
                </button>
            </div>

            {/* Certifications Section */}
            <div className="space-y-2">
                <h3 className="font-semibold text-gray-700">Certifications</h3>
                <p className="text-xs text-gray-500">Enter each certification on a new line.</p>
                <textarea
                    value={certifications.join('\n')}
                    onChange={handleCertChange}
                    rows={4}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="AWS Certified Solutions Architect&#10;Google Professional Cloud Architect"
                />
            </div>
        </div>
    );
};

export default EducationForm;
