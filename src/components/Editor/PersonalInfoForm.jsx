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
                <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={data.fullName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            <div className="space-y-1">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
                <input
                    id="phone"
                    type="text"
                    name="phone"
                    value={data.phone}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (/^[0-9]*$/.test(val)) {
                            handleChange(e);
                        }
                    }}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            <div className="space-y-1">
                <label htmlFor="roleName" className="text-sm font-medium text-gray-700">Role Title</label>
                <input
                    id="roleName"
                    type="text"
                    name="roleName"
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
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Link Type</label>
                <select
                    name="linkType"
                    value={data.linkType || 'linkedin'}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                    <option value="linkedin">LinkedIn</option>
                    <option value="portfolio">Portfolio</option>
                </select>
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">{data.linkType === 'portfolio' ? 'Portfolio URL' : 'LinkedIn URL'}</label>
                <input
                    type="text"
                    name="linkUrl"
                    value={data.linkUrl || data.linkedin || ''}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
        </div>
    );
};

export default PersonalInfoForm;
