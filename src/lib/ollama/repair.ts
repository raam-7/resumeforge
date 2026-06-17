import type { PortfolioData } from "@/types/portfolio";

export function repairPortfolioData(
  data: any
): PortfolioData {
  const socialLinks = [];

  const personalInfo = {
    fullName:
      data?.personalInfo?.fullName ||
      data?.personalInfo?.name ||
      "",

    email:
      data?.personalInfo?.email || "",

    phone:
      data?.personalInfo?.phone || "",

    location:
      data?.personalInfo?.location ||
      data?.personalInfo?.address ||
      "",

    website:
      data?.personalInfo?.website || "",
  };

  if (data?.personalInfo?.linkedIn) {
    socialLinks.push({
      platform: "LinkedIn",
      url: ensureUrl(
        data.personalInfo.linkedIn
      ),
    });
  }

  if (data?.personalInfo?.github) {
    socialLinks.push({
      platform: "GitHub",
      url: ensureUrl(
        data.personalInfo.github
      ),
    });
  }

  const skills = normalizeSkills(
    data?.skills
  );

  const projects = (
    data?.projects || []
  ).map((project: any) => ({
    title:
      project.title ||
      project.name ||
      "",

    description:
      project.description || "",

    technologies:
      Array.isArray(
        project.technologies
      )
        ? project.technologies
        : [],

    githubUrl:
      project.githubUrl || "",

    liveUrl:
      project.liveUrl || "",
  }));

  const experience = (
    data?.experience || []
  ).map((item: any) => ({
    company:
      item.company || "",

    role:
      item.role ||
      item.title ||
      "",

    location:
      item.location || "",

    startDate:
      item.startDate || "",

    endDate:
      item.endDate || "",

    current:
      item.current || false,

    description: Array.isArray(
      item.description
    )
      ? item.description
      : item.description
      ? [item.description]
      : [],
  }));

  return {
    personalInfo,

    summary:
      data?.summary || "",

    skills,

    experience,

    projects,

    education:
      data?.education || [],

    certifications:
      data?.certifications || [],

    socialLinks,
  };
}

function normalizeSkills(
  skills: any
) {
  if (!Array.isArray(skills)) {
    return [];
  }

  return skills.map(
    (skill: any) => {
      if (
        typeof skill === "string"
      ) {
        return {
          name: skill,
        };
      }

      return {
        name:
          skill?.name || "",
        category:
          skill?.category,
      };
    }
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