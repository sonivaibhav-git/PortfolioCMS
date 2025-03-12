export interface Project {
  id: string;
  name: string;
  desc: string;
  githubLink: string;
  viewLink: string;
  imageSrc: string;
}

export interface Tool {
  name: string;
  imageSrc: string;
}

export interface Technology {
  name: string;
  imageSrc: string;
}

export interface Skills {
  tools: Tool[];
  technologies: {
    frontend: Technology[];
    backend: Technology[];
    database: Technology[];
  };
  languages: {
    name: string;
    imageSrc: string;
  }[];
}

export interface Achievement {
  title: string;
  position: string;
  date: string;
  company: string;
}

export interface PortfolioData {
  projects: Project[];
  skills: Skills;
  achievements: Achievement[];
}