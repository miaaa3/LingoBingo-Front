export class Answers {
    answer_a!: string;
    answer_b: string | null = null;
    answer_c: string | null = null;
    answer_d: string | null = null;
    answer_e: string | null = null;
    answer_f: string | null = null;
  
    constructor(data: any) {
      this.answer_a = data.answer_a;
      this.answer_b = data.answer_b;
      this.answer_c = data.answer_c;
      this.answer_d = data.answer_d;
      this.answer_e = data.answer_e;
      this.answer_f = data.answer_f;
    }
    static fromJson(json: any): Answers {
        return new Answers({
          answer_a: json.answer_a,
          answer_b: json.answer_b,
          answer_c: json.answer_c,
          answer_d: json.answer_d,
          answer_e: json.answer_e,
          answer_f: json.answer_f,
        });
      }
    
  }