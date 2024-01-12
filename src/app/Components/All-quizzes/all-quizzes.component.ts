import { Component } from '@angular/core';
import { getQuizCategories } from 'src/app/Models/enums/quiz-category.enum';

@Component({
  selector: 'app-all-quizzes',
  templateUrl: './all-quizzes.component.html',
  styleUrls: ['./all-quizzes.component.css']
})
export class AllQuizzesComponent {
  quizCategories: string[];

  constructor() {
    this.quizCategories = getQuizCategories();
  }
}
