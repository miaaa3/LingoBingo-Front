import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalService } from '../Services/Auth/local.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private localService: LocalService, private router: Router) {}

  canActivate(): boolean {
    const token = this.localService.getData('userApiKey');

    if (token) {
      // Token exists, allow navigation
      return true;
    } else {
      // No token, redirect to home
      this.router.navigate(['/Home']);
      return false;
    }
  }
}
