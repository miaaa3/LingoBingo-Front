import { Component, OnInit } from '@angular/core';
import { BgColors } from 'src/app/Models/BgColors';
import { Category, getQuizCategories } from 'src/app/Models/enums/category.enum';

@Component({
  selector: 'app-search-flashcard',
  templateUrl: './search-flashcard.component.html',
  styleUrls: ['./search-flashcard.component.css']
})
export class SearchFlashcardComponent{
  constructor(){}
  categories : string[] = getQuizCategories()




  getBackgroundColor(category: string): string {
    const bgColors: Record<string, string> = BgColors;
    const defaultColor = "#ffffff";
    
    const formattedCategory = category.replace(/\s/g, '').toLowerCase();
    
    for (const key in bgColors) {
      if (bgColors.hasOwnProperty(key) && key.replace(/\s/g, '').toLowerCase() === formattedCategory) {
        return bgColors[key];
      }
    }
  
    return defaultColor;
  }
  
   
}
