const base = 'https://quizapi.io/api/v1';
const token = 'vcpSUYxrQftVeqfk20RMDyjtPw2ofY16KpNJqhsI';
export const QUIZ_API_ENDPOINTS = {
  base,
  questions: `${base}/questions?apiKey=${token}&limit=10`,
};