import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm = ({ education, certifications, updateEducation, updateCertifications }) => {

    // Education Handlers
    const addEducation = () => {
        updateEducation([...education, { id: Date.now(), degree: "", school: "", year: "" }]);
    };

    const removeEducation = (id) => {
        updateEducation(education.filter(edu => edu.id !== id));
    };

    const updateEducationItem = (id, field, value) => {
        updateEducation(education.map(edu => {
            if (edu.id === id) {
                return { ...edu, [field]: value };
            }
            return edu;
        }));
    };

    // Certifications Handlers
    const handleCertChange = (e) => {
        updateCertifications(e.target.value.split(',').map(s => s.trim()));
    };

    return (
        <div className="space-y-6">
            {/* Education Section */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">Education</label>
                    <button
                        onClick={addEducation}
                        className="text-xs flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
                    >
                        <Plus size={14} /> Add Education
                    </button>
                </div>

                <div className="space-y-3">
                    {education.map((edu) => (
                        <div key={edu.id} className="bg-gray-50 p-3 rounded space-y-2 relative group">
                            <button
                                onClick={() => removeEducation(edu.id)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={16} />
                            </button>
                            <input
                                value={edu.degree}
                                onChange={(e) => updateEducationItem(edu.id, 'degree', e.target.value)}
                                placeholder="Degree (e.g. MBA)"
                                className="w-full p-1.5 border rounded text-sm"
                            />
                            <div className="grid grid-cols-3 gap-2">
                                <input
                                    value={edu.school}
                                    onChange={(e) => updateEducationItem(edu.id, 'school', e.target.value)}
                                    placeholder="School / University"
                                    className="col-span-2 p-1.5 border rounded text-sm"
                                />
                                <input
                                    value={edu.year}
                                    onChange={(e) => updateEducationItem(edu.id, 'year', e.target.value)}
                                    placeholder="Year"
                                    className="p-1.5 border rounded text-sm"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Certifications Section */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Certifications (Separate with comma)</label>
                <textarea
                    value={certifications.join(', ')}
                    onChange={handleCertChange}
                    rows={3}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Cert 1, Cert 2, Cert 3"
                />
            </div>
        </div>
    );
};

export default EducationForm;
