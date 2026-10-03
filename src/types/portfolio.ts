export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'saas' | 'mobile' | 'branding' | 'engineering' | 'ai';
  categoryLabel: string;
  image: string;
  metrics?: string;
  liveUrl?: string;
  githubUrl?: string;
  year: string;
  tags: string[];
  description: string;
  challenge?: string;
  solution?: string;
  role: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'uiux' | 'mobile' | 'branding' | 'engineering' | 'visual3d';
  categoryLabel: string;
  image: string;
  year: string;
  client: string;
  tags: string[];
  aspectRatio?: '16:9' | '4:3' | '1:1';
  description: string;
  impact?: string;
  tools: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  specialization: string;
  honors?: string;
}

export interface ArsenalCategory {
  title: string;
  iconName: string;
  items: {
    name: string;
    subtext?: string;
    level?: string;
  }[];
}
