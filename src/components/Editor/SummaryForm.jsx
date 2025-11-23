import React from 'react';

const SummaryForm = ({ data, update }) => {
    return (
        <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Summary Text</label>
            <textarea
                value={data}
                onChange={(e) => update(e.target.value)}
                rows={6}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none resize-y"
                placeholder="Enter your professional summary..."
            />
            <p className="text-xs text-gray-500 text-right">{data.length} characters</p>
        </div>
    );
};

export default SummaryForm;
