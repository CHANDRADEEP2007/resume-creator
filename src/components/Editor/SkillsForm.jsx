import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const SkillsForm = ({ data, update }) => {
    // data is { coreStrengths: [], techFluency: [] }

    const handleCoreChange = (e) => {
        update({ ...data, coreStrengths: e.target.value.split('•').map(s => s.trim()) });
    };

    const handleTechFluencyChange = (index, field, value) => {
        const newTechFluency = [...data.techFluency];
        if (field === 'skills') {
            newTechFluency[index].skills = value.split(',').map(s => s.trim());
        } else {
            newTechFluency[index][field] = value;
        }
        update({ ...data, techFluency: newTechFluency });
    };

    return (
        <div className="space-y-6">
            {/* Core Strengths */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Core Strengths (Separate with '•')</label>
                <textarea
                    value={data.coreStrengths.join(' • ')}
                    onChange={handleCoreChange}
                    rows={3}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Strength 1 • Strength 2 • Strength 3"
                />
            </div>

            {/* Tech Fluency */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">Tech Fluency</label>
                </div>

                <div className="space-y-3">
                    {data.techFluency.map((tf, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2 p-2 border rounded bg-gray-50 relative group">
                            <div className="md:col-span-1">
                                <input
                                    type="text"
                                    placeholder="Category (e.g. Languages)"
                                    value={tf.category}
                                    onChange={(e) => handleTechFluencyChange(index, 'category', e.target.value)}
                                    className="w-full p-2 border rounded text-sm font-bold"
                                />
                            </div>
                            <div className="md:col-span-2 flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Skills (e.g. Python, Java)"
                                    value={tf.skills.join(', ')}
                                    onChange={(e) => handleTechFluencyChange(index, 'skills', e.target.value)}
                                    className="w-full p-2 border rounded text-sm"
                                />
                                {data.techFluency.length > 1 && (
                                    <button
                                        onClick={() => {
                                            const newTechFluency = data.techFluency.filter((_, i) => i !== index);
                                            update({ ...data, techFluency: newTechFluency });
                                        }}
                                        className="text-red-500 hover:text-red-700 px-2"
                                        title="Remove Category"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            update({
                                ...data,
                                techFluency: [...data.techFluency, { category: "", skills: [] }]
                            });
                        }}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                    >
                        <Plus size={16} /> Add Tech Category
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkillsForm;
