import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/Home/home-page/home-page.component';
import { AllQuizzesComponent } from './Components/Quizzes/All-quizzes/all-quizzes.component';
import { CreateQuizComponent } from './Components/Quizzes/create-quiz/create-quiz.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { ResetPasswordComponent } from './Components/Auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './Components/Auth/forgot-password/forgot-password.component';
import { SearchFlashcardComponent } from './Components/Search-flashcard/search-flashcard.component';
import { CreateSetOfFlashcardsComponent } from './Components/Flashcards/Create-set-of-flashcards/create-set-of-flashcards.component';
import { CategoryContentComponent } from './Components/category-content/category-content.component';


const routes: Routes = [
  {path:'Home', component:HomePageComponent},
  {path:'Search', component:SearchFlashcardComponent},
  {path:'All-quizzes', component:AllQuizzesComponent},
  {path:'Create-quiz', component:CreateQuizComponent},
  {path:'Login', component:LoginComponent},
  {path:'Register', component:RegisterComponent},
  {path:'Reset-password', component:ResetPasswordComponent},
  {path:'Forgot-password', component:ForgotPasswordComponent},
  {path:'Create-flashcard', component:CreateSetOfFlashcardsComponent},
  {path:"Category-content/:category",component:CategoryContentComponent},
  {path:'', redirectTo:'Home', pathMatch:'full'},
  {path:'**',redirectTo:'Home'},
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
