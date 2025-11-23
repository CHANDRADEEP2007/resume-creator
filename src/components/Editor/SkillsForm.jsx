import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const SkillsForm = ({ coreStrengths, techFluency, updateCore, updateTech }) => {

    // Core Strengths Handlers
    const handleCoreChange = (e) => {
        updateCore(e.target.value.split('•').map(s => s.trim()));
    };

    // Tech Fluency Handlers
    const addTechCategory = () => {
        updateTech([...techFluency, { category: "New Category", skills: [] }]);
    };

    const removeTechCategory = (index) => {
        const newTech = [...techFluency];
        newTech.splice(index, 1);
        updateTech(newTech);
    };

    const updateTechCategory = (index, field, value) => {
        const newTech = [...techFluency];
        if (field === 'skills') {
            // Expecting comma or slash separated string for input simplicity
            newTech[index].skills = value.split('/').map(s => s.trim());
        } else {
            newTech[index][field] = value;
        }
        updateTech(newTech);
    };

    return (
        <div className="space-y-6">
            {/* Core Strengths */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Core Strengths (Separate with '•')</label>
                <textarea
                    value={coreStrengths.join(' • ')}
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
                    <button
                        onClick={addTechCategory}
                        className="text-xs flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
                    >
                        <Plus size={14} /> Add Category
                    </button>
                </div>

                <div className="space-y-3">
                    {techFluency.map((item, index) => (
                        <div key={index} className="flex gap-2 items-start bg-gray-50 p-3 rounded">
                            <div className="flex-1 space-y-2">
                                <input
                                    type="text"
                                    value={item.category}
                                    onChange={(e) => updateTechCategory(index, 'category', e.target.value)}
                                    placeholder="Category (e.g. Redshift/SQL)"
                                    className="w-full p-1.5 border rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                                />
                                <input
                                    type="text"
                                    value={item.skills.join('/')}
                                    onChange={(e) => updateTechCategory(index, 'skills', e.target.value)}
                                    placeholder="Skills (e.g. dbt/Airflow) - separate with '/'"
                                    className="w-full p-1.5 border rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <button
                                onClick={() => removeTechCategory(index)}
                                className="text-red-500 hover:bg-red-50 p-1 rounded"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillsForm;
