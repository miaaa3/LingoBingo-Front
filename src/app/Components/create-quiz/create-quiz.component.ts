import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getQuizCategories } from 'src/app/Models/enums/quiz-category.enum';
import { Question } from 'src/app/Models/question.model';


@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit{
  quizForm!: FormGroup;
  categories : String[] = getQuizCategories()
  constructor(private fb: FormBuilder) {
    this.quizForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.quizForm = this.fb.group({
      question: ['', Validators.required],
      description: [''],
      answers: this.fb.group({
        answer_a: ['', Validators.required],
        answer_b: ['', Validators.required],
        answer_c: [''],
        answer_d: [''],
        answer_e: [''],
        answer_f: [''],
      }),
      multiple_correct_answers: [false],
      correct_answers: this.fb.group({
        answer_a_correct: [null, Validators.required],
        answer_b_correct: [false,],
        answer_c_correct: [false],
        answer_d_correct: [false],
        answer_e_correct: [false],
        answer_f_correct: [false],
      }),
      explanation: [''],
      tip: [''],
      tags: [[]],
      category: ['', Validators.required],
      difficulty: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const formData: Question = this.quizForm.value;
    console.log(formData);
  }
  isFixedHeaderVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isFixedHeaderVisible = scrollPosition > 100;
  }
}
