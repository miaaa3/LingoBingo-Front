import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/Services/Auth/authentication.service';
import { LocalService } from 'src/app/Services/Auth/local.service';
import { RestApiService } from 'src/app/Services/Auth/rest-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    
  loginForm!: FormGroup;
  showPassword: boolean = false;
  isLoading = false;

  constructor(
    private api: RestApiService,
    private fb: FormBuilder,
    private router: Router,
    private local:LocalService,
    private toastr: ToastrService,
    private authService: AuthenticationService

    ) {
    
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, <any>[Validators.required, Validators.email]],
      password: [null, <any>[Validators.required, Validators.minLength(8)]],
      
    } ,{ validators: [Validators.required] }
    );
  
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }
  
  async login() {
    this.isLoading = true;
    this.api.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Accept: 'application/json',
            })
          };
    this.authService.login(this.loginForm.value).subscribe(
      res=>{
        this.local.saveData("userApiKey2",res['access_token']);
        
      }
    )
    this.api.login(this.loginForm.value).subscribe(
      res => {
        this.api.token = res['access_token'];
        this.local.saveData("userApiKey",this.api.token!)
        
        this.api.user = res['user'];
        this.toastr.success('Loged in successfully.', 'Success');
        this.router.navigate(['/Home']);
        if(this.router.navigate(['/Home'])){
          this.ngOnInit();
        }
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
      
        
      },
      err =>{
        this.toastr.error('Error during login.', 'Error');
        this.isLoading = false;
      
      }
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}