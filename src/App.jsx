import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Editor from './components/Editor/Editor';
import ResumePreview from './components/Preview/ResumePreview';
import PDFExportButton from './components/Preview/PDFExportButton';
import { initialResumeState } from './data/initialState';
import { RotateCcw, Save } from 'lucide-react';

function App() {
  // Load from local storage or use initial state
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : initialResumeState;
  });

  // Save to local storage whenever data changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const updateResumeData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const resetToSample = () => {
    if (window.confirm('This will overwrite your current data with the sample data. Continue?')) {
      setResumeData(initialResumeState);
    }
  };

  return (
    <Layout>
      {/* Left Side: Editor */}
      <div className="w-1/2 h-full flex flex-col border-r border-gray-200 bg-white">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h1 className="font-bold text-gray-700">Editor</h1>
          <button
            onClick={resetToSample}
            className="text-xs flex items-center gap-1 text-gray-600 hover:text-blue-600"
          >
            <RotateCcw size={14} /> Reset to Sample
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <Editor resumeData={resumeData} updateResumeData={updateResumeData} />
        </div>
      </div>

      {/* Right Side: Preview */}
      <div className="w-1/2 h-full bg-gray-500 flex flex-col">
        <div className="p-4 bg-gray-700 text-white flex justify-between items-center shadow-md z-10">
          <span className="font-medium">Live Preview</span>
          <PDFExportButton targetId="resume-preview" fileName={`${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`} />
        </div>
        <div className="flex-1 overflow-y-auto p-8 flex justify-center custom-scrollbar">
          <ResumePreview resumeData={resumeData} />
        </div>
      </div>
    </Layout>
  );
}

export default App;
