import { Component, OnInit } from '@angular/core';
import { getQuizCategories } from 'src/app/Models/enums/category.enum';

@Component({
  selector: 'app-search-flashcard',
  templateUrl: './search-flashcard.component.html',
  styleUrls: ['./search-flashcard.component.css']
})
export class SearchFlashcardComponent{
  constructor(){}
  categories : string[] = getQuizCategories()


  backgroundColor: { [key: string]: string } = {
    PHP: "#7587bf",        // Light Blue
    Programming: "#75e0be", // Gold
    Linux: "#e1bd18",       // Yellow
    CMS: "#87CEEB",         // SkyBlue
    Docker: "#039cfd",      // Ocean Blue
    HTML: "#e46b48",        // Salmon
    SQL: "#e0effe",         // Steel Blue
    WordPress: "#1ca7db",   // Tomato
    BASH: "#bdbfc1",        // Silver
    DevOps: "#b5daf2",      // Light SkyBlue
    Kubernetes: "#e1eafb",  // Sapphire Blue
    Angular: "#b52e31",     // Purple
  };
  
}
