import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent {
  // Step 1: Enter game code
  gameCode: string = '';

  // Step 2: Choose profile
  username: string = '';
  selectedAvatar: string = '';
  showError: boolean = false;
  isLoading: boolean = false;
  showProfileStep: boolean = false;

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

  joinGame() {
    if (!this.gameCode.trim()) {
      alert("Please enter a game code.");
      return;
    }
    this.showProfileStep = true;
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

    setTimeout(() => {
      this.router.navigate(['/game/lobby']);
    }, 3000);
  }
}
