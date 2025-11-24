export const generateWordHTML = (resumeData) => {
    const { personalInfo, summary, coreStrengths, techFluency, experience, education, certifications } = resumeData;

    // Helper for styles
    const styles = {
        body: "font-family: Arial, sans-serif; font-size: 10.5pt; line-height: 1.2; color: #000000;",
        h1: "font-size: 24pt; font-weight: bold; color: #1d4ed8; margin: 0;",
        h2: "font-size: 10.5pt; font-weight: bold; text-decoration: underline; text-transform: uppercase; margin-top: 12pt; margin-bottom: 4pt;",
        h2_normal: "font-size: 10.5pt; font-weight: bold; text-decoration: underline; margin-top: 12pt; margin-bottom: 4pt;",
        roleTitle: "font-size: 11pt; font-weight: bold;",
        jobHeader: "font-size: 11pt; font-weight: bold; color: #2563eb;",
        jobDate: "font-size: 10.5pt; font-weight: normal; color: #000000;",
        link: "color: #1d4ed8; text-decoration: none;",
        table: "width: 100%; border-collapse: collapse; margin-bottom: 4pt;",
        tdLeft: "text-align: left; vertical-align: top;",
        tdRight: "text-align: right; vertical-align: top;",
        bulletList: "margin-top: 0; margin-bottom: 4pt; padding-left: 20pt;",
        bulletItem: "margin-bottom: 2pt;"
    };

    // Icons (simplified as text or images if possible, but text is safer for basic Word export)
    // We'll use text labels or simple characters for now to ensure compatibility

    return `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta charset='utf-8'>
            <title>${personalInfo.fullName} Resume</title>
        </head>
        <body style="${styles.body}">
            
            <!-- Header -->
            <table style="${styles.table}">
                <tr>
                    <td style="${styles.tdLeft}">
                        <div style="display: flex; align-items: center;">
                            <!-- Link Icon Placeholder -->
                            <span style="color: #0077b5; font-size: 14pt; margin-right: 5pt;">
                                ${personalInfo.linkType === 'portfolio' ? '🌐' : 'in'}
                            </span>
                            <a href="${personalInfo.linkUrl?.startsWith('http') ? personalInfo.linkUrl : `https://${personalInfo.linkUrl}`}" style="${styles.h1}">
                                ${personalInfo.fullName}
                            </a>
                        </div>
                    </td>
                    <td style="${styles.tdRight}">
                        <div style="margin-bottom: 2pt;">
                            <a href="${personalInfo.linkUrl?.startsWith('http') ? personalInfo.linkUrl : `https://${personalInfo.linkUrl}`}" style="${styles.link}">
                                ${personalInfo.linkUrl || 'Link'}
                            </a>
                        </div>
                        <div>
                            <span style="margin-right: 4pt;">✉️</span>
                            <span style="color: #1d4ed8; font-weight: bold;">${personalInfo.email}</span>
                        </div>
                    </td>
                </tr>
            </table>

            <!-- Role & Contact -->
            <div style="border-bottom: 2pt solid black; padding-bottom: 2pt; margin-bottom: 8pt;">
                <table style="${styles.table}">
                    <tr>
                        <td style="${styles.tdLeft}">
                            <span style="${styles.roleTitle}">
                                ${personalInfo.roleName} — ${personalInfo.expertises.join(' • ')}
                            </span>
                        </td>
                        <td style="${styles.tdRight}">
                            <span style="font-weight: bold; font-size: 10pt;">
                                📞 Phone: ${personalInfo.phone}
                            </span>
                        </td>
                    </tr>
                </table>
            </div>

            <!-- Professional Summary -->
            <div style="margin-bottom: 8pt;">
                <div style="${styles.h2}">PROFESSIONAL SUMMARY:</div>
                <div style="text-align: justify;">
                    ${summary}
                </div>
            </div>

            <!-- Core Strengths -->
            <div style="margin-bottom: 8pt;">
                <div style="${styles.h2_normal}">Core Strengths:</div>
                <div>
                    ${coreStrengths.join(' • ')}
                </div>
            </div>

            <!-- Tech Fluency -->
            <div style="margin-bottom: 12pt;">
                <div style="${styles.h2_normal}">Tech Fluency:</div>
                <div>
                    ${techFluency.map(tf => `
                        <span>
                            <strong>${tf.category}</strong>${tf.skills.length > 0 ? `: ${tf.skills.join(' • ')}` : ''}
                        </span>
                    `).join(' • ')}
                </div>
            </div>

            <!-- Professional Experience -->
            <div style="margin-bottom: 12pt;">
                <div style="${styles.h2}">PROFESSIONAL EXPERIENCE</div>
                <div style="border-top: 1pt solid black; margin-bottom: 4pt;"></div>

                ${experience.map(exp => `
                    <div style="margin-bottom: 8pt;">
                        <table style="${styles.table}">
                            <tr>
                                <td style="${styles.tdLeft}">
                                    <span style="${styles.jobHeader}">${exp.role} – ${exp.company}</span>
                                </td>
                                <td style="${styles.tdRight}">
                                    <span style="${styles.jobDate}">${exp.startDate} – ${exp.endDate}</span>
                                </td>
                            </tr>
                        </table>
                        <ul style="${styles.bulletList}">
                            ${exp.highlights.map(highlight => `
                                <li style="${styles.bulletItem}">${highlight}</li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>

            <!-- Education -->
            <div style="margin-bottom: 12pt;">
                <div style="${styles.h2}">EDUCATION</div>
                <div style="border-top: 1pt solid black; margin-bottom: 4pt;"></div>
                
                ${education.map(edu => `
                    <div style="margin-bottom: 2pt;">
                        <strong>${edu.degree}</strong>, ${edu.school}
                    </div>
                `).join('')}
            </div>

            <!-- Certifications -->
            <div>
                <div style="${styles.h2_normal}">Certifications:</div>
                <div style="border-top: 1pt solid black; margin-bottom: 4pt;"></div>
                <div>
                    ${certifications.join(', ')}
                </div>
            </div>

        </body>
        </html>
    `;
};
