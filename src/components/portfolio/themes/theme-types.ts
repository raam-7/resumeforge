import type {
  Education,
  Experience,
  PersonalInfo,
  ProfessionalProfile,
  Project,
  Skill,
} from "@/types/portfolio";

type ThemePersonalInfo = Partial<PersonalInfo> & {
  name?: string;
  linkedin?: string;
  linkedIn?: string;
  github?: string;
};

type ThemeProfessionalProfile = Partial<ProfessionalProfile>;

export type ThemeData = {
  personalInfo?: ThemePersonalInfo;
  personal?: ThemePersonalInfo;
  professionalProfile?: ThemeProfessionalProfile;
  summary?: string | null;
  skills?: Array<Skill | string>;
  experience?: Array<Partial<Experience> & {
    title?: string;
    description?: string | string[] | null;
  }>;
  projects?: Array<Partial<Project> & {
    name?: string;
    description?: string | string[] | null;
    technologies?: string[] | null;
    url?: string | null;
  }>;
  education?: Array<Partial<Education> & {
    location?: string;
    startDate?: string;
    endDate?: string;
  }>;
};

export type ThemeProps = {
  data: ThemeData;
};
