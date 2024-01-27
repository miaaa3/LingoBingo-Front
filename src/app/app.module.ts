import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Components/Home/home-page/home-page.component';
import { NavbarComponent } from './Components/Home/navbar/navbar.component';
import { SidebarComponent } from './Components/Home/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFlashcardComponent } from './Components/Search-flashcard/search-flashcard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AllQuizzesComponent } from './Components/Quizzes/All-quizzes/all-quizzes.component';
import { DisplayQuizComponent } from './Components/Quizzes/Display-quiz/display-quiz.component';
import { CreateQuizComponent } from './Components/Quizzes/create-quiz/create-quiz.component';
import { FooterComponent } from './Components/Home/footer/footer.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';

import { ResetPasswordComponent } from './Components/Auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './Components/Auth/forgot-password/forgot-password.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { CreateSetOfFlashcardsComponent } from './Components/Flashcards/Create-set-of-flashcards/create-set-of-flashcards.component';
import { CategoryContentComponent } from './Components/Category-content/category-content.component';
import { AuthInterceptor } from './Heplers/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    SidebarComponent,
    SearchFlashcardComponent,
    AllQuizzesComponent,
    DisplayQuizComponent,
    CreateQuizComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    CreateSetOfFlashcardsComponent,
    CategoryContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

  ],
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(), 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
