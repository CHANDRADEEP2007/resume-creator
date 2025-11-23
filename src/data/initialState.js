export const initialResumeState = {
    personalInfo: {
        fullName: "YOUR NAME",
        email: "email@example.com",
        phone: "123-456-7890",
        linkType: "linkedin", // 'linkedin' or 'portfolio'
        linkUrl: "linkedin.com/in/yourprofile",
        roleName: "Role Name",
        expertises: ["Expertise 1", "Expertise 2", "Expertise 3", "Expertise 4"],
    },
    summary: "Professional Summary goes here. Describe your background, key achievements, and what you bring to the table.",
    coreStrengths: [
        "Digital platform vision",
        "Self-serve experiences",
        "API/SDK ecosystems",
        "Data contracts & semantic layers",
        "KPI design & adoption analytics",
        "Experiment design (A/B, cohorts)",
        "Responsible AI & quality guardrails",
        "Roadmap & prioritization",
        "Cross-functional leadership"
    ],
    techFluency: [
        { category: "Redshift/SQL", skills: ["dbt", "Airflow"] },
        { category: "Feature stores & ML handoffs", skills: [] },
        { category: "RBAC/row-level security", skills: [] },
        { category: "Eventing & webhooks", skills: [] },
        { category: "Observability & SLAs", skills: [] }
    ],
    experience: [
        {
            id: 1,
            company: "ABC LLC",
            role: "Platform Product Manager",
            location: "New York, NY",
            startDate: "Start Date",
            endDate: "Present",
            highlights: [
                "Own the Catalog product that defines every product's standard specification.",
                "Make the product definition a single source of truth for all Client Onboarding platforms.",
                "Built self-service tool, a prompt-driven authoring tool that lets Product Owners develop definitions."
            ]
        }
    ],
    education: [
        {
            id: 1,
            degree: "Executive MBA",
            school: "University of the Cumberlands",
            year: "2023"
        }
    ],
    certifications: [
        "AWS Certified Solutions Architect (AWS)",
        "Microsoft Azure Fundamentals (AZ-900)"
    ]
};
