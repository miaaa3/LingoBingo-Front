export class CorrectAnswers {
    answer_a_correct!: string;
    answer_b_correct: string | null = null;
    answer_c_correct: string | null = null;
    answer_d_correct: string | null = null;
    answer_e_correct: string | null = null;
    answer_f_correct: string | null = null;

    constructor(data: any) {
      this.answer_a_correct = data.answer_a_correct;
      this.answer_b_correct = data.answer_b_correct;
      this.answer_c_correct = data.answer_c_correct;
      this.answer_d_correct = data.answer_d_correct;
      this.answer_e_correct = data.answer_e_correct;
      this.answer_f_correct = data.answer_f_correct;
    }
    static fromJson(json: any): CorrectAnswers {
      return new CorrectAnswers({
        answer_a_correct: json.answer_a_correct,
        answer_b_correct: json.answer_b_correct,
        answer_c_correct: json.answer_c_correct,
        answer_d_correct: json.answer_d_correct,
        answer_e_correct: json.answer_e_correct,
        answer_f_correct: json.answer_f_correct,
      });
    }
  }