import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/Services/Game/game.service';
import { Game } from 'src/app/Models/game/Game';
import { QuestionDTO } from 'src/app/Models/game/QuestionDTO';

@Component({
  selector: 'app-display-game',
  templateUrl: './display-game.component.html',
  styleUrls: ['./display-game.component.css'],
})
export class DisplayGameComponent implements OnInit {
  gameCode!: string;
  game: Game | null = null;
  questions: QuestionDTO[] = [];
  currentQuestionIndex: number = 0;
  correctAnswersCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.gameCode = params['gameCode'];
      this.getGameById();
    });
  }

  getGameById() {
    this.gameService.getGameByCode(this.gameCode).subscribe(
      (game: Game) => {
        this.game = game;
        // Fetch game questions based on game type
        this.fetchGameQuestions();
      },
      (error) => {
        console.error('Error fetching game by ID:', error);
      }
    );
  }

  fetchGameQuestions() {
    this.gameService.getGameQuestions(this.gameCode).subscribe(
      (questions: QuestionDTO[]) => {
        this.questions = questions;
        this.questions.forEach((question) => {
          question.userAnswer = null; // Initialize userAnswer for each question
        });
      },
      (error) => {
        console.error('Error fetching game questions:', error);
      }
    );
  }

  submitAnswer() {
    const selectedAnswer = this.questions[this.currentQuestionIndex].userAnswer;

    if (selectedAnswer) {
      const isCorrect = this.checkAnswer(selectedAnswer, this.questions[this.currentQuestionIndex].correctAnswer);

      // Update the correctAnswersCount
      if (isCorrect) {
        this.correctAnswersCount++;
      }

      // Move to the next question
      this.currentQuestionIndex++;

      // Reset userAnswer for the next question
      if (this.currentQuestionIndex < this.questions.length) {
        this.questions[this.currentQuestionIndex].userAnswer = null;
      }
    }
  }

  checkAnswer(selectedAnswer: string | null, correctAnswer: string): boolean {
    // Check if the selected answer is correct
    return selectedAnswer === correctAnswer;
  }

  getScore(): string {
    const totalQuestions = this.questions.length;
    const scorePercentage = (this.correctAnswersCount / totalQuestions) * 100;
    return `${this.correctAnswersCount} out of ${totalQuestions} correct (${scorePercentage.toFixed(2)}%)`;
  }

  // Helper method to check if the game is a quiz
  isQuizGame(): boolean {
    return this.game?.quiz != null;
  }

  // Helper method to check if the game is a flashcard game
  isFlashcardGame(): boolean {
    return this.game?.flashcardSet != null;
  }
}
