import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Difficulty, getDifficulties } from 'src/app/Models/enums/difficulty.enum';
import { Category, getQuizCategories } from 'src/app/Models/enums/category.enum';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/Services/Auth/authentication.service';
import { RestApiService } from 'src/app/Services/Auth/rest-api.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  difficulties: string[] = [];
  categories: string[] = [];
  numbers: number[] = [];
  quizId:number = 28;
  quizForm!: FormGroup;
  questionsArray: AbstractControl[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private api:RestApiService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  addNewQuestion(): void {
    const questions = this.quizForm.get('questions') as FormArray;
    questions.push(this.formBuilder.group({
      question: ['',Validators.required],
      description: ['',Validators.required],
      answers: this.formBuilder.group({
        A: ['',Validators.required],
        B: [''],
        C: [''],
        D: ['']
      }),
      multipleCorrectAnswers: false,
      correctAnswers: this.formBuilder.group({
        A: false,
        B: false,
        C: false,
        D: false
      }),
      explanation: [''],
      tip: [''],
      tags: [[]],
      userAnswer: null,
    }));
    this.numbers.push(this.numbers.length + 1);
    this.questionsArray = (this.quizForm.get('questions') as FormArray).controls;
  }
  

  ngOnInit(): void {
    this.numbers = [1];
    this.categories = getQuizCategories();
    this.difficulties = getDifficulties();

    this.quizForm = this.formBuilder.group({
      quizName: [''],
      category: [''],
      difficulty: [''],
      description: [''],
      questions: this.formBuilder.array([]),
    });
    
    this.questionsArray = (this.quizForm.get('questions') as FormArray).controls;
    
    this.addNewQuestion();
  }

  async onSubmit() {
    if (this.quizForm.valid) {
      
      const formData = this.quizForm.value;

      const lastIdResponse = await this.api.getLastId().toPromise();
      this.quizId = lastIdResponse['quizId'];
     
      const quizObject = {
        quizId: ++this.quizId,
        quizName: formData.quizName,
        category: formData.category,
        difficulty: formData.difficulty.toUpperCase(),
        questions: formData.questions.map((question: any) => {
          const {
            questionId,
            question: qText,
            description,
            answers,
            multipleCorrectAnswers,
            correctAnswers,
            explanation,
            tip,
            tags,
            userAnswer
          } = question;
  
          return {
            questionId,
            question: qText,
            description,
            answers,
            multipleCorrectAnswers,
            correctAnswers,
            explanation,
            tip,
            tags,
            userAnswer
          };
        }),
      };
      
      await this.api.addQuiz(quizObject).subscribe(
        res=>{
          this.toastr.success('Quiz created successfully')          
          setTimeout(() => {
            this.router.navigate(['/Home'])
          }, 2000);
          
          
        },
        err=>{
          this.toastr.error('Failed to create quiz.')
        }
      )
      
      
    }
  }
  
  isFixedHeaderVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isFixedHeaderVisible = scrollPosition > 100;
  }
  onCheckboxChange(index: number): void {
    const answersArray = this.quizForm.get('answers') as FormArray;
    const answerControl = answersArray.at(index).get('isCorrect');
    answerControl.setValue(!answerControl.value);
  }
}
