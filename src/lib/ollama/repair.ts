import type { PortfolioData } from "@/types/portfolio";

export function repairPortfolioData(
  data: any
): PortfolioData {
  const socialLinks = [];

  // -----------------------------------------
  // Professional Profile
  // -----------------------------------------

  const professionalProfile = {
    title:
      data?.professionalProfile?.title ||
      "",

    domain:
      data?.professionalProfile?.domain ||
      "",

    specializations:
      Array.isArray(
        data?.professionalProfile?.specializations
      )
        ? data.professionalProfile.specializations.filter(
            (item: unknown) =>
              typeof item === "string"
          )
        : [],

    seniority:
      data?.professionalProfile?.seniority ||
      "",

    evidence:
      Array.isArray(
        data?.professionalProfile?.evidence
      )
        ? data.professionalProfile.evidence.filter(
            (item: unknown) =>
              typeof item === "string"
          )
        : [],
  };

  // -----------------------------------------
  // Personal Information
  // -----------------------------------------

 const personalInfo = {
  fullName:
    data?.personalInfo?.fullName ||
    data?.personalInfo?.full_name ||
    data?.personalInfo?.name ||
    data?.personalInfo?.candidateName ||
    data?.personal?.fullName ||
    data?.personal?.full_name ||
    data?.personal?.name ||
    data?.personal?.candidateName ||
    "",

  email:
    data?.personalInfo?.email ||
    data?.personal?.email ||
    "",

  phone:
    data?.personalInfo?.phone ||
    data?.personal?.phone ||
    "",

  location:
    data?.personalInfo?.location ||
    data?.personalInfo?.address ||
    data?.personal?.location ||
    data?.personal?.address ||
    "",

  website:
    data?.personalInfo?.website ||
    data?.personal?.website ||
    "",

  linkedin:
    data?.personalInfo?.linkedin ||
    data?.personalInfo?.linkedIn ||
    data?.personal?.linkedin ||
    data?.personal?.linkedIn ||
    "",

  github:
    data?.personalInfo?.github ||
    data?.personal?.github ||
    "",
};

  // -----------------------------------------
  // Social Links
  // -----------------------------------------

  if (
    personalInfo.linkedin
  ) {
    socialLinks.push({
      platform: "LinkedIn",
      url: ensureUrl(
        personalInfo.linkedin
      ),
    });
  }

  if (
    personalInfo.github
  ) {
    socialLinks.push({
      platform: "GitHub",
      url: ensureUrl(
        personalInfo.github
      ),
    });
  }

  if (
    personalInfo.website
  ) {
    socialLinks.push({
      platform: "Website",
      url: ensureUrl(
        personalInfo.website
      ),
    });
  }

  // -----------------------------------------
  // Skills
  // -----------------------------------------

  const skills = normalizeSkills(
    data?.skills
  );

  // -----------------------------------------
  // Projects
  // -----------------------------------------

  const projects = (
    Array.isArray(data?.projects)
      ? data.projects
      : []
  ).map((project: any) => ({
    title:
      project?.title ||
      project?.name ||
      "",

    description:
      Array.isArray(
        project?.description
      )
        ? project.description
        : project?.description
        ? [project.description]
        : [],

    technologies:
      Array.isArray(
        project?.technologies
      )
        ? project.technologies
        : [],

    githubUrl:
      project?.githubUrl ||
      project?.github ||
      "",

    liveUrl:
      project?.liveUrl ||
      project?.url ||
      "",
  }));

  // -----------------------------------------
  // Experience
  // -----------------------------------------

  const experience = (
    Array.isArray(data?.experience)
      ? data.experience
      : []
  ).map((item: any) => ({
    company:
      item?.company ||
      "",

    role:
      item?.role ||
      item?.title ||
      "",

    location:
      item?.location ||
      "",

    startDate:
      item?.startDate ||
      "",

    endDate:
      item?.endDate ||
      "",

    current:
      item?.current ||
      false,

    description:
      Array.isArray(
        item?.description
      )
        ? item.description
        : item?.description
        ? [item.description]
        : [],
  }));

  // -----------------------------------------
  // Final Portfolio Data
  // -----------------------------------------

  return {
    professionalProfile,

    personalInfo,

    summary:
      data?.summary ||
      "",

    skills,

    experience,

    projects,

    education:
      Array.isArray(data?.education)
        ? data.education
        : [],

    certifications:
      Array.isArray(
        data?.certifications
      )
        ? data.certifications
        : [],

    achievements:
      Array.isArray(
        data?.achievements
      )
        ? data.achievements
        : [],

    languages:
      Array.isArray(data?.languages)
        ? data.languages
        : [],

    interests:
      Array.isArray(data?.interests)
        ? data.interests
        : [],

    socialLinks,
  };
}

function normalizeSkills(
  skills: any
) {
  if (!Array.isArray(skills)) {
    return [];
  }

  return skills
    .map((skill: any) => {
      if (
        typeof skill === "string"
      ) {
        return {
          name: skill,
        };
      }

      return {
        name:
          skill?.name ||
          "",
        category:
          skill?.category,
      };
    })
    .filter(
      (skill: any) =>
        skill.name
    );
}

function ensureUrl(
  url: string
) {
  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  return `https://${url}`;
}