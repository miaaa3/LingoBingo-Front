import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, getQuizCategories } from 'src/app/Models/enums/category.enum';
import { Question } from 'src/app/Models/question.model';
import { GenerateQuizService } from 'src/app/Services/Quiz/generate-quiz.service';

@Component({
  selector: 'app-category-content',
  templateUrl: './category-content.component.html',
  styleUrls: ['./category-content.component.css']
})
export class CategoryContentComponent implements OnInit {
  category!: Category;

  constructor(private route: ActivatedRoute, private quizService: GenerateQuizService) {
    this.route.params.subscribe(params => {
      const categoryName = params['category'];
      this.category = this.getCategoryFromString(categoryName);    });
  }

  ngOnInit(): void {
    this.quizService.generateQuizzesForCategory(this.category).subscribe(
      (questions: Question[]) => {
        console.log(questions);
      },
      (error) => {
        console.error('Error generating quizzes:', error);
      }
    );
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
