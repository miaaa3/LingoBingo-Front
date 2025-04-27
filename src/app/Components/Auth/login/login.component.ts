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
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup;
  showPassword: boolean = false;  // For toggling password visibility
  isLoading = false;

  constructor(
    private api: RestApiService,
    private fb: FormBuilder,
    private router: Router,
    private local: LocalService,
    private toastr: ToastrService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    // Initialize the form with validators
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  // Getter for password form control
  get passwordControl() {
    return this.loginForm.get('password');
  }

  // Method to handle login form submission
  async login() {
    this.isLoading = true;  // Start loading indicator

    if (this.loginForm.valid) {
      console.log(this.loginForm.value); // Log the form data for debugging

      // Set the request headers for the API
      this.api.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      };

      // Call the authentication service to log in
      this.authService.login(this.loginForm.value).subscribe(
        res => {
          console.log(res['access_token']);
          this.local.saveData("userApiKey2", res['access_token']); // Save access token
        },
        err => {
          this.toastr.error('Error during login.', 'Error'); // Display error if login fails
          this.isLoading = false;
        }
      );

      // API call for login
      this.api.login(this.loginForm.value).subscribe(
        res => {
          // Set token in API and save it locally
          this.api.token = res['access_token'];
          this.local.saveData("userApiKey", this.api.token!);

          // Store user info
          this.api.user = res['user'];

          // Display success message and navigate to home
          this.toastr.success('Logged in successfully.', 'Success');
          this.router.navigate(['/Home']);
          
          // Reset loading state
          this.isLoading = false;
        },
        err => {
          // Error handling
          this.toastr.error('Error during login.', 'Error');
          this.isLoading = false;
        }
      );
    } else {
      // Handle invalid form state
      this.toastr.error('Please fill out the form correctly.', 'Error');
      this.isLoading = false;
    }
  }

  // Toggle password visibility function
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
