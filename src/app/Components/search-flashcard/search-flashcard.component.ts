import { Component, OnInit } from '@angular/core';
import { getQuizCategories } from 'src/app/Models/enums/quiz-category.enum';

@Component({
  selector: 'app-search-flashcard',
  templateUrl: './search-flashcard.component.html',
  styleUrls: ['./search-flashcard.component.css']
})
export class SearchFlashcardComponent  implements OnInit{
  constructor(){}
  categories : String[] = getQuizCategories()
  imgs = new Array();

  ngOnInit() {
    this.pload(
      "/assets/images/search/BASH.png",
      "/assets/images/search/CMS.png",
      "/assets/images/search/Code.png",
      "/assets/images/search/DevOps.png",
      "/assets/images/search/Docker.png",
      "/assets/images/search/HTML.png",
      "/assets/images/search/Kubernetes.png",
      "/assets/images/search/Linux.png",
      "/assets/images/search/PHP.png",
      "/assets/images/search/SQL.png",
      "/assets/images/search/WordPress.png",
    );
  }

  pload(...args: any[]):void {
    for (var i = 0; i < args.length; i++) {
      const img = new Image();
      img.src = args[i];
      this.imgs.push(img);
    }
  }
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
