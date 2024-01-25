export enum Difficulty {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard',
}
export function getDifficulties(): string[] {
    return Object.values(Difficulty);
  }