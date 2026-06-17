export function validatePortfolioData(data: any) {
  return {
    personalInfo: data.personalInfo ?? {},
    summary: data.summary ?? "",
    skills: Array.isArray(data.skills)
      ? data.skills
      : [],
    experience: Array.isArray(data.experience)
      ? data.experience
      : [],
    projects: Array.isArray(data.projects)
      ? data.projects
      : [],
    education: Array.isArray(data.education)
      ? data.education
      : [],
    certifications: Array.isArray(data.certifications)
      ? data.certifications
      : [],
    socialLinks: Array.isArray(data.socialLinks)
      ? data.socialLinks
      : [],
  };
}