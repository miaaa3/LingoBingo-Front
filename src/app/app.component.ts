import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Difficulty } from './Models/enums/difficulty.enum';
import { QuizCategory } from './Models/enums/quiz-category.enum';
import { Question } from './Models/question.model';
import { GenerateQuizService } from './Services/generate-quiz.service';
import { QuizApiService } from './Services/quiz-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  questions: Question[] = [];
  questionsByCategory: Question[] = [];
  questionsByDifficulty: Question[] = [];
  testQuiz: Question[] = [];
  quizzesByCategory : Question[]=[] 
  
  title = 'QuizIt';

  constructor(private test:QuizApiService, private generateQuiz : GenerateQuizService,private router: Router) {}

  shouldDisplay(): boolean {
    const currentRoute = this.router.url;
    return !currentRoute.includes('/Create-quiz');
  }

  ngOnInit(): void {
    this.loadQuestions()
  }

  loadQuestions(): void {
    // this.test.getQuestions().subscribe(
    //   (data) => {
    //     this.questions = data;
    //     console.warn(this.questions)
    //   },
    //   (error) => {
    //     console.error('Error loading questions:', error);
    //   }
    // );
    // this.test.getQuestionsByCategory('Linux').subscribe(
    //   (data) => {
    //     this.questionsByCategory = data;
    //     console.warn(this.questionsByCategory)
    //   },
    //   (error) => {
    //     console.error('Error loading questions:', error);
    //   }
    // );
    // this.test.getQuestionsByDifficulty(Difficulty.Medium).subscribe(
    //   (data) => {
    //     this.questionsByDifficulty = data;
    //     console.warn(this.questionsByDifficulty)
    //   },
    //   (error) => {
    //     console.error('Error loading questions:', error);
    //   }
    // )

    // this.generateQuiz.generateQuizzes().subscribe(data => {
    //   this.testQuiz = data;
    //   console.warn(this.testQuiz)
    // });
    this.generateQuiz.generateQuizzesForCategory(QuizCategory.CMS).subscribe(data => {
      this.quizzesByCategory = data;
      console.warn(this.quizzesByCategory)
    });
  }

  
}
