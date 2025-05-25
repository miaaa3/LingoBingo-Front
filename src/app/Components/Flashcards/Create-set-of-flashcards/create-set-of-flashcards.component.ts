import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Difficulty, getDifficulties } from 'src/app/Models/enums/difficulty.enum';
import { Category, getQuizCategories } from 'src/app/Models/enums/category.enum';
import { Router } from '@angular/router';
import { FlashcardSetService } from 'src/app/Services/Flashcards/flashcardSet.service';
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
  flashcardSetForm!: FormGroup;
  flashcardsArray: AbstractControl[] = [];

  // Initialize isFixedHeaderVisible
  isFixedHeaderVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    private flashcardSetService: FlashcardSetService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  addNewCard(): void {
    const flashcards = this.flashcardSetForm.get('flashcards') as FormArray;
    flashcards.push(this.formBuilder.group({
      term: ['', Validators.required],
      definition: ['', Validators.required],
      image: [null],  // Adding image field for each flashcard
    }));
    this.numbers.push(this.numbers.length + 1);
    this.flashcardsArray = (this.flashcardSetForm.get('flashcards') as FormArray).controls;
  }

  // Handling the image change event for each flashcard
  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      const flashcards = this.flashcardSetForm.get('flashcards') as FormArray;
      const cardForm = flashcards.at(index);
      cardForm.patchValue({ image: file });
    }
  }

  ngOnInit(): void {
    this.categories = getQuizCategories();
    this.difficulties = getDifficulties();

    this.flashcardSetForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      category: [''],
      difficulty: [''],
      flashcards: this.formBuilder.array([]),
    });

    this.flashcardsArray = (this.flashcardSetForm.get('flashcards') as FormArray).controls;

    this.addNewCard(); // Initialize with one card
  }

  createFlashcardSet(): void {
    const flashcardSet = { ...this.flashcardSetForm.value };
    flashcardSet.category = flashcardSet.category.toUpperCase();
    flashcardSet.difficulty = flashcardSet.difficulty.toUpperCase();

    this.flashcardSetService.addFlashcardSet(flashcardSet).subscribe(
      (response) => {
        this.toastr.success('Flashcard set created successfully', 'Success');
        this.router.navigate(['/Category-content/', flashcardSet.category]);
      },
      (error) => {
        console.error('Error creating flashcard set:', error);
        this.toastr.error('Error creating flashcard set', 'Error');
      }
    );
  }

  deleteCard(index: number): void {
    const flashcards = this.flashcardSetForm.get('flashcards') as FormArray;
    if (flashcards.length <= 1) {
      this.toastr.warning('You must have at least one card.', 'Warning');
      return;
    }
    flashcards.removeAt(index);
    this.flashcardsArray = flashcards.controls;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isFixedHeaderVisible = scrollPosition > 100;  // Show header when scroll position > 100px
  }

  onQuestionDrop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.flashcardsArray, event.previousIndex, event.currentIndex);
  }
}
