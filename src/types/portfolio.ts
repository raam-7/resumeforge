export interface SocialLink {
  platform: string;
  url: string;
}

export interface Skill {
  name: string;
  category?: string;
}

export interface Experience {
  company: string;
  role: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startYear?: string;
  endYear?: string;
  grade?: string;
}

export interface Certification {
  name: string;
  issuer?: string;
  issueDate?: string;
  credentialUrl?: string;
}

export interface PersonalInfo {
  fullName: string;
  headline?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;

  summary: string;

  skills: Skill[];

  experience: Experience[];

  projects: Project[];

  education: Education[];

  certifications: Certification[];

  socialLinks: SocialLink[];
}