import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, getQuizCategories } from 'src/app/Models/enums/category.enum';
import { Question } from 'src/app/Models/question.model';
import { Quiz } from 'src/app/Models/quiz.model';
import { QuizApiService } from 'src/app/Services/Quiz/quiz-api.service';
import { QuizService } from 'src/app/Services/Quiz/quiz.service';

@Component({
  selector: 'app-category-content',
  templateUrl: './category-content.component.html',
  styleUrls: ['./category-content.component.css']
})
export class CategoryContentComponent implements OnInit {
  category!: Category;
  quizzes: Quiz[] = [];
  numbers: number[] = [];
  selectedDifficulty: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private quizservice: QuizService
  ) {
    this.route.params.subscribe(params => {
      const categoryName = params['category'];
      this.category = this.getCategoryFromString(categoryName);
    });
  }

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizservice.getQuizzesByCategory(this.category).subscribe(
      (quizzesList: Quiz[]) => {
        this.quizzes = quizzesList;
      },
      (error) => {
        console.error('Error loading quizzes:', error);
      }
    );
  }

  getQuestionsByDifficultyAndCategory(difficulty: string): void {
    this.selectedDifficulty = difficulty;
    this.quizservice.getQuizzesByCategoryAndDifficulty(this.category, difficulty).subscribe(
      (quizzes: Quiz[]) => {
        this.quizzes = quizzes;
        console.log(quizzes)
      },
      (error) => {
        console.error('Error loading quizzes:', error);
      }
    );
  }

  resetDifficultyFilter(): void {
    this.selectedDifficulty = null;
    this.loadQuizzes();
  }

  private getCategoryFromString(categoryName: string): Category {
    const categories = getQuizCategories();
    const category = categories.find(cat => cat === categoryName);

    if (category) {
      return category as Category;
    } else {
      throw new Error(`Invalid category: ${categoryName}`);
    }
  }
}
