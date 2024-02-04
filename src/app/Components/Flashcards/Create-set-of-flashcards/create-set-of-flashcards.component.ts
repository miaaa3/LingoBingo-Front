import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Difficulty, getDifficulties } from 'src/app/Models/enums/difficulty.enum';
import { Category, getQuizCategories } from 'src/app/Models/enums/category.enum';
import { Router } from '@angular/router';
import { FlashcardService } from 'src/app/Services/Flashcards/flashcard.service';
import { FlashcardSetService } from 'src/app/Services/Flashcards/flashcardSet.service';
import { FlashcardSet } from 'src/app/Models/flashcard-set';
import { Flashcard } from 'src/app/Models/flashcard';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-set-of-flashcards',
  templateUrl: './create-set-of-flashcards.component.html',
  styleUrls: ['./create-set-of-flashcards.component.css']
})
export class CreateSetOfFlashcardsComponent implements OnInit {
  difficulties: string[] = [];
  categories: string[] = [];
    numbers: number[] = [];
  flashcardSet: FlashcardSet = {} as FlashcardSet;
  flashcards: Flashcard[] = [];
  flashcardSetForm!: FormGroup;
  flashcardsArray: AbstractControl[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private flashcardSetService: FlashcardSetService,
    private flashcardService: FlashcardService,
    private router: Router,
    private toastr: ToastrService,

  ) {}


  addNewCard(): void {
    const flashcards = this.flashcardSetForm.get('flashcards') as FormArray;
    flashcards.push(this.formBuilder.group({
      term:  ['',Validators.required],
      definition:  ['',Validators.required],
    }));      

    this.numbers.push(this.numbers.length + 1);
    this.flashcardsArray = (this.flashcardSetForm.get('flashcards') as FormArray).controls;

    }  



  ngOnInit(): void {
    this.categories = getQuizCategories();
    this.difficulties = getDifficulties();

    this.flashcardSetForm = this.formBuilder.group({
      name:  ['',Validators.required],
      description: [''],
      category: [''],
      difficulty: [''],
      flashcards: this.formBuilder.array([]),
    });
    this.flashcardsArray = (this.flashcardSetForm.get('flashcards') as FormArray).controls;

    this.addNewCard()

  }

 

  createFlashcardSet(): void {
      const flashcardSet: FlashcardSet = { ...this.flashcardSetForm.value };
      flashcardSet.category = flashcardSet.category.toUpperCase() as Category;
      flashcardSet.difficulty = flashcardSet.difficulty.toUpperCase() as Difficulty;

      this.flashcardSetService.addFlashcardSet(flashcardSet).subscribe(
        (response) => {
          console.log('Flashcard set created successfully:', flashcardSet);
          this.toastr.success('Flashcard set created successfully', 'Success');
          this.router.navigate(['/Category-content/', flashcardSet.category]);
        },
        (error) => {
          console.error('Error creating flashcard set:', error);
        }
      );
  
  }
  
  deleteCard(index: number): void {
    const flashcards = this.flashcardSetForm.get('flashcards') as FormArray;
  
    // Check if there is at least one question before deletion
    if (flashcards.length <= 1) {
      this.toastr.warning('The quiz must have at least one question.', 'Warning');
      return;
    }
  
    flashcards.removeAt(index);
    this.flashcardsArray = flashcards.controls;
  }

  isFixedHeaderVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isFixedHeaderVisible = scrollPosition > 100;
  }
  

  onQuestionDrop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.flashcardsArray , event.previousIndex, event.currentIndex);
  }
}
