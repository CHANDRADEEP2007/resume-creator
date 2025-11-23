import React from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const ExperienceForm = ({ data, update }) => {
    const addExperience = () => {
        const newExp = {
            id: Date.now(),
            company: "New Company",
            role: "Role Title",
            location: "Location",
            startDate: "Start",
            endDate: "Present",
            highlights: ["New highlight"]
        };
        update([newExp, ...data]);
    };

    const removeExperience = (id) => {
        update(data.filter(exp => exp.id !== id));
    };

    const updateExperience = (id, field, value) => {
        update(data.map(exp => {
            if (exp.id === id) {
                return { ...exp, [field]: value };
            }
            return exp;
        }));
    };

    const updateHighlight = (expId, index, value) => {
        update(data.map(exp => {
            if (exp.id === expId) {
                const newHighlights = [...exp.highlights];
                newHighlights[index] = value;
                return { ...exp, highlights: newHighlights };
            }
            return exp;
        }));
    };

    const addHighlight = (expId) => {
        update(data.map(exp => {
            if (exp.id === expId) {
                return { ...exp, highlights: [...exp.highlights, ""] };
            }
            return exp;
        }));
    };

    const removeHighlight = (expId, index) => {
        update(data.map(exp => {
            if (exp.id === expId) {
                const newHighlights = [...exp.highlights];
                newHighlights.splice(index, 1);
                return { ...exp, highlights: newHighlights };
            }
            return exp;
        }));
    };

    return (
        <div className="space-y-4">
            <button
                onClick={addExperience}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center gap-2 transition-colors"
            >
                <Plus size={20} /> Add Experience
            </button>

            <div className="space-y-4">
                {data.map((exp) => (
                    <div key={exp.id} className="border rounded-lg p-4 bg-gray-50 space-y-3">
                        <div className="flex justify-between items-start">
                            <div className="grid grid-cols-2 gap-2 flex-1 mr-4">
                                <input
                                    value={exp.role}
                                    onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                                    placeholder="Role Title"
                                    className="p-2 border rounded font-medium"
                                />
                                <input
                                    value={exp.company}
                                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                    placeholder="Company Name"
                                    className="p-2 border rounded"
                                />
                                <input
                                    value={exp.startDate}
                                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                    placeholder="Start Date"
                                    className="p-2 border rounded text-sm"
                                />
                                <input
                                    value={exp.endDate}
                                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                    placeholder="End Date"
                                    className="p-2 border rounded text-sm"
                                />
                            </div>
                            <button
                                onClick={() => removeExperience(exp.id)}
                                className="text-red-500 hover:bg-red-100 p-2 rounded"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase">Highlights</label>
                            {exp.highlights.map((highlight, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <textarea
                                        value={highlight}
                                        onChange={(e) => updateHighlight(exp.id, idx, e.target.value)}
                                        rows={2}
                                        className="flex-1 p-2 border rounded text-sm resize-y"
                                    />
                                    <button
                                        onClick={() => removeHighlight(exp.id, idx)}
                                        className="text-gray-400 hover:text-red-500 self-start mt-2"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addHighlight(exp.id)}
                                className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                            >
                                <Plus size={12} /> Add Highlight
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperienceForm;
