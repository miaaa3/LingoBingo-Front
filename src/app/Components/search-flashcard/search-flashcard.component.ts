import { Component, OnInit } from '@angular/core';
import { BgColors } from 'src/app/Models/BgColors';
import { Category, getQuizCategories } from 'src/app/Models/enums/category.enum';



@Component({
  selector: 'app-search-flashcard',
  templateUrl: './search-flashcard.component.html',
  styleUrls: ['./search-flashcard.component.css'],
  
})
export class SearchFlashcardComponent implements OnInit{
  constructor(){}
  categories : string[] = getQuizCategories()


  backgroundColor: { [key: string]: string } = {
    AI: "#9a2e7b",           
    Angular: "#b52e31",      
    Blockchain: "#1d84cf",   
    CMS: "#87CEEB",          
    CloudComputing: "#9fabe8",
    DataScience: "#a0a9ba", 
    DevOps: "#b5daf2",      
    Docker: "#039cfd",      
    Git: "#f2f3f4",         
    HTML: "#e46b48",        
    iOS: "#caf2b5",         
    Java: "#fff",           
    JavaScript: "#f1e05a",     
    Kubernetes: "#e1eafb",     
    Linux: "#e1bd18",          
    PHP: "#7587bf",            
    Python: "#306998",         
    Ruby: "#cc342d",           
    Security: "#99c2a2",       
    SQL: "#e0effe",            
    Swift: "#ffac45",          
    TypeScript: "#ff2ff",      
    UXUI: "#5d5d5d",            
    WordPress: "#1ca7db",       
  };

  searchItem! : string;


  async ngOnInit() {
    this.searchItem = ''
    this.categories =  getQuizCategories();
  }

  filterResults(text: string) {
    if (text.trim() === '') {
      this.categories = getQuizCategories();
    } else {
      this.categories = getQuizCategories().filter(
        cat => cat.toLowerCase().includes(text.toLowerCase())
      );
    }
  }
  

  get filteredCategories(): string[] {
    return this.categories.filter(category => category.toLowerCase().includes(this.searchItem.toLowerCase()));
  }
  

  getBackgroundColor(category: string): string {
    const bgColors: Record<string, string> = BgColors;
    const defaultColor = "#ffffff"; // Replace with your default color
    return bgColors[category as keyof typeof BgColors] || defaultColor;
  }
   
}
