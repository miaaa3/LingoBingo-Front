import { Answers } from "./answers.model";
import { CorrectAnswers } from "./correct-answers.model";
import { Tag } from "./tag.model";

export class Question {
    id!: number;
    question!: string;
    description: string | null = null;
    answers!: Answers;
    multiple_correct_answers: string | null = null;
    correct_answers!: CorrectAnswers;
    correct_answer: string | null = null;
    explanation: string | null = null;
    tip: string | null = null;
    tags: Tag[] = [];
    category!: string;
    difficulty!: string;

    constructor(data: any) {
      this.id = data.id;
      this.question = data.question;
      this.description = data.description;
      this.answers = new Answers(data.answers);
      this.multiple_correct_answers = data.multiple_correct_answers;
      this.correct_answers = new CorrectAnswers(data.correct_answers);
      this.correct_answer = data.correct_answer;
      this.explanation = data.explanation;
      this.tip = data.tip;
      this.tags = data.tags.map((tag: any) => new Tag(tag));
      this.category = data.category;
      this.difficulty = data.difficulty;
    }
    static fromJson(json: any): Question {
      return new Question({
        id: json.id,
        question: json.question,
        description: json.description,
        answers: Answers.fromJson(json.answers),
        multiple_correct_answers: json.multiple_correct_answers,
        correct_answers: CorrectAnswers.fromJson(json.correct_answers),
        correct_answer: json.correct_answer,
        explanation: json.explanation,
        tip: json.tip,
        tags: json.tags.map((tag: any) => Tag.fromJson(tag)),
        category: json.category,
        difficulty: json.difficulty,
      });
    }


  

  }


