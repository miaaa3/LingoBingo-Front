export enum Category {
  Angular = "Angular",
  BASH = "BASH",
  CMS = "CMS",
  DevOps = "DevOps",
  Docker = "Docker",
  HTML = "HTML",
  Kubernetes = "Kubernetes",
  Linux = "Linux",
  PHP = "PHP",
  Programing = "Programming",
  SQL = "SQL",
  WordPress = "WordPress",
}

export function getQuizCategories(): string[] {
  return Object.values(Category);
}
