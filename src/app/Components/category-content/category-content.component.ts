import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BgColors } from 'src/app/Models/BgColors';
import { Category, getQuizCategories } from 'src/app/Models/enums/category.enum';
import { FlashcardSet } from 'src/app/Models/flashcard-set';
import { Question } from 'src/app/Models/question.model';
import { Quiz } from 'src/app/Models/quiz.model';
import { FlashcardSetService } from 'src/app/Services/Flashcards/flashcardSet.service';
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
  flashcardSets: FlashcardSet[] = [];
  numbers: number[] = [];
  selectedDifficulty: string | null = null;
  

  constructor(
    private route: ActivatedRoute,
    private quizservice: QuizService,
    private flashcardSetService: FlashcardSetService
  ) {
    this.route.params.subscribe(params => {
      const categoryName = params['category'];
      this.category = this.getCategoryFromString(categoryName);
      this.category = categoryName.toUpperCase().replace(/[\s_]/g, ''); 
    });
  }



  getBackgroundColor(category: string): string {
    const bgColors: Record<string, string> = BgColors;
    const defaultColor = "#ffffff";
  
    const lowerCaseCategory = category.toLowerCase();
    
      for (const key in bgColors) {
      if (bgColors.hasOwnProperty(key) && key.toLowerCase() === lowerCaseCategory) {
        return bgColors[key];
      }
    }
    return defaultColor;

}

  ngOnInit(): void {
    this.loadQuizzes();
    this.loadFlashcardSets();
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

  loadFlashcardSets(): void {
    this.flashcardSetService.getAllFlashcardSetsByCategory(this.category).subscribe(
      (flashcardSetsList: any[]) => {
        this.flashcardSets = flashcardSetsList;
      },
      (error) => {
        console.error('Error loading flashcard sets:', error);
      }
    );
  }

  getFlashcardSetsByDifficulty(difficulty: string): void {
    this.selectedDifficulty = difficulty;
    this.flashcardSetService.getAllFlashcardSetsByCategoryAndDifficulty(
      this.category.toString(),
      difficulty
    ).subscribe(
      (flashcardSetsList: any[]) => {
        this.flashcardSets = flashcardSetsList;
      },
      (error) => {
        console.error('Error loading flashcard sets:', error);
      }
    );
  }

  getQuizzesByDifficultyAndCategory(difficulty: string): void {
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
