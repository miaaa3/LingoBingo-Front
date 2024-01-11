export enum QuizCategory {
    PHP = "PHP",
    Code = "Code",
    Linux = "Linux",
    CMS = "CMS",
    Docker = "Docker",
    HTML = "HTML",
    SQL = "SQL",
    WordPress = "WordPress",
    BASH = "BASH",
    DevOps = "DevOps",
    Kubernetes = "Kubernetes"
  }
  export function getQuizCategories(): string[] {
    return Object.values(QuizCategory);
  }