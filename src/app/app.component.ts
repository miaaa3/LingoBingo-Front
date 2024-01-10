import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Question } from './Models/question.model';
import { QuizApiService } from './Services/quiz-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  questions: Question[] = [];
  constructor(private test:QuizApiService){}
  ngOnInit(): void {
    this.loadQuestions()
  }

  loadQuestions(): void {
    this.test.getQuestions().subscribe(
      (data) => {
        this.questions = data;
        console.warn(this.questions)
      },
      (error) => {
        console.error('Error loading questions:', error);
      }
    );
  }

  title = 'QuizIt';

}
