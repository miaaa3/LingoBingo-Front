import { Component, OnInit } from '@angular/core';
import { Difficulty, getDifficulties } from 'src/app/Models/enums/difficulty.enum';
import { Category, getQuizCategories } from 'src/app/Models/enums/category.enum';
import { Router } from '@angular/router';
import { FlashcardService } from 'src/app/Services/Flashcards/flashcard.service';
import { FlashcardSetService } from 'src/app/Services/Flashcards/flashcardSet.service';
import { FlashcardSet } from 'src/app/Models/flashcard-set';
import { Flashcard } from 'src/app/Models/flashcard';

@Component({
  selector: 'app-create-set-of-flashcards',
  templateUrl: './create-set-of-flashcards.component.html',
  styleUrls: ['./create-set-of-flashcards.component.css']
})
export class CreateSetOfFlashcardsComponent implements OnInit {
  difficulties: string[] = [];
  categories: string[] = [];
  numbers: number[] = [];
  flashcardSet: FlashcardSet = { name: '', description: '', flashcards: [] };
  flashcards: Flashcard[] = [];

  constructor(
    private flashcardSetService: FlashcardSetService,
    private flashcardService: FlashcardService,
    private router: Router
  ) {}

  addNewCard(): void {
    const newFlashcard: Flashcard = { term: '', definition: '' };
    this.flashcards.push(newFlashcard);
    this.numbers.push(this.numbers.length + 1);
  }

  ngOnInit(): void {
    this.numbers = [1, 2];
    this.categories = getQuizCategories();
    this.difficulties = getDifficulties();
    this.addNewCard();
  }

  createFlashcardSet() {
    this.flashcardSet.flashcards = this.flashcards;

    this.flashcardSetService.addFlashcardSet(this.flashcardSet).subscribe(
      (response) => {
        console.log('Flashcard set created successfully:', response);
        this.router.navigate(['']); 
      },
      (error) => {
        console.error('Error creating flashcard set:', error);
      }
    );
  }
}
