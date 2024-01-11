import { Component } from '@angular/core';
import { getQuizCategories } from 'src/app/Models/enums/quiz-category.enum';

@Component({
  selector: 'app-search-flashcard',
  templateUrl: './search-flashcard.component.html',
  styleUrls: ['./search-flashcard.component.css']
})
export class SearchFlashcardComponent  {
  constructor(){}
  categories : String[] = getQuizCategories()
  sweetColors: string[] = [
    "#FFD700", // Gold
    "#FF69B4", // HotPink
    "#87CEEB", // SkyBlue
    "#8A2BE2", // BlueViolet
    "#00FF00", // Lime
    "#9932CC", // DarkOrchid
    "#FF6347", // Tomato
    "#008080", // Teal
    "#FF4500", // OrangeRed
    "#4169E1", // RoyalBlue
  ];
}
