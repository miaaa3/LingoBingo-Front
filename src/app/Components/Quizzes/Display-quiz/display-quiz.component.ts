import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/Services/Quiz/quiz.service';
import { Quiz } from 'src/app/Models/quiz.model';

@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.css'],
})
export class DisplayQuizComponent implements OnInit {
  quizId!: number ;
  quiz : Quiz = new Quiz;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizId = params['id'];
      this.getQuizById();
    });
  }

  getQuizById() {
    this.quizService.getQuizById(this.quizId).subscribe(
      (quiz: Quiz) => {
        this.quiz = quiz;
        console.log(quiz)
      },
      (error) => {
        console.error('Error fetching quiz by ID:', error);
      }
    );
  }
}
