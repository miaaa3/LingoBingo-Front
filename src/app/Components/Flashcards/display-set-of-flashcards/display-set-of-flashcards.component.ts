import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Flashcard } from 'src/app/Models/flashcard';
import { FlashcardSet } from 'src/app/Models/flashcard-set';
import { GameSettings } from 'src/app/Models/game/GameSettings';
import { FlashcardSetService } from 'src/app/Services/Flashcards/flashcardSet.service';
import { GameService } from 'src/app/Services/game.service';

@Component({
  selector: 'app-display-set-of-flashcards',
  templateUrl: './display-set-of-flashcards.component.html',
  styleUrls: ['./display-set-of-flashcards.component.css']
})
export class DisplaySetOfFlashcardsComponent implements OnInit {
  gameSettings: GameSettings = {} as GameSettings;
  gameSettingsForm!: FormGroup;
  
  startGame(): void {
    if (this.gameSettingsForm.valid) {
      const gameSettings: GameSettings = this.gameSettingsForm.value;

    //   this.gameService.startGame(gameSettings).subscribe(
    //     (game) => {
    //       Show success toast
    //       this.toastr.success('Game started successfully!', 'Success');
    //       console.log('Game started successfully:', game);

    //       Navigate to the game page with the game code
    //       this.router.navigate(['/GameLobby', game.gameCode]);
    //     },
    //     (error) => {
    //       Show error toast
    //       this.toastr.error('Failed to start the game. Please try again.', 'Error');
    //       console.error('Error starting the game:', error);
    //     }
    //   );
    // } else {
    //   Show warning toast for invalid form
    //   this.toastr.warning('Please fill in all required fields.', 'Form Invalid');
    // }
    }
  }

  flashcardSetId!: number;
  flashcardSet: FlashcardSet | undefined;
  flashcards: Flashcard[] = [];

  constructor(
    private router:Router,
    private route: ActivatedRoute, 
    private flashcardSetService: FlashcardSetService,
    private formBuilder: FormBuilder,
    private gameService: GameService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.flashcardSetId = params['id'];
      this.getFlashcardSetById();
    });
    this.gameSettingsForm = new FormGroup({
      flashcardsToAnswer: new FormControl(5, [Validators.required, Validators.min(1)]), // Default value of 5
      switchMode: new FormControl('BOTH', [Validators.required]),
    });
  }

  getFlashcardSetById() {
    this.flashcardSetService.getFlashcardSetById(this.flashcardSetId).subscribe(
      (flashcardSet: FlashcardSet) => {
        this.flashcardSet = flashcardSet;
        this.flashcards = flashcardSet.flashcards ? flashcardSet.flashcards.map((flashcard) => ({ ...flashcard })) : [];
      },
      (error) => {
        console.error('Error fetching flashcardSet by ID:', error);
      }
    );
  }
  // Assuming this is in your component class
  currentFlashcardIndex: number = 0;

  goToNextFlashcard() {
    if (this.currentFlashcardIndex < this.flashcardSet.flashcards.length - 1) {
      this.currentFlashcardIndex++;
    }
  }

  goToPreviousFlashcard() {
    if (this.currentFlashcardIndex > 0) {
      this.currentFlashcardIndex--;
    }
  }

  flipFlashcard(flashcard: Flashcard) {
    flashcard.flipped = !flashcard.flipped;
  }


}