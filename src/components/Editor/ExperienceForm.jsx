import React from 'react';

const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const YEARS = Array.from({ length: 50 }, (_, i) => (new Date().getFullYear() - i).toString());

const DateSelect = ({ value, onChange, disabled }) => {
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
                disabled={disabled}
                className="p-2 border rounded w-20 text-sm bg-white disabled:bg-gray-100"
            >
                <option value="">Month</option>
                {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select
                value={year}
                onChange={handleYearChange}
                disabled={disabled}
                className="p-2 border rounded w-24 text-sm bg-white disabled:bg-gray-100"
            >
                <option value="">Year</option>
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
        </div>
    );
};

const ExperienceForm = ({ data, update }) => {
    const handleChange = (index, field, value) => {
        const newExperience = [...data.experience];
        newExperience[index][field] = value;
        update({ ...data, experience: newExperience });
    };

    const handleHighlightChange = (index, hIndex, value) => {
        const newExperience = [...data.experience];
        newExperience[index].highlights[hIndex] = value;
        update({ ...data, experience: newExperience });
    };

    const addHighlight = (index) => {
        const newExperience = [...data.experience];
        newExperience[index].highlights.push('');
        update({ ...data, experience: newExperience });
    };

    const removeHighlight = (index, hIndex) => {
        const newExperience = [...data.experience];
        newExperience[index].highlights = newExperience[index].highlights.filter((_, i) => i !== hIndex);
        update({ ...data, experience: newExperience });
    };

    const addExperience = () => {
        update({
            ...data,
            experience: [
                ...data.experience,
                {
                    id: Date.now(),
                    company: "Company Name",
                    role: "Role Title",
                    location: "Location",
                    startDate: "",
                    endDate: "Present",
                    highlights: ["Key achievement"]
                }
            ]
        });
    };

    const removeExperience = (index) => {
        const newExperience = data.experience.filter((_, i) => i !== index);
        update({ ...data, experience: newExperience });
    };

    return (
        <div className="space-y-6">
            {data.experience.map((exp, index) => (
                <div key={exp.id} className="p-4 border rounded-lg bg-white shadow-sm relative group">
                    <button
                        onClick={() => removeExperience(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove Experience"
                    >
                        Remove
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Company</label>
                            <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => handleChange(index, 'company', e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Role</label>
                            <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => handleChange(index, 'role', e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Start Date</label>
                            <DateSelect
                                value={exp.startDate}
                                onChange={(val) => handleChange(index, 'startDate', val)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">End Date</label>
                            <div className="flex items-center gap-2">
                                <DateSelect
                                    value={exp.endDate === 'Present' ? '' : exp.endDate}
                                    onChange={(val) => handleChange(index, 'endDate', val)}
                                    disabled={exp.endDate === 'Present'}
                                />
                                <label className="flex items-center gap-1 text-sm cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={exp.endDate === 'Present'}
                                        onChange={(e) => handleChange(index, 'endDate', e.target.checked ? 'Present' : '')}
                                        className="w-4 h-4"
                                    />
                                    Present
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Highlights</label>
                        {exp.highlights.map((highlight, hIndex) => (
                            <div key={hIndex} className="flex gap-2">
                                <input
                                    type="text"
                                    value={highlight}
                                    onChange={(e) => handleHighlightChange(index, hIndex, e.target.value)}
                                    className="w-full p-2 border rounded text-sm"
                                    placeholder="• Achieved X by doing Y..."
                                />
                                <button
                                    onClick={() => removeHighlight(index, hIndex)}
                                    className="text-red-400 hover:text-red-600 px-2"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => addHighlight(index)}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                            + Add Highlight
                        </button>
                    </div>
                </div>
            ))}
            <button
                onClick={addExperience}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors font-medium"
            >
                + Add Experience
            </button>
        </div>
    );
};

export default ExperienceForm;
