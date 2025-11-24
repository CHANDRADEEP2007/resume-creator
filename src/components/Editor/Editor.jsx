import React from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import SkillsForm from './SkillsForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';

const Editor = ({ resumeData, updateResumeData }) => {
    return (
        <div className="p-6 space-y-8 pb-20">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">Resume Creator</h1>
                <p className="text-gray-600">Fill in your details to generate your professional resume.</p>
            </div>

            <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Personal Information</h2>
                <PersonalInfoForm data={resumeData.personalInfo} update={(data) => updateResumeData('personalInfo', data)} />
            </section>

            <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Professional Summary</h2>
                <SummaryForm data={resumeData.summary} update={(data) => updateResumeData('summary', data)} />
            </section>

            <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Skills & Fluency</h2>
                <SkillsForm
                    data={{
                        coreStrengths: resumeData.coreStrengths,
                        techFluency: resumeData.techFluency
                    }}
                    update={(newData) => {
                        updateResumeData('coreStrengths', newData.coreStrengths);
                        updateResumeData('techFluency', newData.techFluency);
                    }}
                />
            </section>

            <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Experience</h2>
                <ExperienceForm data={{ experience: resumeData.experience }} update={(data) => updateResumeData('experience', data.experience)} />
            </section>

            <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Education & Certifications</h2>
                <EducationForm
                    education={resumeData.education}
                    certifications={resumeData.certifications}
                    updateEducation={(data) => updateResumeData('education', data)}
                    updateCertifications={(data) => updateResumeData('certifications', data)}
                />
            </section>
        </div>
    );
};

export default Editor;
