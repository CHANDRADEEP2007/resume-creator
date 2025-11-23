import React from 'react';

const PersonalInfoForm = ({ data, update }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        update({ ...data, [name]: value });
    };

    const handleExpertiseChange = (e) => {
        const val = e.target.value;
        update({ ...data, expertises: val.split('•').map(s => s.trim()) });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                    type="text"
                    name="fullName"
                    value={data.fullName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <input
                    type="text"
                    name="phone"
                    value={data.roleName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            <div className="col-span-2 space-y-1">
                <label className="text-sm font-medium text-gray-700">Expertise Areas (Separate with '•')</label>
                <input
                    type="text"
                    value={data.expertises.join(' • ')}
                    onChange={handleExpertiseChange}
                    placeholder="Expertise 1 • Expertise 2"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
        </div>
    );
};

export default PersonalInfoForm;
