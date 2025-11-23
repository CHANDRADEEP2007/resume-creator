import React from 'react';
import { Linkedin, Mail, Phone, Globe } from 'lucide-react';

const ResumePreview = ({ resumeData }) => {
    const { personalInfo, summary, coreStrengths, techFluency, experience, education, certifications } = resumeData;

    return (
        <div className="resume-paper text-sm leading-normal text-black font-sans" id="resume-preview">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    {personalInfo.linkType === 'portfolio' ? (
                        <Globe className="w-6 h-6 text-[#0077b5]" />
                    ) : (
                        <Linkedin className="w-6 h-6 text-[#0077b5]" />
                    )}
                    <h1 className="text-2xl font-bold text-blue-700 hover:underline cursor-pointer">
                        {personalInfo.fullName}
                    </h1>
                </div>
                <div className="text-right text-xs">
                    <div className="flex items-center justify-end gap-2 mb-1">
                        <span className="text-blue-700 font-semibold">{personalInfo.linkUrl || personalInfo.linkedin}</span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <Mail className="w-3 h-3" />
                        <span className="text-blue-700 font-semibold">{personalInfo.email}</span>
                    </div>
                </div>
            </div>

            {/* Role & Contact */}
            <div className="flex justify-between items-center border-b-2 border-black pb-1 mb-3">
                <div className="font-bold text-sm">
                    {personalInfo.roleName} — {personalInfo.expertises.join(' • ')}
                </div>
                <div className="flex items-center gap-1 font-bold text-sm">
                    <Phone className="w-3 h-3" />
                    <span>Phone: {personalInfo.phone}</span>
                </div>
            </div>

            {/* Professional Summary */}
            <div className="mb-3">
                <h2 className="font-bold underline mb-1 uppercase text-sm">PROFESSIONAL SUMMARY:</h2>
                <p className="text-justify text-sm">
                    {summary}
                </p>
            </div>

            {/* Core Strengths */}
            <div className="mb-3">
                <h2 className="font-bold underline mb-1 text-sm">Core Strengths:</h2>
                <p className="text-sm">
                    {coreStrengths.join(' • ')}
                </p>
            </div>

            {/* Tech Fluency */}
            <div className="mb-4">
                <h2 className="font-bold underline mb-1 text-sm">Tech Fluency:</h2>
                <p className="text-sm">
                    {techFluency.map((tf, index) => (
                        <span key={index}>
                            {tf.category}{tf.skills.length > 0 ? `: ${tf.skills.join('/')}` : ''}
                            {index < techFluency.length - 1 ? ' • ' : ''}
                        </span>
                    ))}
                </p>
            </div>

            {/* Professional Experience */}
            <div className="mb-4">
                <h2 className="font-bold underline mb-1 uppercase text-sm">PROFESSIONAL EXPERIENCE</h2>
                <div className="border-t border-black mb-2"></div>

                {experience.map((exp) => (
                    <div key={exp.id} className="mb-3">
                        <div className="flex justify-between font-bold text-blue-600 mb-1">
                            <span>{exp.role} – {exp.company}</span>
                            <span className="text-black">{exp.startDate} – {exp.endDate}</span>
                        </div>
                        <ul className="list-disc ml-4 space-y-0.5">
                            {exp.highlights.map((highlight, idx) => (
                                <li key={idx} className="pl-1">{highlight}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Education */}
            <div className="mb-4">
                <h2 className="font-bold underline mb-1 uppercase text-sm">EDUCATION</h2>
                <div className="border-t border-black mb-2"></div>
                {education.map((edu, index) => (
                    <div key={index} className="mb-1">
                        <span className="font-semibold">{edu.degree}</span>, {edu.school}
                    </div>
                ))}
            </div>

            {/* Certifications */}
            <div>
                <h2 className="font-bold underline mb-1 text-sm">Certifications:</h2>
                <div className="border-t border-black mb-2"></div>
                <p className="text-sm">
                    {certifications.join(', ')}
                </p>
            </div>
        </div>
    );
};

export default ResumePreview;
