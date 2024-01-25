export enum Category {
  Angular = "Angular",
  Docker = "Docker",
  DataScience = "Data Science",
  PHP = "PHP",
  AI = "AI",
  iOS = "iOS",
  Security = "Security",
  Linux = "Linux",
  DevOps = "DevOps",
  Git = "Git",
  TypeScript = "TypeScript",
  HTML = "HTML",
  CloudComputing = "Cloud Computing",
  Ruby = "Ruby",
  Java = "Java",
  Kubernetes = "Kubernetes",
  JavaScript = "JavaScript",
  WordPress = "WordPress",
  Blockchain = "Blockchain",
  CMS = "CMS",
  SQL = "SQL",
  Swift = "Swift",

  UXUI = "UX UI",
}



  export function getQuizCategories(): string[] {
    return Object.values(Category);
  }
