import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Components/Home/home-page/home-page.component';
import { NavbarComponent } from './Components/Home/navbar/navbar.component';
import { SidebarComponent } from './Components/Home/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFlashcardComponent } from './Components/Search-flashcard/search-flashcard.component';
import { HttpClientModule } from '@angular/common/http';
import { AllQuizzesComponent } from './Components/All-quizzes/all-quizzes.component';
import { DisplayQuizComponent } from './Components/Display-quiz/display-quiz.component';
import { CreateQuizComponent } from './Components/create-quiz/create-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    SidebarComponent,
    SearchFlashcardComponent,
    AllQuizzesComponent,
    DisplayQuizComponent,
    CreateQuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
