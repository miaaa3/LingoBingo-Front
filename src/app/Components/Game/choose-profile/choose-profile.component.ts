import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-profile',
  templateUrl: './choose-profile.component.html',
  styleUrls: ['./choose-profile.component.css']
})
export class ChooseProfileComponent {
  username: string = '';
  selectedAvatar: string = '';
  showError: boolean = false;
  isLoading: boolean = false;
  

  avatars: string[] = [];

  constructor(private router: Router) {
    this.generateAvatars();
  }

  generateAvatars() {
    const baseUrl = 'https://api.dicebear.com/6.x/adventurer/svg?seed=';
    for (let i = 0; i < 5; i++) {
      const seed = Math.random().toString(36).substring(2, 15);
      this.avatars.push(`${baseUrl}${seed}`);
    }
  }

  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  confirm() {
    if (!this.username.trim() || !this.selectedAvatar) {
      this.showError = true;
      return;
    }

    this.showError = false;
    this.isLoading = true;

    // Simulate a loading delay before navigating to the lobby
    setTimeout(() => {
      this.router.navigate(['/game/lobby']);
    }, 3000);
  }
}
