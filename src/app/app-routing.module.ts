import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/Home/home-page/home-page.component';
import { AllQuizzesComponent } from './Components/All-quizzes/all-quizzes.component';
import { SearchFlashcardComponent } from './Components/Search-flashcard/search-flashcard.component';


const routes: Routes = [
  {path:'Home', component:HomePageComponent},
  {path:'Search', component:SearchFlashcardComponent},
  {path:'All-quizzes', component:AllQuizzesComponent},
  {path:'', redirectTo:'Home', pathMatch:'full'},
  {path:'**',redirectTo:'Home'},
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
